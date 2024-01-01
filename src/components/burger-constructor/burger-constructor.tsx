import styles from './burger-constructor.module.css';
import React, { useMemo, useState} from "react";
import classNames from "classnames";
import {Spinner} from "../spinner/Spinner";
import {OrderDetails} from "../order-details/order-details";
import {Modal} from "../modal/modal";
import {useModal} from "../../hooks/use-modal.hook";
import {makeOrder} from "../../state/constructor-data/constructor-api";
import {useDrop} from "react-dnd";
import {clearCountIngredients} from "../../state/ingredients/ingredients-slice";
import {IngredientModel} from "../../models/burger-data.model";
import {useDispatch, useSelector} from "../../hooks/redux-hooks";
import {ConstructorGroup} from "./constructor-group/constructor-group";
import {ConstructorFooter} from "./constructor-footer/constructor-footer";
import {ItemTypes} from "../burger-ingredients/ingredients-group/ingredient/ingredient";

export const BurgerConstructor: React.FC = () => {
    const dispatch = useDispatch();
    const {
        loading, orderNumber,
        ingredientsConstructor, bun
    } = useSelector((state) => state.constructorData);

    const {isModalOpen, openModal, closeModal} = useModal();

    const amount = useMemo(() => {
        let totalAmount = ingredientsConstructor.reduce((acc, item) => acc + item.price, 0);
        return bun ? totalAmount += bun.price * 2 : totalAmount;
    }, [ingredientsConstructor, bun]);

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
