import styles from './orders-history.module.css';
import classNames from "classnames";
import {useDispatch, useSelector} from "../../hooks/redux-hooks";
import React, {useEffect} from "react";
import {wsConnectUserOrders, wsDisconnect, wsDisconnectUserOrders} from "../../state/middleware";
import {selectOrders} from "../../state/orders/orders-slice";
import {useLocation} from "react-router-dom";
import {OrderFeed} from "./order-feed/order-feed";
import {debounce} from "lodash";

export const OrdersHistory = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const location = useLocation();
    const debouncedConnect = debounce(()=> dispatch({type: 'ws/connect'}), 300);
    const debouncedUserConnect = debounce(()=> dispatch(wsConnectUserOrders()), 300);

    useEffect(() => {
        if (location.pathname.includes('feed')) {
            debouncedConnect();
        } else {
            debouncedUserConnect();
        }


        return () => {
            dispatch(wsDisconnect());
            dispatch(wsDisconnectUserOrders());
        };
    }, [dispatch, location.pathname]);
    return (
        <div className={classNames(styles['orders-history'])}>
            {location.pathname.includes('feed') && <div className={classNames(styles['orders-history-header'],
                'text', 'text_type_main-large')}>Лента заказов
            </div>
            }
            <div style={{height:location.pathname.includes('feed')?`calc(100vh - 235px)`:`calc(100vh - 170px)`}}
                     className={classNames(styles['orders-feed-container'], 'custom-scroll')}>
                <div className={classNames(styles['orders'])}>
                    {orders ? orders.map((item) => <OrderFeed key={item._id} order={item}/>) :
                        (
                            <NoOrders/>
                        )}
                </div>
            </div>
        </div>
    );
};
export const NoOrders = () => {
    return (
        <div className={classNames(styles['no-feeds'], 'text', 'text_type_main-medium')}>Нет
            feeds</div>
    )
}