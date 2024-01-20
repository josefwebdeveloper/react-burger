import styles from './reset-password.module.css';
import React, {useState} from "react";
import cls from "classnames";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {forgetPassword, resetPassword} from "../../../state/auth/auth-slice";
import {useDispatch} from "../../../hooks/redux-hooks";
import useForm from "../../../hooks/use-form.hook";

export const ResetPassword = () => {
    const { values, onChange } = useForm({ code: '', password: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    if ( !localStorage.getItem('forgetPassword')) {
        return <Navigate replace to={"/forgot-password"}/>;
    }

    const checkIsValid = () => {
        return (
            values.code.length > 0 &&
            values.password.length > 0
        );
    }

    const onSubmit = async (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        if (checkIsValid()) {
            try {
                await dispatch(resetPassword({password: values.password, token: values.code})).unwrap();
                navigate('/');
            } catch (err) {

            }
        }
    }
    return (
        <section className={cls(styles.container)}>
            <div className={cls('text text_type_main-medium mb-6')}>Восстановление пароля</div>
            <form onSubmit={onSubmit}>

                <PasswordInput value={values.password} name={'password'} extraClass="mb-6"
                               onChange={onChange} minLength={6}
                               placeholder="Введите новый пароль"/>
                <Input type={'text'} value={values.code} name={'code'} onChange={onChange} extraClass="mb-6"
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