import styles from './ingredient-details.module.css';
import classNames from "classnames";
import React from "react";
import {IngredientModel} from "../../models/burger-data.model";
export interface IngredientDetailsProps {
    selectedIngredient: IngredientModel | null;
}
export const IngredientDetails : React.FC<IngredientDetailsProps> = ({selectedIngredient}) => {
    if (!selectedIngredient) {
        return null;
    }
    return (
        <div className={classNames(styles['ingredient-details-container'])}>
            <div className={classNames(styles['ingredient-details-image'],'flex-align-justify-center')}>
                     <img  loading="lazy" src={selectedIngredient.image_large} alt={selectedIngredient.image}/>
            </div>
            <div className={classNames(styles['ingredient-details-name'],'text', 'text_type_main-medium', 'flex-align-justify-center')}>
                <span>{selectedIngredient.name}</span>
            </div>

            <div className={classNames(styles['ingredient-details-nutrition'])}>
                <div className={classNames(styles['ingredient-details-nutrition-item'],
                    'text', 'text_type_main-default','text_color_inactive','flex-align-justify-center')}>
                    <span className='mb-2'>Калории,ккал</span>
                    <span className='text text_type_digits-medium'>{selectedIngredient.calories}</span>
                </div>
                <div className={classNames(styles['ingredient-details-nutrition-item'],'text',
                    'text_type_main-default','text_color_inactive','flex-align-justify-center')}>
                    <span className='mb-2'>Белки, г</span>
                    <span className='text text_type_digits-medium'>{selectedIngredient.proteins}</span>
                </div>
                <div className={classNames(styles['ingredient-details-nutrition-item'],
                    'text', 'text_type_main-default', 'text_color_inactive','flex-align-justify-center')}>
                    <span className='mb-2'>Жиры, г</span>
                    <span className='text text_type_digits-medium'>{selectedIngredient.fat}</span>
                </div>
                <div className={classNames(styles['ingredient-details-nutrition-item'],'text',
                    'text_type_main-default',' text_color_inactive')}>
                    <span className='mb-2'>Углеводы, г</span>
                    <span className='text text_type_digits-medium'>{selectedIngredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
};