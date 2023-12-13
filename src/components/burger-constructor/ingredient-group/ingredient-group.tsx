import styles from './ingredient-group.module.css';
import classNames from "classnames";
import React, {useEffect, useRef} from "react";
import {getHeightFromDivToBottom} from "../../../utils/utils";
import {IngredientModel} from "../../../models/burger-data.model";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

interface BurgerGroupProps {

    burgerData: IngredientModel[];

}

export const IngredientGroup: React.FC<BurgerGroupProps> = ({burgerData}) => {
    const [height, setHeight] = React.useState(600);
    const containerRef = useRef<HTMLDivElement>(null);
    const [burger, setBurger] = React.useState(burgerData)
    console.log(burgerData)

    useEffect(() => {
        if (containerRef.current) {

            const heightFromDivToBottom = getHeightFromDivToBottom(containerRef) - 136;
            setHeight(heightFromDivToBottom);
        }
    }, []);
    return (
        <section ref={containerRef} style={{'height': height}}
                 className={classNames(styles['ingredient-group-container'], 'custom-scroll')}>
            {
                burger &&
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    {/*<IngredientItem ingredient={burger[0]}/>*/}
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={burger[0].image}
                    />

                </div>
            }

        </section>
    );
};