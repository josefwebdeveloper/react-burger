import './burger-constructor.css';
import {Burger, BurgersProps} from "../models/burger-data.model";
import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';




export const BurgerConstructor: React.FC<BurgersProps> = ({burgerData}) => {


    return (
        <section className="burger-constructor ">

            {/*<div className="scrollable">*/}
            {/*    {Array.from({length: 50}, (_, i) => <p key={i}>Item {i + 1} in CompTwo</p>)}*/}
            {/*</div>*/}
        </section>
    );
};