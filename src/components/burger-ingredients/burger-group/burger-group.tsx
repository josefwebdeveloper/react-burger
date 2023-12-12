import styles from './burger-group.module.css';
import React, {useEffect, useRef} from "react";
import {BurgersProps, burgerTypes} from "../../models/burger-data.model";
import {Ingredient} from "./ingredient/ingredient";
import classNames from "classnames";
import {getHeightFromDivToBottom} from "../../../utils/utils";
 interface BurgerGroupProps extends BurgersProps  {
    bunRef: React.RefObject<HTMLDivElement>;
    sauceRef: React.RefObject<HTMLDivElement>;
    mainRef: React.RefObject<HTMLDivElement>;
}
export const BurgerGroup: React.FC<BurgerGroupProps> = ({bunRef,sauceRef,mainRef,burgerData}) => {
    const [height, setHeight] = React.useState(600);

    const containerRef = useRef<HTMLDivElement>(null);



    const bun = burgerData.filter((item) => item.type === burgerTypes[0].type);
    const sauce = burgerData.filter((item) => item.type === burgerTypes[1].type);
    const main = burgerData.filter((item) => item.type === burgerTypes[2].type);

    useEffect(() => {
        if (containerRef.current) {

            const heightFromDivToBottom = getHeightFromDivToBottom(containerRef);
            setHeight(heightFromDivToBottom);
        }
    }, []);
    return (
        <div ref={containerRef} style={{'height': height}}
             className={classNames(styles['burger-group-container'], 'custom-scroll')}>
            <div ref={bunRef}
                className={classNames(styles['group-name'], 'text', 'text_type_main-medium')}>{burgerTypes[0].name}</div>
            <div className={classNames(styles['ingredients-container'])}>
                {bun.map((item) => <Ingredient key={item._id} ingredient={item}/>)}
            </div>

            <div ref={sauceRef}
                className={classNames(styles['group-name'], 'text', 'text_type_main-medium')}>{burgerTypes[1].name}</div>
            <div className={classNames(styles['ingredients-container'])}>
                {sauce.map((item) => <Ingredient key={item._id} ingredient={item}/>)}
            </div>

            <div ref={mainRef}
                className={classNames(styles['group-name'], 'text', 'text_type_main-medium')}>{burgerTypes[2].name}</div>
            <div className={classNames(styles['ingredients-container'])}>
                {main.map((item) => <Ingredient key={item._id} ingredient={item}/>)}
            </div>
        </div>
    );
};