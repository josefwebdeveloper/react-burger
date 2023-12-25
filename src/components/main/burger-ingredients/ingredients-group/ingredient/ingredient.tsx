import styles from './ingredient.module.css';
import classNames from 'classnames';
import { IngredientProps} from "../../../../../models/burger-data.model";
import React, {CSSProperties} from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
// import { ItemTypes } from './ItemTypes'
export const ItemTypes = {
    BOX: 'box',
}
interface DropResult {
    name: string
}
const style: CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}

export const Ingredient: React.FC<IngredientProps> = ({ingredient,onOpenModal}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        // eslint-disable-next-line no-restricted-globals
        item: { name },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>()
            if (item && dropResult) {
                alert(`You dropped ${item.name} into ${dropResult.name}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))
    const opacity = isDragging ? 0.4 : 1
    return (
        <div ref={drag}  data-testid={`box`}
             onClick={()=>onOpenModal(ingredient)} className={classNames(styles['ingredient-container'],)}>
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