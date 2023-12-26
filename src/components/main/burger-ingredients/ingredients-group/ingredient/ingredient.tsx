import styles from './ingredient.module.css';
import classNames from 'classnames';
import {IngredientModel, IngredientProps} from "../../../../../models/burger-data.model";
import React, {CSSProperties} from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../../state/store";
import {addIngredient, setBun} from "../../../../../state/constructor-data/constructor-slice";
import {incrementCount} from "../../../../../state/ingredients/ingredients-slice";
export const ItemTypes = {
    BOX: 'box',
}
interface DropResult {
    ingredient: IngredientModel
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
    const dispatch = useDispatch<AppDispatch>();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: ()=>{return  ingredient },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>()
            if (item && dropResult) {
                // alert(`You dropped ${item.name} into ${dropResult.ingredient.name}!`)
                console.log(item)
                console.log(dropResult)
                if (item.type === 'bun'){
                    dispatch(incrementCount(item))
                    dispatch(setBun(item));
                } else {
                    dispatch(incrementCount(item))
                    dispatch(addIngredient(item))
                }
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
             onClick={()=>onOpenModal(ingredient)} className={classNames(styles['ingredient-container'])}>
            {/*{(ingredient.count && ingredient.count>0)? <Counter count={ingredient.count} size="default" extraClass="m-1" />:null}*/}
           <Counter count={ingredient.count} size="default" extraClass="m-1" />
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