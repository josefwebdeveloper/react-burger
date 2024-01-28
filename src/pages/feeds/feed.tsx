import styles from './feed.module.css';
import classnames from "classnames";
import {OrdersHistory} from "../../components/order-history/orders-history";
import {OrdersInfo} from "../../components/orders-info/orders-info";

export const Feed = () => {

    return (
        <main className={classnames(styles['feed-main'], 'container')}>
            <div className={styles.row}>
                <OrdersHistory/>
                <OrdersInfo/>
            </div>
        </main>
    );
};