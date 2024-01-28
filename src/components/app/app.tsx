import styles from './app.module.css';
import React, {useEffect} from 'react';
import './app.module.css';
import {AppHeader} from "../app-header/app-header";
import {Main} from "../../pages/main/main";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Feed} from "../../pages/feeds/feed";
import {Login} from "../../pages/auth/login/login";
import {Register} from "../../pages/auth/register/register";
import {ForgotPassword} from "../../pages/auth/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/auth/reset-password/reset-password";
import {Profile} from "../../pages/auth/profile/profile";
import DefaultLayout from "../../layouts/default-layout";
import ProtectedLayout from "../../layouts/protected-layout";
import {ProfileInfo} from "../profile-info/profile-info";
import {OrdersHistory} from "../order-history/orders-history";
import {Modal} from "../modal/modal";
import {OrderDetails} from "../order-details/order-details";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {OrderInfo} from "../order-info/order-info";
import {ProfileOrder} from "../../pages/profile-order/profile-order";
import {fetchIngredients} from "../../state/ingredients/ingredients-api";
import {useDispatch} from "../../hooks/redux-hooks";


function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const backgroundLocation = location.state?.background;
    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch]);
    const onClose = () => {
        if (backgroundLocation) {
            navigate(backgroundLocation.pathname);
        } else

            navigate('/', {replace: true});
    }
    return (
        <div className={styles.app}>
            <AppHeader/>
            <Routes location={backgroundLocation || location}>

                <Route index element={<Main/>}/>
                <Route path="/" element={<Main/>}/>
                <Route path="/feed" element={<Feed/>}/>
                <Route element={<DefaultLayout/>}>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                </Route>
                <Route element={<ProtectedLayout/>}>
                    <Route path="/profile/orders/:id" element={<ProfileOrder/>}/>

                    <Route path="/profile" element={<Profile/>}>
                        <Route index element={<ProfileInfo/>}/>
                        <Route path="orders" element={<OrdersHistory/>}/>
                        <Route path="*" element={<ProfileInfo/>}/>
                    </Route>

                </Route>
                <Route path='ingredients/:id' element={<IngredientDetails/>}/>
                <Route path='feed/:id' element={<ProfileOrder/>}/>
                <Route path="*" element={<Main/>}/>
            </Routes>
            {backgroundLocation && <Routes>
                <Route path='/order' element={<Modal onClose={onClose} title=''>
                    <OrderDetails/>
                </Modal>}/>
                <Route path='/ingredients/:id' element={<Modal onClose={onClose} title={'Детали ингредиента'}>
                    <IngredientDetails/>
                </Modal>}/>
                <Route path='/feed/:id' element={<Modal onClose={onClose} title=''>
                    <OrderInfo/>
                </Modal>}/>
                <Route element={<ProtectedLayout/>}>
                    <Route path="/profile/orders/:id" element={<Modal onClose={onClose} title=''>
                        <OrderInfo/>
                    </Modal>}/>
                </Route>
            </Routes>
            }
        </div>
    );
}

export default App;
