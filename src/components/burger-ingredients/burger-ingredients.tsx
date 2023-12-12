import './burger-ingredients.css';
import {Burger} from "../models/burger-data.model";
import React from "react";

interface BurgersProps {
    data: Burger[];
}
export const BurgerIngredients: React.FC<BurgersProps> = ({data}) => {
    console.log(data)
    return (
        <>
            <div className="scrollable">
                {Array.from({length: 50}, (_, i) => <p key={i}>Item {i + 1} in CompOne</p>)}
            </div>

        </>
    );
};