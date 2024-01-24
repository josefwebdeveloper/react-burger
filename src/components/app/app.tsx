import styles from './app.module.css';
import React from 'react';
import './app.module.css';
import {AppHeader} from "../app-header/app-header";
import {Main} from "../../pages/main/main";
import { Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {OrderFeed} from "../../pages/feeds/order-feed";
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


function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const backgroundLocation = location.state?.background;
    const onClose = () => {


        navigate( '/', {replace: true});
    }
    return (
        <div className={styles.app}>
            <AppHeader/>
            <Routes location={backgroundLocation || location}>

                <Route index element={<Main/>}/>
                <Route path="/" element={<Main/>}/>
                <Route path="/feed" element={<OrderFeed/>}/>
                <Route element={<DefaultLayout/>}>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                </Route>
                <Route element={<ProtectedLayout />}>

                    <Route path="/profile" element={<Profile/>}>
                        <Route index element={<ProfileInfo/>}/>
                        <Route path="orders" element={<OrdersHistory/>}/>
                        <Route path="*" element={<ProfileInfo/>}/>
                    </Route>

                </Route>
                <Route path='ingredients/:id' element={<IngredientDetails />}/>
                <Route path="*" element={<Main/>}/>
            </Routes>
            {backgroundLocation && <Routes>
                <Route path='/order' element={<Modal onClose={onClose} title=''>
                    <OrderDetails />
                </Modal>}/>
                <Route path='/ingredients/:id' element={<Modal onClose={onClose} title={'Детали ингредиента'}>
                    <IngredientDetails />
                </Modal>}/>
            </Routes>
            }
        </div>
    );
}

export default App;
