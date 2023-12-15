import styles from './burger-constructor.module.css';
import {IngredientModel, IngredientsProps} from "../../../models/burger-data.model";
import React, {useEffect} from "react";
import classNames from "classnames";
import {ConstructorGroup} from "./constructor-group/constructor-group";
import {ConstructorFooter} from "./constructor-footer/constructor-footer";
import {Spinner} from "../../spinner/Spinner";


export const BurgerConstructor: React.FC<IngredientsProps> = ({ingredientsData}) => {
    const [burgerData, setBurgerData] = React.useState<IngredientModel[]>([]);
    const rearangeIngriduentData = (data:IngredientModel[]) => {
        let firstBun!: IngredientModel;
        const filteredData: IngredientModel[] = [];

        data.forEach(item => {
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

        return filteredData;
    }
    useEffect(() => {
        //TODO(remove that later) modify ingredientsData remome all items with type === 'bun', exept first , and add it to the end of array

        const burgerData = rearangeIngriduentData(ingredientsData);


        setBurgerData(burgerData);

    }, [ingredientsData])
    const amount = burgerData.reduce((acc, item) => {
        return acc + item.price;
    }, 0);
    const onSubmitOrder = () => {
        alert('Order submitted')
    }


    return (
        <section className={classNames(styles['burger-constructor'])}>
            {burgerData.length > 0 ? (
                <>
                    <ConstructorGroup burgerData={burgerData}/>
                    <ConstructorFooter amount={amount} onSubmitOrder={onSubmitOrder}/>
                </>
            ) : (
                <div><Spinner/></div>
            )}


        </section>
    );
};