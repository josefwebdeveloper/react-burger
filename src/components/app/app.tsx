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
import {IngredientPage} from "../../pages/auth/ingredient-page/ingredient-page";


function App() {

    return (
        <Router>
            <div className={styles.app}>
                <AppHeader/>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/order-feed" element={<OrderFeed/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/ingredients/:id" element={<IngredientPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
