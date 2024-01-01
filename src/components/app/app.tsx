import styles from './app.module.css';
import React from 'react';
import './app.module.css';
import {AppHeader} from "../app-header/app-header";
import {Main} from "../../pages/main/main";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {OrderFeed} from "../../pages/orders/order-feed";


function App() {

    return (
        <Router>
            <div className={styles.app}>
                <AppHeader/>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/order-feed" element={<OrderFeed/>}/>

                </Routes>
            </div>
        </Router>
    );
}

export default App;
