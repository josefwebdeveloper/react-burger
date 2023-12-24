import styles from './burger-ingredients.module.css';
import { ingredientsTypes} from "../../../models/burger-data.model";
import React, {useEffect, useRef} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import {IngredientsGroup} from "./ingredients-group/ingredients-group";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../state/store";
import {fetchIngredients} from "../../../state/ingredients/ingredients-api";
import {Spinner} from "../../spinner/Spinner";


export const BurgerIngredients: React.FC = () => {
    const [currentTab, setCurrent] = React.useState(ingredientsTypes[0].type);
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { ingredients, loading, error } = useSelector((state: RootState) => state.ingredients);

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch]);
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
    const NoIngredients = () => {
        return (
            <div className={classNames(styles['no-ingredients'], 'text', 'text_type_main-medium')}>Нет ингредиентов</div>
        )
    }
    const content = loading ? <Spinner/> : error ? <div>Ошибка</div> :
        ingredients.length > 0? <IngredientsGroup bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef}/>

    : <NoIngredients/>;
    return (
        <section className={classNames(styles['burger-ingredients'])}>

            <div className={classNames(styles['burger-ingredients-header'], 'text', 'text_type_main-large')}>Соберите бургер</div>
            <div className={styles['burger-tabs']}>
                {ingredientsTypes.map((tab, index) => (
                    <Tab value={tab.type} key={index} active={currentTab === tab.type}
                         onClick={onTabClick}>{tab.name}</Tab>
                ))}

            </div>{ content

        }


        </section>
    );
};