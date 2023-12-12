import React from 'react';
import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {
    return (
        <header className={styles['burger-header-container']}>
            <nav className={styles['burger-header'] +' container'}>
                <div className={styles['navbar-menu']}>
                    <ul className={styles['navbar-menu']}>
                        <li className={`${styles['navbar__item']} text text_type_main-default mr-7`}>
                            <span className={`mr-2`}><BurgerIcon type="primary"/></span>
                            Конструктор
                        </li>
                        <li className={`${styles['navbar__item']} text_color_inactive text text_type_main-default`}>
                            <span className='mr-2'><ListIcon type="secondary"/></span>
                            Лента заказов
                        </li>
                    </ul>
                </div>
                <div className={`${styles['navbar-menu']} ${styles.logo}`}>
                    <Logo/>
                </div>
                <div className={`${styles['navbar-menu']} ${styles.profile}`}>
                    <ProfileIcon type="secondary"/>
                    <span className={`${styles['navbar__item']} text_color_inactive text text_type_main-default ml-2`}>
                        Личный кабинет
                    </span>
                </div>
            </nav>
        </header>
    );
};
