import styles from './ingredients-group.module.css';
import React, {useEffect, useRef, useState} from "react";
import {IngredientModel, ingredientsTypes} from "../../../../models/burger-data.model";
import classNames from "classnames";
import {getHeightFromDivToBottom} from "../../../../utils/utils";
import {Ingredient} from "./ingredient/ingredient";

interface IngredientsGroupProps {
    bunRef: React.RefObject<HTMLDivElement>;
    sauceRef: React.RefObject<HTMLDivElement>;
    mainRef: React.RefObject<HTMLDivElement>;
    IngredientsData: IngredientModel[];

}

export const IngredientsGroup: React.FC<IngredientsGroupProps> = ({bunRef, sauceRef, mainRef, IngredientsData}) => {
    const [height, setHeight] = React.useState(600);
    const containerRef = useRef<HTMLDivElement>(null);


    const bun = IngredientsData.filter((item) => item.type === ingredientsTypes[0].type);
    const sauce = IngredientsData.filter((item) => item.type === ingredientsTypes[1].type);
    const main = IngredientsData.filter((item) => item.type === ingredientsTypes[2].type);

    useEffect(() => {
        if (containerRef.current) {

            const heightFromDivToBottom = getHeightFromDivToBottom(containerRef);
            setHeight(heightFromDivToBottom);
        }
    }, []);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    return (
        <div ref={containerRef} style={{'height': height}}
             className={classNames(styles['ingredients-group-container'], 'custom-scroll')}>
            <div ref={bunRef}
                 className={classNames(styles['group-name'], 'text', 'text_type_main-medium')}>{ingredientsTypes[0].name}</div>
            <div className={classNames(styles['ingredients-container'])}>
                {bun ? bun.map((item) => <Ingredient key={item._id} ingredient={item}/>) :
                    (
                        <NoIngredients/>
                    )}
            </div>

            <div ref={sauceRef}
                 className={classNames(styles['group-name'], 'text', 'text_type_main-medium')}>{ingredientsTypes[1].name}</div>
            <div className={classNames(styles['ingredients-container'])}>
                {sauce ? sauce.map((item) => <Ingredient key={item._id} ingredient={item}/>) :
                    (
                        <NoIngredients/>
                    )}

            </div>

            <div ref={mainRef}
                 className={classNames(styles['group-name'], 'text', 'text_type_main-medium')}>{ingredientsTypes[2].name}</div>
            <div className={classNames(styles['ingredients-container'])}>
                {main ? main.map((item) => <Ingredient key={item._id} ingredient={item}/>) :
                    (
                        <NoIngredients/>
                    )}
            </div>
        </div>
    );
};
const  NoIngredients=()=> {
    return (
        <div
            className={classNames(styles['ingredients-container'], 'text', 'text_type_main-default')}>Нет
            ингредиентов</div>
    );
}