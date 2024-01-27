import styles from './order-board.module.css';
import classNames from "classnames";
import {Order} from "../../../models/orders.model";

interface OrderBoardProps {
    ready: boolean,
    readyOrders?: Order[],
    inProgressOrders?: Order[]
}

export const OrderBoard = ({ready, readyOrders, inProgressOrders}: OrderBoardProps) => {
    let firstColumnItems: Order[] = [];
    let secondColumnItems: Order[] = [];

    if (ready && readyOrders && readyOrders.length > 0) {
        firstColumnItems = readyOrders.length <= 10 ? readyOrders : readyOrders.slice(0, 10);
        secondColumnItems = readyOrders.length > 10 ? readyOrders.slice(10, 20) : [];
    } else if (!ready && inProgressOrders && inProgressOrders.length > 0) {
        firstColumnItems = inProgressOrders?.length <= 10 ? inProgressOrders : inProgressOrders?.slice(0, 10);
        secondColumnItems = inProgressOrders?.length > 10 ? inProgressOrders?.slice(10, 20) : [];
    }


    return (
        <section className={classNames(styles['orders-board'])}>
            <div className={classNames('text', 'text_type_main-medium', 'mb-6')}>{ready ? 'Готовы:' : 'В работе:'}</div>
            <div className={classNames(styles['order-ids'])}>

                        <div className={classNames(styles['chunk-container'])}>
                            {firstColumnItems.map((item, index) => (
                                <div className={classNames(styles['order-id'],
                                    'text', 'text_type_digits-default')} key={item._id}>{item.number}</div>
                            ))}
                        </div>
                        <div className={classNames(styles['chunk-container'])}>
                            {secondColumnItems.map((item, index) => (
                                <div className={classNames(styles['order-id'],
                                    'text', 'text_type_digits-default')} key={item._id}>{item.number}</div>
                            ))}
                        </div>
            </div>

        </section>
    );
};
