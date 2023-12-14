import styles from './burger-constructor.module.css';
import {IngredientModel, IngredientsProps} from "../../../models/burger-data.model";
import React, {useEffect} from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';
import classNames from "classnames";
import {ConstructorGroup} from "./constructor-group/constructor-group";
import {ConstructorFooter} from "./constructor-footer/constructor-footer";
import {Spinner} from "../../spinner/Spinner";


export const BurgerConstructor: React.FC<IngredientsProps> = ({ingredientsData}) => {
    const [burgerData, setBurgerData] = React.useState<IngredientModel[]>([]);
    const getMockBurger = () => {
        let firstBun!: IngredientModel;
        const filteredData: IngredientModel[] = [];

        ingredientsData.forEach(item => {
            if (item.type === 'bun') {
                if (!firstBun) {
                    filteredData.push(item);
                    firstBun = item;
                }
            } else {
                filteredData.push(item);
            }
        });
        if (firstBun) {
            filteredData.push(firstBun);
        }
        console.log(filteredData)

        return filteredData;
    }
    useEffect(() => {
        // modify ingredientsData remome all items with type === 'bun', exept first , and add it to the end of array
        const burgerData = getMockBurger();


        setBurgerData(burgerData);

    }, [])

    return (
        <section className={classNames(styles['burger-constructor'])}>
            {burgerData.length > 0 ? (
                <>
                    <ConstructorGroup burgerData={burgerData}/>
                    <ConstructorFooter/>
                </>
            ): (
                <div><Spinner/></div>
            )}


        </section>
    );
};