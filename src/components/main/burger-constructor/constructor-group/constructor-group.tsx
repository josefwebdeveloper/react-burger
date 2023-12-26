import styles from './constructor-group.module.css';
import classNames from "classnames";
import React, {useEffect} from "react";
import {IngredientModel} from "../../../../models/burger-data.model";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ItemTypes} from "../../burger-ingredients/ingredients-group/ingredient/ingredient";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../state/store";
import {deleteIngredient} from "../../../../state/constructor-data/constructor-slice";
interface ViewProps {
    bun: IngredientModel | null,
    maxHeight: number,
    removeIngredient: (ingredient: IngredientModel) => void,
    ingredientsConstr: any
}

export const ConstructorGroup: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        ingredientsConstructor, bun
    } = useSelector((state: RootState) => state.constructorData);
    const [maxHeight, setMaxHeight] = React.useState(80);
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

                            <div key={ingredient.unId} className={classNames(styles["ingredient-element"])}>
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
// style={{visibility:'hidden'}}
const NoIngredients = () => {
    return (
        <div className={classNames('empty','flex-align-center')}>
            <span  className={classNames('flex-align-center', 'mr-2')}><DragIcon type="primary"/></span>
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
    isBottom: boolean;
}

const EmptyBun: React.FC<EmptyBunInterface> = ({isBottom}) => {
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