import styles from './burger-constructor.module.css';
import {IngredientModel} from "../../../models/burger-data.model";
import React, {useContext, useEffect, useReducer, useState} from "react";
import classNames from "classnames";
import {ConstructorGroup} from "./constructor-group/constructor-group";
import {ConstructorFooter} from "./constructor-footer/constructor-footer";
import {Spinner} from "../../spinner/Spinner";
import {OrderDetails} from "../../order-details/order-details";
import {Modal} from "../../modal/modal";
import {useModal} from "../../../hooks/use-modal.hook";
import {ConstructorContext} from "../../../services/constructor-context";
import {makeOrder} from "../../../services/api.service";

const amountReducer = (state: any, action: { type: any; payload: any[]; }) => {
    switch (action.type) {
        case 'CALCULATE_AMOUNT':
            return action.payload.reduce((acc, item) => acc + item.price, 0);
        default:
            return state;
    }
};

export const BurgerConstructor: React.FC = () => {
    const context = useContext(ConstructorContext);
    if (!context) {
        throw new Error('BurgerConstructor must be used within a ConstructorProvider');
    }

    const {ingredientsData, setIngredientsData, orderNumber, updateOrderNumber} = context;
    const [burgerData, setBurgerData] = React.useState<IngredientModel[]>([]);
    const {isModalOpen, openModal, closeModal} = useModal();
    const [amount, dispatch] = useReducer(amountReducer, 0);
    const [loading, setLoading] = useState<boolean>(false);
    const rearrangeIngredient = (data: IngredientModel[]) => {
        const firstBun = data.find(item => item.type === 'bun');

        if (!firstBun) {
            return data;
        }

        const filteredData = data.filter(item => item.type !== 'bun');

        return [firstBun, ...filteredData, firstBun];
    }
    useEffect(() => {
        //TODO(remove that later) modify ingredientsData remome all items with type === 'bun', exept first , and add it to the end of array

        const burgerData = rearrangeIngredient(ingredientsData);


        setBurgerData(burgerData);
        dispatch({type: 'CALCULATE_AMOUNT', payload: burgerData});


    }, [ingredientsData])

    const onSubmitOrder = () => {
        setLoading(true);
        const orderData = {
            ingredients: burgerData.map(item => item._id)
        }
        makeOrder(orderData)

            .then(data => {
                setLoading(false);
                updateOrderNumber(data.order.number);
                setIngredientsData([]);
                openModal();
            })
            .catch(error => {
                setLoading(false);
                console.error('Error:', error)
            });
    }


    return (
        <section className={classNames(styles['burger-constructor'])}>
            {burgerData.length > 0 ? (
                <>
                    {loading?  <Spinner/>: (<>
                        <ConstructorGroup burgerData={burgerData}/>
                        <ConstructorFooter amount={amount} onSubmitOrder={onSubmitOrder}/>
                    </>)}

            
                </>
            ) :
                            <NoIngredients />
            }

            {isModalOpen && (
                <Modal
                    title=""
                    onClose={closeModal}>
                    <OrderDetails orderNumber={orderNumber}/>
                </Modal>
            )}

        </section>
    );
};
const NoIngredients = () => {
    return (
        <div className={classNames(styles['no-ingredients'])}>
            <div className={classNames(styles['no-ingredients-text'], 'text', 'text_type_main-medium', 'mb-4')}>
                Добавьте ингредиенты
            </div>
            <div className={classNames(styles['no-ingredients-text'], 'text', 'text_type_main-default', 'text_color_inactive')}>
                и соберите бургер
            </div>
        </div>
    )
}