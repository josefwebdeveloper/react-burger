import styles from './login.module.css';
import React from "react";
import cls from "classnames";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useDispatch} from "../../../hooks/redux-hooks";
import {login} from "../../../state/auth/auth-slice";
import useForm from "../../../hooks/use-form.hook";

export const Login = () => {
    const dispatch = useDispatch();
    const { values, onChange } = useForm({ email: "", password: "" });


    const checkIsValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (
            (values.email as string).match(emailRegex) &&
            (values.password as string).length > 0
        );
    }

    const onSubmit = (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        if (checkIsValid()) {
            dispatch(
                login({
                   email: values.email as string,
                    password: values.password as string,
                })
            );
        }

    }
    return (
        <section className={cls(styles.container)}>
            <div className={cls('text text_type_main-medium mb-6')}>Вход</div>
            <form onSubmit={onSubmit}>
                <EmailInput onChange={onChange} value={values.email as string} extraClass="mb-6" name={'email'}
                            placeholder="E-mail"/>
                <PasswordInput value={values.password as string} name={'password'} extraClass="mb-6"
                               onChange={onChange} minLength={6}
                               placeholder="Пароль"/>
                <Button disabled={!checkIsValid()}  htmlType="submit" type="primary" size="medium" extraClass='mb-20' >
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