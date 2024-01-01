import React from 'react';
import styles from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useLocation} from "react-router-dom";

export const AppHeader = () => {
    const location = useLocation(); // Get the current location
    const menuData = [
        {name: 'Конструктор', path: '/', IconComponent: BurgerIcon},
        {name: 'Лента заказов', path: '/order-feed', IconComponent: ListIcon},
    ];


    return (
        <header className={styles['burger-header-container']}>
            <nav className={styles['burger-header'] + ' container'}>
                <div className={styles['navbar-menu']}>
                    <ul className={styles['navbar-menu']}>
                        {menuData.map((el, i) => (
                            <li key={i} className={styles['navbar__item']}>
                                <NavLink
                                    to={el.path}
                                    className={({isActive}) =>
                                        isActive
                                            ? `${styles['navbar__item']}  active-link text text_type_main-default mr-7`
                                            : `text text_type_main-default mr-7 text_color_inactive ${styles['navbar__item']}`
                                    }
                                >
                                    <span className={`mr-2`}>
                                        <el.IconComponent
                                            type={location.pathname === el.path ? 'primary' : 'secondary'}/>
                                    </span>
                                    {el.name}
                                </NavLink>
                            </li>
                        ))}

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
