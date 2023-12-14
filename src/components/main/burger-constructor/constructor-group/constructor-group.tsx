import styles from './constructor-group.module.css';
import classNames from "classnames";
import React, {useEffect, useRef} from "react";
import {getHeightFromDivToBottom} from "../../../../utils/utils";
import {IngredientModel} from "../../../../models/burger-data.model";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface ConstructorGroupProps {
    burgerData: IngredientModel[];
}

export const ConstructorGroup: React.FC<ConstructorGroupProps> = ({burgerData}) => {
    const [height, setHeight] = React.useState(600);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {

            const heightFromDivToBottom = getHeightFromDivToBottom(containerRef) - 136;
            setHeight(heightFromDivToBottom);
        }
    }, []);
    const content = burgerData ? <View burgerData={burgerData}/> : null
    return (
        <section ref={containerRef} style={{'height': height}}
                 className={classNames(styles['constructor-group-container'], 'custom-scroll')}>

            {content}
        </section>
    );
};
const getType = (index: number, length: number) => {
    switch (index) {
        case 0:
            return 'top'
        case length - 1:
            return 'bottom'
        default:
            return undefined
    }
}
const View: React.FC<ConstructorGroupProps> = ({burgerData}) => {
    return (
        <div className={classNames(styles['ingredient-element-container'])} >
            {burgerData.length > 0 ? burgerData.map((ingredient, index) => {
                    return (
                        <div key={index} className={classNames(styles["ingredient-element"])}>
                            <span style={ingredient.type === 'bun' ? {visibility: "hidden"} : {visibility: "visible"}}
                                  className={classNames('flex-align-center', 'mr-2')}><DragIcon type="primary"/>
                            </span>
                            <ConstructorElement
                                type={getType(index, burgerData.length)}
                                isLocked={ingredient.type === 'bun'}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </div>
                    )
                }) :
                (
                    <NoIngredients/>
                )}

        </div>
    )
}
const NoIngredients = () => {
    return (
        <div
            className={classNames(styles['ingredients-container'], 'text', 'text_type_main-default')}>Нет
            ингредиентов</div>
    );
}