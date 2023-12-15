import  styles from './main.module.css';
import {BurgerIngredients} from "./burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "./burger-constructor/burger-constructor";
import {mockData} from "../../utils/data";
import React from "react";
import classnames from 'classnames';
import {IngredientModel} from "../../models/burger-data.model";
interface MainProps {
    ingredientsData: IngredientModel[]
}

export const Main = ({ingredientsData}: MainProps) => {
    const [burgerData, setData] = React.useState(mockData);
    const [ingredients, setIngredients] = React.useState(ingredientsData);
    React.useEffect(() => {
        if (ingredientsData.length > 0) {
            setIngredients(ingredientsData);
        }
    }, [ingredientsData]);
    return (
        <main className={classnames(styles['burger-main'] , 'container')}>
            <div className={styles.row}>
                <BurgerIngredients ingredientsData={ingredients}/>
                <BurgerConstructor ingredientsData={ingredients} />
            </div>
        </main>
    );
};