import styles from './constructor-group.module.css';
import classNames from "classnames";
import React, {useEffect} from "react";
import {IngredientModel, ingredientsTypes} from "../../../../models/burger-data.model";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {emptyAllIngredients, emptyBun} from "../../../../utils/constants";
import {ItemTypes} from "../../burger-ingredients/ingredients-group/ingredient/ingredient";
import {useDrop} from "react-dnd";

interface ConstructorGroupProps {
    burgerData: IngredientModel[];
}

interface ViewProps {
    allIngredients: IngredientModel[];
    bun: IngredientModel[];
    maxHeight: number;
    removeIngredient: (ingredient: IngredientModel) => void;
}

export const ConstructorGroup: React.FC<ConstructorGroupProps> = ({burgerData}) => {

    const [maxHeight, setMaxHeight] = React.useState(80);
    let allIngredientsData = burgerData.length > 0 ? burgerData.filter((item) => item.type !== ingredientsTypes[0].type) : [emptyAllIngredients];
    const [allIngredients, setAllIngredients] = React.useState<IngredientModel[]>(allIngredientsData);

    const bun = burgerData.length > 0 ? burgerData.filter((item) => item.type === ingredientsTypes[0].type) : [emptyBun];
    const removeIngredient = (ingredient: IngredientModel) => {
        if (allIngredients.length === 1) {
            setAllIngredients([emptyAllIngredients])
            return;
        }
        const newIngredients = allIngredients.filter((item) => item._id !== ingredient._id);
        setAllIngredients(newIngredients)
    }
    useEffect(() => {
        console.log(allIngredients, 4444)
        setMaxHeight(window.innerHeight - 540);
    }, [allIngredients]);
    const content =
        <View removeIngredient={removeIngredient} maxHeight={maxHeight} allIngredients={allIngredients} bun={bun}/>
    return (
        <section
            className={classNames(styles['constructor-group-container'])}>

            {content}
        </section>
    );
};

const View: React.FC<ViewProps> = ({
                                       removeIngredient,
                                       maxHeight,
                                       allIngredients, bun
                                   }) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.BOX,
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))
    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }
    return (
        <div ref={drop} data-testid="dustbin" className={classNames(styles['ingredient-element-container'])}>

            <div
                className={classNames((bun[0]._id === 'empty' ? 'empty' : ''), styles["ingredient-element"], styles["bun"])}>
                <ConstructorElement
                    type={'top'}
                    isLocked={true}
                    text={bun[0]._id === 'empty' ? bun[0].name : bun[0].name + '(верх)'}
                    price={bun[0].price}
                    thumbnail={bun[0].image}
                />
            </div>
            <div style={{'maxHeight': maxHeight}}
                 className={classNames(styles['scroll-container'], 'custom-scroll')}>
                {allIngredients.length > 0 ? allIngredients.map((ingredient, index) => {
                        return (

                            <div key={index}
                                 className={classNames((ingredient._id === 'empty' && 'empty'), styles["ingredient-element"])}>
                            <span style={ingredient._id==='empty' ? {visibility: "hidden"} : {visibility: "visible"}}
                                  className={classNames('flex-align-center', 'mr-2')}><DragIcon type="primary"/>
                            </span>
                                <ConstructorElement
                                    isLocked={false}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    handleClose={() => removeIngredient(ingredient)}

                                />
                            </div>

                        )
                    }) :
                    (
                        <NoIngredients/>
                    )}
            </div>
            <div
                className={classNames((bun[0]._id === 'empty' && 'empty'), styles["ingredient-element"], styles["bun"])}>
                <ConstructorElement
                    type={'bottom'}
                    isLocked={true}
                    text={bun[0]._id === 'empty' ? bun[0].name : bun[0].name + '(низ)'}
                    price={bun[0].price}
                    thumbnail={bun[0].image}
                />
            </div>
        </div>
    )
}
const NoIngredients = () => {
    return (
        <div
            className={classNames(styles['ingredients-container'], 'text', 'text_type_main-default')}>Нет
            ингредиентов</div>
    );
}