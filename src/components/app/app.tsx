import styles from './app.module.css';
import React from 'react';
import './app.module.css';
import {AppHeader} from "../app-header/app-header";
import {Main} from "../main/main";


function App() {

    return (
        <div className={styles.app}>
            <AppHeader/>
            <Main/>
        </div>
    );
}

export default App;
