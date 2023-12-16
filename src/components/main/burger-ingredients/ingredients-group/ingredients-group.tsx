import styles from './ingredients-group.module.css';
import React, {useEffect, useRef, useState} from "react";
import {IngredientModel, ingredientsTypes} from "../../../../models/burger-data.model";
import classNames from "classnames";
import {getHeightFromDivToBottom} from "../../../../utils/utils";
import {Ingredient} from "./ingredient/ingredient";
import Modal from "../../../modal/modal";
import {IngredientDetails} from "../../../ingredient-details/ingredient-details";

interface IngredientsGroupProps {
    bunRef: React.RefObject<HTMLDivElement>;
    sauceRef: React.RefObject<HTMLDivElement>;
    mainRef: React.RefObject<HTMLDivElement>;
    ingredientsData: IngredientModel[];

}

export const IngredientsGroup: React.FC<IngredientsGroupProps> = ({bunRef, sauceRef, mainRef, ingredientsData}) => {
    const [height, setHeight] = React.useState(600);
    const containerRef = useRef<HTMLDivElement>(null);
    const bun = ingredientsData.filter((item) => item.type === ingredientsTypes[0].type);
    const sauce = ingredientsData.filter((item) => item.type === ingredientsTypes[1].type);
    const main = ingredientsData.filter((item) => item.type === ingredientsTypes[2].type);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedIngredient, setIngredient] = useState<IngredientModel |null >(null);

    useEffect(() => {
        if (containerRef.current) {

            const heightFromDivToBottom = getHeightFromDivToBottom(containerRef);
            setHeight(heightFromDivToBottom);
        }
    }, []);
    const onOpenModal = (selectedIngredient:IngredientModel | null) => {
        setIngredient(selectedIngredient)
        setModalOpen(true)
    }
    return (
        <div ref={containerRef} style={{'height': height}}
             className={classNames(styles['ingredients-group-container'], 'custom-scroll')}>
            <div ref={bunRef}
                 className={classNames(styles['group-name'], 'text', 'text_type_main-medium')}>{ingredientsTypes[0].name}</div>
            <div className={classNames(styles['ingredients-container'])}>
                {bun ? bun.map((item) => <Ingredient onOpenModal={onOpenModal} key={item._id} ingredient={item}/>) :
                    (
                        <NoIngredients />
                    )}
            </div>

            <div ref={sauceRef}
                 className={classNames(styles['group-name'], 'text', 'text_type_main-medium')}>{ingredientsTypes[1].name}</div>
            <div className={classNames(styles['ingredients-container'])}>
                {sauce ? sauce.map((item) => <Ingredient onOpenModal={onOpenModal} key={item._id} ingredient={item}/>) :
                    (
                        <NoIngredients/>
                    )}

            </div>

            <div ref={mainRef}
                 className={classNames(styles['group-name'], 'text', 'text_type_main-medium')}>{ingredientsTypes[2].name}</div>
            <div className={classNames(styles['ingredients-container'])}>
                {main ? main.map((item) => <Ingredient onOpenModal={onOpenModal} key={item._id} ingredient={item}/>) :
                    (
                        <NoIngredients/>
                    )}
            </div>
            <Modal
                title="Детали ингредиента"
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            >
                <IngredientDetails selectedIngredient={selectedIngredient}/>
            </Modal>
        </div>
    );
};
const  NoIngredients=()=> {
    return (
        <div
            className={classNames(styles['ingredients-container'], 'text', 'text_type_main-default')}>Нет
            ингредиентов</div>
    );
}