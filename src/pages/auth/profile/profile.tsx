import styles from './profile.module.css';
import classNames from "classnames";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from 'react';
import {Link, NavLink, Outlet, useLocation} from "react-router-dom";
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {useDispatch} from "../../../hooks/redux-hooks";
import {getUser, logout, updateUser} from "../../../state/auth/auth-slice";
import {useSelector} from "react-redux";
import {RootState} from "../../../state/store";
import {User} from "../../../models/auth.model";
// interface Fields {
//     name?: string;
//     email?: string;
//     password?: string;
//     icon: keyof TICons;
// }
export const Profile = () => {
    const dispatch = useDispatch();

    const location = useLocation(); // Get the current location

    return (
        <div className={classNames(styles.container)}>
            <div className={styles.profile}>

                <NavLink
                    to="/profile"
                    className={({ isActive }) =>{
                        const isExactActive = isActive && location.pathname === '/profile';
                        return classNames(
                            styles.link,
                            'text',
                            'text_type_main-medium',
                            isExactActive ? 'white' : 'text_color_inactive'
                        )
                    }}
                >
                    Профиль
                </NavLink>
                <NavLink
                    to="/profile/orders"
                    className={({ isActive }) =>
                        classNames(
                            styles.link,
                            'text',
                            'text_type_main-medium',
                            isActive ? 'white' : 'text_color_inactive'
                        )
                    }
                >
                    История заказов
                </NavLink>
                <Link onClick={() => dispatch(logout())}
                    className={classNames(styles.link, 'text', 'text_type_main-medium', 'text_color_inactive', 'mb-20')}
                    to={'/login'}>Выход</Link>
                <div className={classNames(styles.info, 'text', 'text_type_main-default', 'text_color_inactive')}>
                    В этом разделе вы можете
                    изменить свои персональные данные
                </div>
            </div>
            <div className={classNames(styles.outlet)}>
                <Outlet/>
            </div>

        </div>
    );
};