import styles from './constructor-group.module.css';
import classNames from "classnames";
import React, {useEffect} from "react";
import {IngredientModel, ingredientsTypes} from "../../../../models/burger-data.model";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {emptyAllIngredients} from "../../../../utils/constants";
import {ItemTypes} from "../../burger-ingredients/ingredients-group/ingredient/ingredient";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../state/store";
import {deleteIngredient} from "../../../../state/constructor-data/constructor-slice";

interface ConstructorGroupProps {
    burgerData: IngredientModel[];
}

interface ViewProps {
    bun: IngredientModel | null,
    maxHeight: number,
    removeIngredient: (ingredient: IngredientModel) => void,
    ingredientsConstr: any
}

export const ConstructorGroup: React.FC<ConstructorGroupProps> = ({burgerData}) => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        loading,
        ingredientsConstructor, bun
    } = useSelector((state: RootState) => state.constructorData);
    const [maxHeight, setMaxHeight] = React.useState(80);
    // let allIngredientsData = burgerData.length > 0 ? burgerData.filter((item) => item.type !== ingredientsTypes[0].type) : [emptyAllIngredients];
    // const [allIngredients, setAllIngredients] = React.useState<IngredientModel[]>(allIngredientsData);

    // const bun = burgerData.length > 0 ? burgerData.filter((item) => item.type === ingredientsTypes[0].type) : [emptyBun];
    const removeIngredient = (ingredient: IngredientModel) => {

        dispatch(deleteIngredient(ingredient))
    }
    useEffect(() => {
        setMaxHeight(window.innerHeight - 540);
    }, [ingredientsConstructor]);
    const content =
        <View removeIngredient={removeIngredient} maxHeight={maxHeight} ingredientsConstr={ingredientsConstructor}
              bun={bun}/>
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
                                       bun,
                                       ingredientsConstr
                                   }) => {
    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.BOX,
        drop: () => ({name: 'Dustbin'}),
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

            {bun ? <div
                className={classNames(styles["ingredient-element"], styles["bun"])}>
                <ConstructorElement
                    type={'top'}
                    isLocked={true}
                    text={bun.name + '(верх)'}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div> : <EmptyBun isBottom={false}/>
            }
            <div style={{'maxHeight': maxHeight}}
                 className={classNames(styles['scroll-container'], 'custom-scroll')}>
                {ingredientsConstr.length > 0 ? ingredientsConstr.map((ingredient: IngredientModel, index: React.Key | null | undefined) => {
                        return (

                            <div key={ingredient.unId}
                                 className={classNames((!ingredient.unId && 'empty'), styles["ingredient-element"])}>
                            <span style={!ingredient.unId ? {visibility: "hidden"} : {visibility: "visible"}}
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
            {bun ? <div
                className={classNames(styles["ingredient-element"], styles["bun"])}>
                <ConstructorElement
                    type={'bottom'}
                    isLocked={true}
                    text={bun.name + '(низ)'}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div> : <EmptyBun isBottom={true}/>
            }
        </div>
    )
}
const NoIngredients = () => {
    return (
        <div className={'empty'}>
            <ConstructorElement
                isLocked={true}
                text={"Выберите начинку"}
                price={0}
                thumbnail={''}
            />
        </div>
    );
}

export interface EmptyBun {
    isBottom: boolean;
}

const EmptyBun: React.FC<EmptyBun> = ({isBottom}) => {
    return (
        <div
            className={classNames('empty', styles["ingredient-element"], styles["bun"])}>
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