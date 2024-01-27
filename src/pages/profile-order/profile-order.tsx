import React from "react";
import {OrderInfo} from "../../components/order-info/order-info";
import styles from './profile-order.module.css';
export const ProfileOrder = () => {

    return (
        <section className={styles.container}>
            <OrderInfo/>
        </section>
    );
};