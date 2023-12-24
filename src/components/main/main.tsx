import styles from './main.module.css';
import {BurgerIngredients} from "./burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "./burger-constructor/burger-constructor";
import React from "react";
import classnames from 'classnames';
import { ConstructorProvider} from "../../services/constructor-context";



export const Main = () => {

    return (
        <main className={classnames(styles['burger-main'], 'container')}>
            <div className={styles.row}>
                <BurgerIngredients/>
                <ConstructorProvider ingredientsData={[]}>
                    <BurgerConstructor />
                </ConstructorProvider>
            </div>
        </main>
    );
};