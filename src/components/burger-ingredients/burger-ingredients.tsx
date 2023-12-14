import styles from './burger-ingredients.module.css';
import {IngredientsProps, ingredientsTypes} from "../../models/burger-data.model";
import React, { useRef} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import {BurgerGroup} from "./burger-group/burger-group";
import classNames from "classnames";


export const BurgerIngredients: React.FC<IngredientsProps> = ({ingredientsData}) => {

    const [currentTab, setCurrent] = React.useState(ingredientsTypes[0].type);
    const [burgerList, setBurgerList] = React.useState(ingredientsData);
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const onTabClick = (current: string) => {
        setCurrent(current)
        switch (current) {
            case ingredientsTypes[0].type:
                scrollToElement(bunRef)
                break;
            case ingredientsTypes[1].type:
                scrollToElement(sauceRef)
                break;
            case ingredientsTypes[2].type:
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
        <section className={classNames(styles['burger-ingredients'])}>

            <div className={classNames(styles['burger-ingredients-header'], 'text', 'text_type_main-large')}>Соберите бургер</div>
            <div className={styles['burger-tabs']}>
                {ingredientsTypes.map((tab, index) => (
                    <Tab value={tab.type} key={index} active={currentTab === tab.type}
                         onClick={onTabClick}>{tab.name}</Tab>
                ))}

            </div>{ burgerList &&
            <BurgerGroup bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} IngredientsData={burgerList}/>
        }


        </section>
    );
};