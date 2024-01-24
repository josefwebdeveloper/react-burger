import styles from './orders-info.module.css';
import classNames from "classnames";
export const OrdersInfo = () => {
    return (
        <section className={classNames(styles['orders-info'])}>
            <h2>order info</h2>
        </section>
    );
};