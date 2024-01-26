import styles from './order-info.module.css';
import classNames from "classnames";

import React, {useEffect} from "react";

export const OrderInfo = () => {
    return (
        <section className={classNames(styles['order-info'])}>
            <h2>order-info</h2>
        </section>
    )
};