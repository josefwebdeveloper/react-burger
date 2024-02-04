import styles from './burger-constructor.module.css';
import React, { useMemo, useState} from "react";
import classNames from "classnames";

import {makeOrder} from "../../state/constructor-data/constructor-api";
import {useDrop} from "react-dnd";
import {clearCountIngredients} from "../../state/ingredients/ingredients-slice";
import {IngredientModel} from "../../models/burger-data.model";
import {useDispatch, useSelector} from "../../hooks/redux-hooks";
import {ConstructorGroup} from "./constructor-group/constructor-group";
import {ConstructorFooter} from "./constructor-footer/constructor-footer";
import {ItemTypes} from "../burger-ingredients/ingredients-group/ingredient/ingredient";
import {RootState} from "../../state/store";
import { useLocation, useNavigate} from "react-router-dom";

export const BurgerConstructor: React.FC = () => {
    const userData = useSelector((state: RootState) => state.auth.basicUserInfo);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {
        loading, orderNumber,
        ingredientsConstructor, bun
    } = useSelector((state) => state.constructorData);


    const amount = useMemo(() => {
        let totalAmount = ingredientsConstructor.reduce((acc, item) => acc + item.price, 0);
        return bun ? totalAmount += bun.price * 2 : totalAmount;
    }, [ingredientsConstructor, bun]);

    const onSubmitOrder = () => {
        if(!bun || ingredientsConstructor.length===0) return;
        if (!userData) {
             return navigate('/login');
        }
        const ingredientsIds = ingredientsConstructor.map(item => item._id)
        const data = {ingredients:[...ingredientsIds, bun._id, bun._id]}

        dispatch(makeOrder(data))
        dispatch(clearCountIngredients())
        navigate('/order', {state:{background: location}})
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
        <section ref={drop} data-testid="burger" className={classNames(styles['burger-constructor'])} data-cy="constructor">
            <ConstructorGroup isActive={isActive} droppedItem={droppedItem}/>
            <ConstructorFooter amount={amount} onSubmitOrder={onSubmitOrder}/>

        </section>
    );
};
