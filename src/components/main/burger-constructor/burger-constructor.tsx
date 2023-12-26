import styles from './burger-constructor.module.css';
import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {ConstructorGroup} from "./constructor-group/constructor-group";
import {ConstructorFooter} from "./constructor-footer/constructor-footer";
import {Spinner} from "../../spinner/Spinner";
import {OrderDetails} from "../../order-details/order-details";
import {Modal} from "../../modal/modal";
import {useModal} from "../../../hooks/use-modal.hook";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../state/store";
import {makeOrder} from "../../../state/constructor-data/constructor-api";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../burger-ingredients/ingredients-group/ingredient/ingredient";
import {clearCountIngredients} from "../../../state/ingredients/ingredients-slice";
import {IngredientModel} from "../../../models/burger-data.model";

export const BurgerConstructor: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        loading, orderNumber,
        ingredientsConstructor, bun
    } = useSelector((state: RootState) => state.constructorData);

    const {isModalOpen, openModal, closeModal} = useModal();
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        let amount = ingredientsConstructor.reduce((acc, item) => acc + item.price, 0);
        setAmount(bun ? amount += bun.price * 2 : amount);

    }, [ingredientsConstructor, bun])

    const onSubmitOrder = () => {
        if(!bun || ingredientsConstructor.length===0) return;
        const ingredientsIds = ingredientsConstructor.map(item => item._id)
        dispatch(makeOrder(ingredientsIds))
        dispatch(clearCountIngredients())
        openModal();
    }
    const [droppedItem, setDroppedItem] = useState<IngredientModel | null>(null);
    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.BOX,
        drop: (item:IngredientModel,monitor) => {
           return {name: 'burger',item,monitor}
        },
        hover: (item, monitor) => {

            setDroppedItem(item);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))
    const isActive = canDrop && isOver
    return (
        <section ref={drop} data-testid="burger" className={classNames(styles['burger-constructor'])}>
            <ConstructorGroup isActive={isActive} droppedItem={droppedItem}/>
            <ConstructorFooter amount={amount} onSubmitOrder={onSubmitOrder}/>
            {loading ? <Spinner/> : (<>
                {isModalOpen && orderNumber && (
                    <Modal
                        title=""
                        onClose={closeModal}>
                        <OrderDetails/>
                    </Modal>
                )}
            </>)}
        </section>
    );
};
