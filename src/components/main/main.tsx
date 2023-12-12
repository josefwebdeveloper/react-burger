import './main.css';
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {mockData} from "../../utils/data";
import React from "react";

export const Main = () => {
    const [data, setData] = React.useState(mockData);

    return (
        <main className='burger-main container'>
            <div className="row">
                <BurgerConstructor data={data} />
                <BurgerIngredients data={data}/>
            </div>
        </main>
    );
};