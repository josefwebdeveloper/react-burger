import styles from './profile.module.css';
import classNames from "classnames";
import React from 'react';
import {Link, Navigate, NavLink, Outlet, useLocation} from "react-router-dom";
import {useDispatch} from "../../../hooks/redux-hooks";
import {getUser, logout} from "../../../state/auth/auth-slice";
import {useSelector} from "react-redux";
import {RootState} from "../../../state/store";

export const Profile = () => {
    const dispatch = useDispatch();

        // dispatch(getUser());
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