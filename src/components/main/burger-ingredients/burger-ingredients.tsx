import styles from './burger-ingredients.module.css';
import {ingredientsTypes} from "../../../models/burger-data.model";
import React, {useEffect, useRef} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import {IngredientsGroup} from "./ingredients-group/ingredients-group";
import classNames from "classnames";
import {fetchIngredients} from "../../../state/ingredients/ingredients-api";
import {Spinner} from "../../spinner/Spinner";
import {useDispatch, useSelector} from "../../../hooks/redux-hooks";


export const BurgerIngredients: React.FC = () => {
    const [currentTab, setCurrent] = React.useState(ingredientsTypes[0].type);
    const containerRef = useRef<HTMLDivElement>(null);
    const tabRef = useRef<HTMLDivElement>(null);
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const {ingredients, loading, error, selectedIngredient} = useSelector((state) => state.ingredients);

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch]);

    const handleScroll = () => {
        if (!bunRef.current || !sauceRef.current || !mainRef.current) {
            return;
        }

        const bunPos = bunRef.current.getBoundingClientRect();
        const saucePos = sauceRef.current.getBoundingClientRect();
        const mainPos = mainRef.current.getBoundingClientRect();

        if (bunPos.top >= 0 && bunPos.bottom <= window.innerHeight) {
            setCurrent(ingredientsTypes[0].type);
        } else if (saucePos.top >= 0 && saucePos.bottom <= window.innerHeight) {
            setCurrent(ingredientsTypes[1].type);
        } else if (mainPos.top >= 0 && mainPos.bottom <= window.innerHeight) {
            setCurrent(ingredientsTypes[2].type);
        }
    }
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
            <div className={classNames(styles['no-ingredients'], 'text', 'text_type_main-medium')}>Нет
                ингредиентов</div>
        )
    }
    const content = loading ? <Spinner/> : error ? <div>Ошибка</div> :
        ingredients.length > 0 ? <IngredientsGroup handleScroll={handleScroll} containerRef={containerRef}
                                                   bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef}/>
            : <NoIngredients/>;
    return (
        <section className={classNames(styles['burger-ingredients'])}>

            <div className={classNames(styles['burger-ingredients-header'], 'text', 'text_type_main-large')}>Соберите
                бургер
            </div>
            <div ref={tabRef} className={styles['burger-tabs']}>
                {ingredientsTypes.map((tab, index) => (
                    <Tab value={tab.type} key={index} active={currentTab === tab.type}
                         onClick={onTabClick}>{tab.name}</Tab>
                ))}
            </div>
            {content}
        </section>
    );
};