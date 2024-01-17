import styles from './app.module.css';
import React from 'react';
import './app.module.css';
import {AppHeader} from "../app-header/app-header";
import {Main} from "../../pages/main/main";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {OrderFeed} from "../../pages/orders/order-feed";
import {Login} from "../../pages/auth/login/login";
import {Register} from "../../pages/auth/register/register";
import {ForgotPassword} from "../../pages/auth/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/auth/reset-password/reset-password";
import {Profile} from "../../pages/auth/profile/profile";
import {IngredientPage} from "../../pages/ingredient-page/ingredient-page";
import DefaultLayout from "../../layouts/default-layout";
import ProtectedLayout from "../../layouts/protected-layout";
import {ProfileInfo} from "../profile-info/profile-info";
import {OrderHistory} from "../order-history/order-history";


function App() {

    return (
        <div className={styles.app}>
            <AppHeader/>
            <Routes>

                <Route index element={<Main/>}/>
                <Route path="/" element={<Main/>}/>
                <Route path="/order-feed" element={<OrderFeed/>}/>
                <Route element={<DefaultLayout/>}>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                </Route>
                <Route element={<ProtectedLayout/>}>

                    <Route path="/profile" element={<Profile/>}>
                        <Route index element={<ProfileInfo/>}/>
                        <Route path="orders" element={<OrderHistory/>}/>
                        <Route path="*" element={<ProfileInfo/>}/>
                    </Route>
                    <Route path="/ingredients/:id" element={<IngredientPage/>}/>
                </Route>
                <Route path="*" element={<Main/>}/>
            </Routes>
        </div>
    );
}

export default App;
