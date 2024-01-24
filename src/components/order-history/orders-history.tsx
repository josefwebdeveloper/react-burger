import styles from './order-history.module.css';
import classNames from "classnames";
export const OrdersHistory = () => {
    return (
        <section className={classNames(styles['orders-history'])}>
            <h2>orders history</h2>
        </section>
    );
};