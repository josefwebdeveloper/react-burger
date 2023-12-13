import styles from './burger-constructor.module.css';
import {Burger, BurgersProps} from "../../models/burger-data.model";
import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';
import classNames from "classnames";
import {IngredientGroup} from "./ingredient-group/ingredient-group";
import {ConstructorFooter} from "./constructor-footer/constructor-footer";




export const BurgerConstructor: React.FC<BurgersProps> = ({burgerData}) => {
    console.log(burgerData)

    return (
        <section className={classNames(styles['burger-constructor'])}>
            <IngredientGroup/>
            <ConstructorFooter/>

        </section>
    );
};