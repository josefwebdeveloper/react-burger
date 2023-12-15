import styles from './ingredient.module.css';
import classNames from 'classnames';
import { IngredientProps} from "../../../../../models/burger-data.model";
import React from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const Ingredient: React.FC<IngredientProps> = ({ingredient}) => {
    return (
        <div  className={classNames(styles['ingredient-container'],)}>
            <Counter count={1} size="default" extraClass="m-1" />
            <div className={classNames(styles['ingredient-image'],'ml-4','mr-4','mb-1')}>
                <img src={ingredient.image} alt={ingredient.image}/>
            </div>
            <div className={classNames(styles['ingredient-price'],'mb-1')}>
                <span className='text text_type_digits-default mr-2'>{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={classNames(styles['ingredient-name'],'text', 'text_type_main-default')}>
                {ingredient.name}
            </div>
        </div>
    );
};