import styles from './burger-constructor.module.css';
import React, { useEffect, useState} from "react";
import classNames from "classnames";
import {ConstructorGroup} from "./constructor-group/constructor-group";
import {ConstructorFooter} from "./constructor-footer/constructor-footer";
import {Spinner} from "../../spinner/Spinner";
import {OrderDetails} from "../../order-details/order-details";
import {Modal} from "../../modal/modal";
import {useModal} from "../../../hooks/use-modal.hook";
import {makeOrder} from "../../../services/api.service";
import {useSelector} from "react-redux";
import {RootState} from "../../../state/store";

export const BurgerConstructor: React.FC = () => {
    const {  loading ,
        ingredientsConstructor, bun} = useSelector((state: RootState) => state.constructorData);

    const {isModalOpen, openModal, closeModal} = useModal();
    const [amount, setAmount] = useState( 0);
    useEffect(() => {
        let amount = ingredientsConstructor.reduce((acc, item) => acc + item.price, 0);
        setAmount( bun? amount += bun.price * 2 : amount);

    }, [ingredientsConstructor,bun])

    const onSubmitOrder = () => {
        const orderData = {
            ingredients: ingredientsConstructor.map(item => item._id)
        }
        makeOrder(orderData)

            .then(data => {

                openModal();
            })
            .catch(error => {
                console.error('Error:', error)
            });
    }

    return (
        <section className={classNames(styles['burger-constructor'])}>

                    {loading?  <Spinner/>: (<>
                        <ConstructorGroup burgerData={ingredientsConstructor}/>
                        <ConstructorFooter amount={amount} onSubmitOrder={onSubmitOrder}/>
                    </>)}

            {isModalOpen && (
                <Modal
                    title=""
                    onClose={closeModal}>
                    <OrderDetails orderNumber={amount}/>
                </Modal>
            )}
        </section>
    );
};
