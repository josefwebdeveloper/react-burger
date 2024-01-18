import React from 'react';
import styles from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, NavLink, useLocation} from "react-router-dom";
import classNames from "classnames";
import {useSelector} from "../../hooks/redux-hooks";
import {RootState} from "../../state/store";

export const AppHeader = () => {
    const userData = useSelector((state: RootState) => state.auth.basicUserInfo);
    const location = useLocation();
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
                                            ? `${styles['navbar__item']} white active-link text text_type_main-default mr-7`
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
                 <Link className={`${styles['navbar-menu']} ${styles.profile}`} to={'/profile'}>
                    <ProfileIcon type={location.pathname === '/profile'?  'primary' : 'secondary' }/>
                    <span className={classNames(styles['navbar__item'], location.pathname === '/profile'?'white':'text_color_inactive', 'text', 'text_type_main-default',' ml-2')}>
                        { userData? userData.name:'Личный кабинет'}
                    </span>
                </Link>
            </nav>
        </header>
    );
};
