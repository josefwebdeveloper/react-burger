import styles from './ingredients-group.module.css';
import React, {useEffect} from "react";
import {IngredientModel, ingredientsTypes} from "../../../models/burger-data.model";
import classNames from "classnames";
import {getHeightFromDivToBottom} from "../../../utils/utils";
import {IngredientDetails} from "../../ingredient-details/ingredient-details";
import {useModal} from "../../../hooks/use-modal.hook";
import {Modal} from "../../modal/modal";
import {clearSelectedIngredient, setSelectedIngredient} from "../../../state/ingredients/ingredients-slice";
import {useDispatch, useSelector} from "../../../hooks/redux-hooks";
import {Ingredient} from "./ingredient/ingredient";
import {useLocation, useNavigate} from "react-router-dom";

interface IngredientsGroupProps {
    bunRef: React.RefObject<HTMLDivElement>,
    sauceRef: React.RefObject<HTMLDivElement>,
    mainRef: React.RefObject<HTMLDivElement>,
    containerRef: React.RefObject<HTMLDivElement>,
    handleScroll: () => void
}

export const IngredientsGroup: React.FC<IngredientsGroupProps> = ({
                                                                      bunRef,
                                                                      sauceRef,
                                                                      mainRef,
                                                                      containerRef,
                                                                      handleScroll
                                                                  }) => {
    const [height, setHeight] = React.useState(600);
    const location = useLocation();
    const {ingredients, loading, error, selectedIngredient} = useSelector((state) => state.ingredients);
    const bun = ingredients.filter((item) => item.type === ingredientsTypes[0].type);
    const sauce = ingredients.filter((item) => item.type === ingredientsTypes[1].type);
    const main = ingredients.filter((item) => item.type === ingredientsTypes[2].type);
    const {isModalOpen, openModal, closeModal} = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        if (containerRef.current) {

            const heightFromDivToBottom = getHeightFromDivToBottom(containerRef);
            setHeight(heightFromDivToBottom);
        }
    }, []);
    useEffect(() => {
        if (!isModalOpen && selectedIngredient) {
            dispatch(clearSelectedIngredient());
        }
    }, [dispatch, isModalOpen]);
    const onOpenModal = (selectedIngredient: IngredientModel) => {
        dispatch(setSelectedIngredient(selectedIngredient));
        navigate('/ingredients/' + selectedIngredient._id, {state: {background: location}});
    }
    return (
        <div ref={containerRef}
             className={classNames(styles['ingredients-group-container'], 'custom-scroll')}>
            <div ref={bunRef}
                 className={classNames(styles['group-name'], 'text', 'text_type_main-medium')}>{ingredientsTypes[0].name}</div>
            <div className={classNames(styles['ingredients-container'])}>
                {bun ? bun.map((item) => <Ingredient onOpenModal={onOpenModal} key={item._id} ingredient={item}/>) :
                    (
                        <NoIngredients/>
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


        </div>
    );
};
const NoIngredients = () => {
    return (
        <div
            className={classNames(styles['ingredients-container'], 'text', 'text_type_main-default')}>Нет
            ингредиентов</div>
    );
}