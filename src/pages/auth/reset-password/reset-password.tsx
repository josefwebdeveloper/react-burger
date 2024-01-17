import styles from './reset-password.module.css';
import React, {useState} from "react";
import cls from "classnames";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {forgetPassword, resetPassword} from "../../../state/auth/auth-slice";
import {useDispatch} from "../../../hooks/redux-hooks";

export const ResetPassword = () => {
    const [payload, setPayload] = useState({code: '', password: ''});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if ( !localStorage.getItem('forgetPassword')) {
        return <Navigate replace to={"/login"}/>;
    }
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setPayload({...payload, [e.target.name]: e.target.value});
    };

    const checkIsValid = () => {
        return (
            payload.code.length > 0 &&
            payload.password.length > 0
        );
    }

    const onSubmit = async (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        if (checkIsValid()) {
            try {
                await dispatch(resetPassword({password: payload.password, token: payload.code})).unwrap();
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <section className={cls(styles.container)}>
            <div className={cls('text text_type_main-medium mb-6')}>Восстановление пароля</div>
            <form onSubmit={onSubmit}>

                <PasswordInput value={payload.password} name={'password'} extraClass="mb-6"
                               onChange={handleChange} minLength={6}
                               placeholder="Введите новый пароль"/>
                <Input type={'text'} value={payload.code} name={'code'} onChange={handleChange} extraClass="mb-6"
                       placeholder="Введите код из письма"/>
                <Button disabled={!checkIsValid()} htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
                    Сохранить
                </Button>
            </form>
            <div className={cls(styles.footer)}>
                        <span
                            className={'text text_type_main-default text_color_inactive'}>Вспомнили пароль? </span>
                <span className={cls(styles.link, 'text text_type_main-default')}><Link
                    to={'/login'}> Войти</Link></span>

            </div>

        </section>
    );
};