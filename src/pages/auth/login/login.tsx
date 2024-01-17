import styles from './login.module.css';
import React, {useState} from "react";
import cls from "classnames";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useDispatch} from "../../../hooks/redux-hooks";
import {login} from "../../../state/auth/auth-slice";

export const Login = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({email: '', password: ''});
    const handleChangeUser = (e: { target: { name: any; value: any; }; }) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const checkIsValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (
            user.email.match(emailRegex) &&
            user.password.length > 0
        );
    }

    const onSubmit = (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        if (checkIsValid()) {
            dispatch(
                login({
                   email: user.email,
                    password: user.password,
                })
            );
        }
        console.log(user, 'not valid')
    }
    return (
        <section className={cls(styles.container)}>
            <div className={cls('text text_type_main-medium mb-6')}>Вход</div>
            <form onSubmit={onSubmit}>
                <EmailInput onChange={handleChangeUser} value={user.email} extraClass="mb-6" name={'email'}
                            placeholder="E-mail"/>
                <PasswordInput value={user.password} name={'password'} extraClass="mb-6"
                               onChange={handleChangeUser} minLength={6}
                               placeholder="Пароль"/>
                <Button disabled={!checkIsValid()}  htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
                    Войти
                </Button>
            </form>
                <div className={cls(styles.footer)}>
                    <div className={'mb-4'}>
                        <span
                            className={'text text_type_main-default text_color_inactive'}>Вы — новый пользователь? </span>
                        <span className={cls(styles.link, 'text text_type_main-default')}><Link
                            to={'/register'}> Зарегистрироваться</Link></span>
                    </div>
                    <div>
                        <span
                            className={'text text_type_main-default text_color_inactive'}>Забыли пароль? </span>
                        <span className={cls(styles.link, 'text text_type_main-default')}><Link
                            to={'/forgot-password'}> Восстановить пароль</Link></span>
                    </div>
                </div>

        </section>
    );
};