import styles from './order-history.module.css';
import classNames from "classnames";
import {useDispatch} from "../../hooks/redux-hooks";
import {useEffect} from "react";
export const OrdersHistory = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'ws/connect' });

        return () => {
            dispatch({ type: 'ws/disconnect' });
        };
    }, [dispatch]);
    return (
        <section className={classNames(styles['orders-history'])}>
            <h2>orders history</h2>
        </section>
    );
};