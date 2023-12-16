import styles from './burger-constructor.module.css';
import {IngredientModel, IngredientsProps} from "../../../models/burger-data.model";
import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {ConstructorGroup} from "./constructor-group/constructor-group";
import {ConstructorFooter} from "./constructor-footer/constructor-footer";
import {Spinner} from "../../spinner/Spinner";
import Modal from "../../modal/modal";
import {OrderDetails} from "../../order-details/order-details";


export const BurgerConstructor: React.FC<IngredientsProps> = ({ingredientsData}) => {
    const [burgerData, setBurgerData] = React.useState<IngredientModel[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [orderNumber, setOrderNumber] = useState(34536);
    const rearangeIngriduentData = (data:IngredientModel[]) => {
        let firstBun!: IngredientModel;
        const filteredData: IngredientModel[] = [];

        data.forEach(item => {
            if (item.type === 'bun') {
                if (!firstBun) {
                    filteredData.push(item);
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

        const burgerData = rearangeIngriduentData(ingredientsData);


        setBurgerData(burgerData);

    }, [ingredientsData])
    const amount = burgerData.reduce((acc, item) => {
        return acc + item.price;
    }, 0);
    const onSubmitOrder = () => {
        setOrderNumber(34563)
        onOpenModal()
    }
    const onOpenModal = () => {
        setModalOpen(true)
    }
    const handleDataFromModal = (data: any) => {
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
            <Modal
                title=''
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onDataReceive={handleDataFromModal}
            >
                <OrderDetails orderNumber={orderNumber} />
            </Modal>

        </section>
    );
};