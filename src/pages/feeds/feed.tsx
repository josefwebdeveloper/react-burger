import styles from './feed.module.css';
import classnames from "classnames";
import {OrdersHistory} from "../../components/order-history/orders-history";
import {OrdersInfo} from "../../components/orders-info/orders-info";
import {useEffect} from "react";
import {fetchIngredients} from "../../state/ingredients/ingredients-api";
import {useDispatch, useSelector} from "../../hooks/redux-hooks";
import {selectOrders} from "../../state/orders/orders-slice";
export const Feed = () => {
    const dispatch = useDispatch();
    const {ingredients} = useSelector((state) => state.ingredients);
    useEffect(() => {
        if(ingredients.length===0){
            dispatch(fetchIngredients())
        }
    }, [dispatch]);
    return (
        <main className={classnames(styles['feed-main'], 'container')}>
            <div className={styles.row}>
                <OrdersHistory/>
                <OrdersInfo/>
            </div>
        </main>
    );
};