import styles from './main.module.css';
import {BurgerIngredients} from "./burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "./burger-constructor/burger-constructor";
import React from "react";
import classnames from 'classnames';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


export const Main = () => {

    return (
        <main className={classnames(styles['burger-main'], 'container')}>
            <div className={styles.row}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </div>
        </main>
    );
};