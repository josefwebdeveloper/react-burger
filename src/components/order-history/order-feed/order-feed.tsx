import styles from './order-feed.module.css';
import classNames from "classnames";
import {selectOrders} from "../../../state/orders/orders-slice";
import React from "react";
import {Order} from "../../../models/orders.model";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector} from "../../../hooks/redux-hooks";

interface OrderFeedProps {
    order: Order
}

export const OrderFeed = ({order}: OrderFeedProps) => {
    const orders = useSelector(selectOrders);
    const {ingredients} = useSelector((state) => state.ingredients);
    const imgArr = order.ingredients.map((item) => {
        return ingredients.find((ingredient) => ingredient._id === item)?.image_mobile;
    });
    const price = order.ingredients.reduce((acc, item) => {
        const foundIngredient = ingredients.find((ingredient) => ingredient._id === item);
        return acc + (foundIngredient?.price ?? 0);
    }, 0);



    return (
        <section className={classNames(styles['order-feed-container'], 'custom-scroll')}>
            <div className={classNames(styles.header)}>
                <span
                    className={classNames(styles["order-number"], 'text', 'text_type_digits-default')}>#{order.number}</span>
                <span className={classNames(styles["data"], 'text', 'text_type_main-default', 'text_color_inactive')}>
                <FormattedDate date={new Date(order.createdAt)}/>
            </span>
            </div>
            <div
                className={classNames(styles["order-name"], 'mt-6', 'mb-6', 'text', 'text_type_main-medium')}>{order.name}</div>
            <div className={classNames(styles['icon-sum-container'])}>
                <div className={classNames(styles["icon-set"])}>
                    {imgArr && imgArr.map((item, index) => {
                        if (index > 5) return null;
                        return <div key={index} style={{transform: `translatex(-${index * 20}px)`, zIndex: 6 - index}}
                                    className={classNames(styles["icon"])}>
                            <img src={item} alt={item}/>
                            {index === 5 && imgArr.length > 6 && <div
                                className={classNames(styles.number, 'text', 'text_type_main-default')}>+{imgArr.length - 6}</div>}
                        </div>
                    })}
                </div>
                <div className={classNames(styles['sum-container'])}>
                    <div className={classNames(styles['sum'], 'text', 'text_type_digits-default','mr-2')}>{price}</div>
                     <CurrencyIcon type="primary" />
                </div>
            </div>
        </section>
    );

};
