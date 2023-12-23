import styles from './burger-constructor.module.css';
import {IngredientModel} from "../../../models/burger-data.model";
import React, {useContext, useEffect, useReducer} from "react";
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

    const { ingredientsData, setIngredientsData, orderNumber, updateOrderNumber } = context;
    const [burgerData, setBurgerData] = React.useState<IngredientModel[]>([]);
    const {isModalOpen, openModal, closeModal} = useModal();
    const [amount, dispatch] = useReducer(amountReducer, 0);
    const rearrangeIngredient = (data: IngredientModel[]) => {
        let firstBun!: IngredientModel;
        const filteredData: IngredientModel[] = [];

        data.forEach(item => {
            if (item.type === 'bun') {
                if (!firstBun) {
                    filteredData.unshift(item);
                    firstBun = item;
                }
            } else {
                filteredData.push(item);
            }
        });
        if (firstBun) {
            filteredData.push(firstBun);
        }
        return filteredData;
    }
    useEffect(() => {
        //TODO(remove that later) modify ingredientsData remome all items with type === 'bun', exept first , and add it to the end of array

        const burgerData = rearrangeIngredient(ingredientsData);


        setBurgerData(burgerData);
        dispatch({type: 'CALCULATE_AMOUNT', payload: burgerData});


    }, [ingredientsData])

    const onSubmitOrder = () => {
        // setOrderNumber(34563)
        const orderData = {
            ingredients: burgerData.map(item => item._id)
        }
        makeOrder(orderData)
            .then(data => {
                updateOrderNumber(data.order.number);
                openModal();
            })
            .catch(error => console.error('Error:', error));
    }


    return (
        <section className={classNames(styles['burger-constructor'])}>
            {burgerData.length > 0 ? (
                <>
                    <ConstructorGroup burgerData={burgerData}/>
                    <ConstructorFooter amount={amount} onSubmitOrder={onSubmitOrder}/>
                </>
            ) : (
                <div><Spinner/></div>
            )}

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