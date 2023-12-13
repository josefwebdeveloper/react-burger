import styles from './ingredient-item.module.css';
import classNames from "classnames";
import React from "react";
import {Burger} from "../../../../models/burger-data.model";
interface IngredientItemProps {
    ingredient: Burger;

}
export const IngredientItem: React.FC<IngredientItemProps> = ({ingredient}) => {
    return (
        <div className={classNames(styles['ingredient-item'])}>
        </div>
    );
};