import styles from './main.module.css';
import {BurgerIngredients} from "../../components/burger-ingredients/burger-ingredients";
import React from "react";
import classnames from 'classnames';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerConstructor} from "../../components/burger-constructor/burger-constructor";


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