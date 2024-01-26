import styles from './orders-info.module.css';
import classNames from "classnames";
import {OrderBoard} from "./order-board/order-board";
import {useSelector} from "../../hooks/redux-hooks";
import {selectOrders, selectTotal, selectTotalToday} from "../../state/orders/orders-slice";
import React, {useEffect} from "react";
import {Order} from "../../models/orders.model";
export const OrdersInfo = () => {
    const orders = useSelector(selectOrders);
    const total=useSelector(selectTotal)
    const totalToday=useSelector(selectTotalToday)
    const [readyOrders, setReadyOrders] = React.useState<Order[]>([]);
    const [inProgressOrders, setInProgressOrders] = React.useState<Order[]>([]);
    useEffect(() => {
        setReadyOrders(orders.filter((order,index) => order.status === 'done' && index < 10));
        setInProgressOrders(orders.filter((order,index) => order.status !== 'done' && index < 10));
    }, [orders]);
    return (
        <section className={classNames(styles['orders-info'])}>
            <div className={classNames(styles['order-boards-container'])}>
                <OrderBoard readyOrders={readyOrders} ready={true}/>
                <OrderBoard inProgressOrders={inProgressOrders} ready={false}/>
            </div>
            <div className={classNames(styles['all-time-text'],
                'text', 'text_type_main-medium')}>Выполнено за все время:
            </div>
            <div className={classNames(styles['all-time-number'], 'text', 'text_type_digits-large','mb-15')}>{total}</div>
            <div className={classNames(styles['all-time-text'],
                'text', 'text_type_main-medium')}>Выполнено за сегодня:
            </div>
            <div className={classNames(styles['all-time-number'], 'text', 'text_type_digits-large')}>{totalToday}</div>
        </section>
    );
};