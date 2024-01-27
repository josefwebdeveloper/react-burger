import styles from './orders-history.module.css';
import classNames from "classnames";
import {useDispatch, useSelector} from "../../hooks/redux-hooks";
import React, {useEffect} from "react";
import {wsConnectUserOrders, wsDisconnect, wsDisconnectUserOrders} from "../../state/middleware";
import {selectOrders} from "../../state/orders/orders-slice";
import {RootState} from "../../state/store";
import {useLocation} from "react-router-dom";
import {OrderFeed} from "./order-feed/order-feed";

export const OrdersHistory = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.auth.basicUserInfo);
    const orders = useSelector(selectOrders);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes('feed')) {
            dispatch({type: 'ws/connect'});
        } else {
            dispatch(wsConnectUserOrders());
        }


        return () => {
            dispatch(wsDisconnect());
            dispatch(wsDisconnectUserOrders());
        };
    }, [dispatch]);
    return (
        <section className={classNames(styles['orders-history'])}>
            {location.pathname.includes('feed') && <div className={classNames(styles['orders-history-header'],
                'text', 'text_type_main-large')}>Лента заказов
            </div>
            }
            <section style={{height:location.pathname.includes('feed')?`calc(100vh - 235px)`:`calc(100vh - 170px)`}}
                     className={classNames(styles['orders-feed-container'], 'custom-scroll')}>
                <div className={classNames(styles['orders'])}>
                    {orders ? orders.map((item) => <OrderFeed key={item._id} order={item}/>) :
                        (
                            <NoOrders/>
                        )}
                </div>
            </section>
        </section>
    );
};
export const NoOrders = () => {
    return (
        <div className={classNames(styles['no-feeds'], 'text', 'text_type_main-medium')}>Нет
            feeds</div>
    )
}