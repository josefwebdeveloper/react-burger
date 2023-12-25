import styles from './constructor-group.module.css';
import classNames from "classnames";
import React, {useEffect} from "react";
import {IngredientModel, ingredientsTypes} from "../../../../models/burger-data.model";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface ConstructorGroupProps {
    burgerData: IngredientModel[];
}

interface ViewProps {
    burgerData: IngredientModel[];
    allIngredients: IngredientModel[];
    bun: IngredientModel[];
    maxHeight: number;
}

export const ConstructorGroup: React.FC<ConstructorGroupProps> = ({burgerData}) => {
    const [maxHeight, setMaxHeight] = React.useState(80);

    const bun = burgerData.filter((item) => item.type === ingredientsTypes[0].type);
    const allIngredients = burgerData.filter((item) => item.type !== ingredientsTypes[0].type);
    useEffect(() => {

        setMaxHeight(window.innerHeight - 540);
    }, [allIngredients]);
    const content = burgerData ?
        <View maxHeight={maxHeight} burgerData={burgerData} allIngredients={allIngredients} bun={bun}/> : null
    return (
        <section
            className={classNames(styles['constructor-group-container'])}>

            {content}
        </section>
    );
};
const View: React.FC<ViewProps> = ({
                                       burgerData, maxHeight,
                                       allIngredients, bun
                                   }) => {
    return (
        <div className={classNames(styles['ingredient-element-container'])}>

            <div className={classNames(styles["ingredient-element"], styles["bun"])}>
                <ConstructorElement
                    type={'top'}
                    isLocked={true}
                    text={`${bun[0].name}  (верх)`}
                    price={bun[0].price}
                    thumbnail={bun[0].image}
                />
            </div>
            <div style={{'maxHeight': maxHeight}}
                 className={classNames(styles['scroll-container'], 'custom-scroll')}>
                {allIngredients.length > 0 ? allIngredients.map((ingredient, index) => {
                        return (

                            <div key={index} className={classNames(styles["ingredient-element"])}>
                            <span style={ingredient.type === 'bun' ? {visibility: "hidden"} : {visibility: "visible"}}
                                  className={classNames('flex-align-center', 'mr-2')}><DragIcon type="primary"/>
                            </span>
                                <ConstructorElement
                                    isLocked={false}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                />
                            </div>

                        )
                    }) :
                    (
                        <NoIngredients/>
                    )}
            </div>
            <div className={classNames(styles["ingredient-element"], styles["bun"])}>
                <ConstructorElement
                    type={'bottom'}
                    isLocked={true}
                    text={`${bun[0].name} (низ)`}
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