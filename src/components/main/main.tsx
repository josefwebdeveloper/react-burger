import  styles from './main.module.css';
import {BurgerIngredients} from "./burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "./burger-constructor/burger-constructor";
import {mockData} from "../../utils/data";
import React from "react";
import classnames from 'classnames';
export const Main = () => {
    const [burgerData, setData] = React.useState(mockData);

    return (
        <main className={classnames(styles['burger-main'] , 'container')}>
            <div className={styles.row}>
                <BurgerIngredients ingredientsData={burgerData}/>
                <BurgerConstructor ingredientsData={burgerData} />
            </div>
        </main>
    );
};