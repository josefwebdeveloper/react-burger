import styles from './order-details.module.css';
import classNames from "classnames";
import done from '../../images/done.svg'
import {useSelector} from "../../hooks/redux-hooks";



export const OrderDetails = () => {
    const { orderNumber} = useSelector((state) => state.constructorData);
    return (
        <div className={classNames(styles['order-details'])}>
            <div className={classNames(styles['order-details-title'], 'text', 'text_type_digits-large', 'mb-8')}>
                {orderNumber? orderNumber: <span>Loading...</span>}</div>
            <div className={classNames(styles['order-details-subtitle'], 'text', 'text_type_main-medium', 'mb-15')}>
                идентификатор заказа
            </div>
            <img className='mb-15' src={done} alt="done"/>
            <div className={classNames(styles['order-details-text'], 'text', 'text_type_main-default', 'mb-2')}>
                Ваш заказ начали готовить
            </div>
            <div
                className={classNames(styles['order-details-text'], 'text', 'text_type_main-default', 'text_color_inactive', 'mb-30')}>
                Дождитесь готовности на орбитальной станции
            </div>

        </div>
    );
};