import './burger-ingredients.module.css';
import {BurgersProps, burgerTypes} from "../models/burger-data.model";
import React, {useEffect, useRef, useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import {BurgerGroup} from "./burger-group/burger-group";


export const BurgerIngredients: React.FC<BurgersProps> = ({burgerData}) => {

    console.log(burgerData)
    const [currentTab, setCurrent] = React.useState(burgerTypes[0].type);
    const [burgerList, setburgerList] = React.useState(burgerData);
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const onTabClick = (current: string) => {
        setCurrent(current)
        switch (current) {
            case burgerTypes[0].type:
                scrollToElement(bunRef)
                break;
            case burgerTypes[1].type:
                scrollToElement(sauceRef)
                break;
            case burgerTypes[2].type:
                scrollToElement(mainRef)
                break;
        }

    };
    const scrollToElement = (refElement: any) => {
        if (refElement.current) {
            refElement.current.scrollIntoView({
                behavior: 'smooth',
                block: "start"
            });
        }
    }
    return (
        <section className="burger-constructor ">

            <div className='burger-constructor-header text text_type_main-large'>Соберите бургер</div>
            <div className='burger-tabs'>
                {burgerTypes.map((tab, index) => (
                    <Tab value={tab.type} key={index} active={currentTab === tab.type}
                         onClick={onTabClick}>{tab.name}</Tab>
                ))}

            </div>
            <BurgerGroup bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} burgerData={burgerList}/>

        </section>
    );
};