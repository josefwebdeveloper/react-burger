import styles from './constructor-group.module.css';
import classNames from "classnames";
import React, {useEffect, useRef} from "react";
import {IngredientModel} from "../../../models/burger-data.model";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {deleteIngredient, moveIngredient} from "../../../state/constructor-data/constructorSlice";
import {decrementCount} from "../../../state/ingredients/ingredients-slice";
import type {Identifier, XYCoord} from 'dnd-core'
import {useDispatch, useSelector} from "../../../hooks/redux-hooks";

interface ViewProps {
    bun: IngredientModel | null,
    maxHeight: number,
    removeIngredient: (ingredient: IngredientModel) => void,
    ingredientsConstructor: IngredientModel[],
    isActive: boolean,
    droppedItem: IngredientModel | null
}

interface ConstructorGroupProps {
    isActive: boolean,
    droppedItem: IngredientModel | null
}

export const ConstructorGroup: React.FC<ConstructorGroupProps> = ({isActive, droppedItem}) => {
    const dispatch = useDispatch();

    const {
        ingredientsConstructor, bun
    } = useSelector((state) => state.constructorData);
    const [maxHeight, setMaxHeight] = React.useState(80);
    const removeIngredient = (ingredient: IngredientModel) => {
        dispatch(deleteIngredient(ingredient))
        dispatch(decrementCount(ingredient))
    }
    useEffect(() => {
        setMaxHeight(window.innerHeight - 540);
    }, [ingredientsConstructor]);


    return (
        <section
            className={classNames(styles['constructor-group-container'])}>
            <View isActive={isActive} droppedItem={droppedItem} removeIngredient={removeIngredient}
                  maxHeight={maxHeight} ingredientsConstructor={ingredientsConstructor}
                  bun={bun}/>
        </section>
    );
};

const View: React.FC<ViewProps> = ({
                                       removeIngredient,
                                       maxHeight,
                                       bun,
                                       ingredientsConstructor,
                                       isActive,
                                       droppedItem
                                   }) => {

    return (
        <div className={classNames(styles['ingredient-element-container'])}>

            {bun ? <div
                        className={classNames(styles["ingredient-element"], styles["bun"])}>
                <ConstructorElement
                    type={'top'}
                    isLocked={true}
                    text={bun.name + '(верх)'}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div> : <EmptyBun isActive={isActive} droppedItem={droppedItem} isBottom={false}/>
            }
            <div style={{'maxHeight': maxHeight}}
                 className={classNames(styles['scroll-container'], 'custom-scroll')}>
                {ingredientsConstructor.length > 0 ? ingredientsConstructor.map((ingredient: IngredientModel, index: React.Key | null | undefined) => {
                        return (
                            <IngredientCard key={ingredient.unId} index={index} ingredient={ingredient}
                                            removeIngredient={removeIngredient}/>
                        )
                    }) :
                    (
                        <NoIngredients isActive={isActive} droppedItem={droppedItem}/>
                    )}
            </div>
            {bun ? <div
                className={classNames(styles["ingredient-element"], styles["bun"])}>
                <ConstructorElement
                    type={'bottom'}
                    isLocked={true}
                    text={bun.name + '(низ)'}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div> : <EmptyBun isActive={isActive} droppedItem={droppedItem} isBottom={true}/>
            }
        </div>
    )
}

export interface IngredientCardProps {
    ingredient: IngredientModel,
    removeIngredient: (ingredient: IngredientModel) => void,
    index: React.Key | null | undefined
}

const style = {
    cursor: 'move',

}


export interface DragItem {
    index: number
    id: string
    type: string
}

const IngredientCard: React.FC<IngredientCardProps> = ({
                                                           ingredient,
                                                           removeIngredient,
                                                           index
                                                       }) => {
    const dispatch = useDispatch();

    const ref = useRef(null)
    const [{handlerId}, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = (ref.current as HTMLElement).getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (dragIndex < hoverIndex! && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex! && hoverClientY > hoverMiddleY) {
                return
            }

            dispatch(moveIngredient({dragIndex, hoverIndex: hoverIndex as number}))


            if (typeof hoverIndex === "number") {
                item.index = hoverIndex
            }
        },
    })

    const [{isDragging}, drag] = useDrag({
        type: 'card',
        item: () => {
            return {unId: ingredient.unId, index}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    return (
        <div ref={ref} style={{...style, opacity}} data-handler-id={handlerId} key={ingredient.unId}
             className={classNames(styles["ingredient-element"])}>
            <span className={classNames('flex-align-center', 'mr-2')}><DragIcon type="primary"/></span>
            <ConstructorElement
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => removeIngredient(ingredient)}

            />
        </div>
    )
}

interface NoIngredientsProps {
    isActive: boolean,
    droppedItem: IngredientModel | null
}

const NoIngredients = ({ isActive, droppedItem }: NoIngredientsProps) => {
    return (
        <div className={classNames(isActive && droppedItem?.type !=='bun' && 'move', 'empty', 'flex-align-center')}>
            <span style={{visibility: 'hidden'}} className={classNames('flex-align-center', 'mr-2')}><DragIcon
                type="primary"/></span>
            <ConstructorElement
                isLocked={true}
                text={"Выберите начинку"}
                price={0}
                thumbnail={''}
            />
        </div>
    );
}

export interface EmptyBunInterface {
    isBottom: boolean,
    isActive: boolean,
    droppedItem: IngredientModel | null
}

const EmptyBun: React.FC<EmptyBunInterface> = ({ isBottom, isActive, droppedItem }) => {
    return (
        <div
            className={classNames(isActive && droppedItem?.type ==='bun' && 'move'
                ,'empty', styles["ingredient-element"], styles["bun"])}>
            <ConstructorElement
                type={isBottom ? 'bottom' : 'top'}
                isLocked={true}
                text={'Выберите булки'}
                price={0}
                thumbnail={''}
            />
        </div>
    );
}
