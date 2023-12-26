import styles from './constructor-footer.module.css';
import classNames from "classnames";
import React from "react";
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from "react-redux";
import {RootState} from "../../../../state/store";

export interface ConstructorFooterProps {
    amount: number;
    onSubmitOrder: () => void;
}

export const ConstructorFooter: React.FC<ConstructorFooterProps> = ({amount, onSubmitOrder}) => {
    const {
        ingredientsConstructor, bun
    } = useSelector((state: RootState) => state.constructorData);
    return (
        <section className={classNames(styles['constructor-footer'])}>
            <div className={classNames(styles["content"])}>
                <span className='text text_type_digits-medium mr-2'>{amount}</span>
                <span className={classNames(styles['amount'])}><CurrencyIcon type="primary"/></span>
                <Button disabled={!bun || ingredientsConstructor.length === 0}
                        onClick={onSubmitOrder} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};