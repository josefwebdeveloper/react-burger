import './burger-constructor.css';
import {Burger} from "../models/burger-data.model";
import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';

interface BurgersProps {
    data: Burger[];
}


export const BurgerConstructor: React.FC<BurgersProps> = ({data}) => {
    const tabs = [
        {name: 'Булки', type: 'buns'},
        {name: 'Соусы', type: 'sauce'},
        {name: 'Начинки', type: 'main'},
    ]
    const [current, setCurrent] = React.useState(tabs[0].type);

    return (
        <section className="burger-constructor ">
            <div className='burger-constructor-header text text_type_main-large'>Соберите бургер</div>
            <div className='burger-tabs'>
                {tabs.map((tab, index) => (
                    <Tab value={tab.type}   key={index} active={current === tab.type}
                         onClick={setCurrent}>{tab.name}</Tab>
                ))}

            </div>


            {/*<div className="scrollable">*/}
            {/*    {Array.from({length: 50}, (_, i) => <p key={i}>Item {i + 1} in CompTwo</p>)}*/}
            {/*</div>*/}
        </section>
    );
};