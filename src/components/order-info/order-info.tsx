import styles from './order-info.module.css';
import classNames from "classnames";

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "../../hooks/redux-hooks";
import {selectOrders} from "../../state/orders/orders-slice";
import {Order} from "../../models/orders.model";
import {fetchIngredients} from "../../state/ingredients/ingredients-api";
import {wsConnectUserOrders, wsDisconnect, wsDisconnectUserOrders} from "../../state/middleware";
import {useLocation} from "react-router-dom";
import {ExtendedIngredientModel} from "../../models/burger-data.model";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderInfo = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const {ingredients} = useSelector((state) => state.ingredients);
    const number = window.location.pathname.split('/').pop();
    const [order, setOrder] = useState<Order>({} as Order);
    const [ingredientsData, setIngredientsData] = useState<ExtendedIngredientModel[]>([]);
    const location = useLocation();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    useEffect(() => {
        if (orders.length === 0) {
            if (location.pathname.includes('feed')) {
                dispatch({type: 'ws/connect'});
            } else {
                dispatch(wsConnectUserOrders());
            }
        }

        return () => {
            dispatch(wsDisconnect());
            dispatch(wsDisconnectUserOrders());
        };
    }, [dispatch]);
    useEffect(() => {
        if (ingredients.length === 0) {
            dispatch(fetchIngredients())
        }

        if (number !== undefined && orders.length > 0 && ingredients.length > 0) {
            const num = parseInt(number, 10);

            if (!isNaN(num)) {
                setOrder(orders.find((item) => item.number === num) as Order);

                if (!order.ingredients) return;
                const ingredientsDataNew = order.ingredients
                    .map(item => ingredients.find(ingredient => ingredient._id === item))
                setTotalPrice(ingredientsDataNew.reduce((sum, item) => sum + item!.price, 0));

                const ingredientsDataWithCounter = ingredientsDataNew.map(item => ({
                    ...item,
                    repeatCount: ingredientsData.filter(x => x._id === item!._id).length
                }));
                const filteredIngredientsData = ingredientsDataWithCounter.filter((item, index, arr) => {
                    return arr.findIndex((x) => x._id === item._id) === index;
                });
                setIngredientsData(filteredIngredientsData as ExtendedIngredientModel[]);


            }

        }

    }, [order, orders, ingredients, dispatch]);


    return (
        <section className={classNames(styles['order-info'])}>
            {order && <>
                <div className={classNames(styles['order-info-header'],
                    'text', 'text_type_digits-default', 'mb-5')}>#{order.number}</div>
                <div className={classNames(styles['order-info-name'],
                    'text', 'text_type_main-medium', 'mb-2')}>{order.name}</div>
                <div className={classNames(styles['order-info-status'],
                    'text', 'text_type_main-default', 'mb-10')}>{order.status === 'done' ? 'Выполнен' : order.status}</div>
                <div className={classNames(styles['order-info-title'],
                    'text', 'text_type_main-medium', 'mb-6')}>Состав:
                </div>
                <div className={classNames(styles['order-info-ingredients'], 'custom-scroll', 'mb-4')}>
                    {ingredientsData.length > 0 && ingredientsData.map((item, index) => {
                        return <div key={index} className={classNames(styles['order-info-ingredient'], 'mb-2')}>
                            <div className={classNames(styles['icon'])}>
                                <img src={item.image_mobile} alt={item.name}/>
                            </div>
                            <div className={classNames(styles['order-info-ingredient-name'],
                                'text', 'text_type_main-default')}>{item.name}</div>
                            <div className={classNames(styles["price-container"], 'mr-6')}>
                                <div className={classNames(styles['order-info-ingredient-count'],
                                    'text', 'text_type_digits-default', 'mr-1')}>{
                                    order.ingredients.filter((ingredient) => ingredient === item._id).length} x
                                </div>
                                <div className={classNames(styles['order-info-ingredient-price'],
                                    'text', 'text_type_digits-default', 'mr-2')}> {item.price}</div>
                                <CurrencyIcon type="primary"/>
                            </div>
                        </div>
                    })}
                </div>
                <div className={classNames(styles['order-date-sum'])}>
                    <div className={classNames(styles['order-info-date'],
                        'text', 'text_type_main-default', 'text_color_inactive')}>
                        <FormattedDate date={new Date(order.createdAt)}/></div>
                    <div className={classNames(styles['order-info-sum'],
                        'text', 'text_type_digits-default')}>{totalPrice}
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </>
            }
        </section>
    )
};