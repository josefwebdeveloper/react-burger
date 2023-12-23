import styles from './main.module.css';
import {BurgerIngredients} from "./burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "./burger-constructor/burger-constructor";
import React from "react";
import classnames from 'classnames';
import {IngredientModel} from "../../models/burger-data.model";
import { ConstructorProvider} from "../../services/constructor-context";

interface MainProps {
    ingredientsData: IngredientModel[]
}

export const Main = ({ingredientsData}: MainProps) => {

    return (
        <main className={classnames(styles['burger-main'], 'container')}>
            <div className={styles.row}>
                <BurgerIngredients ingredientsData={ingredientsData}/>
                <ConstructorProvider ingredientsData={ingredientsData}>
                    <BurgerConstructor />
                </ConstructorProvider>
            </div>
        </main>
    );
};