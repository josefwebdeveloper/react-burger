import styles from './forgot-password.module.css';
import React, {useState} from "react";
import cls from "classnames";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "../../../hooks/redux-hooks";
import {forgetPassword} from "../../../state/auth/auth-slice";
export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangeUser = (e: { target: { name: any; value: any; }; }) => {
        setEmail( e.target.value);
    };

    const checkIsValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (
            email.match(emailRegex)
        );
    }

    const onSubmit = async (e: React.SyntheticEvent<Element, Event>) => {

        e.preventDefault();
        if (checkIsValid()) {
            try {
                await dispatch(forgetPassword({email: email})).unwrap();
                navigate('/reset-password');
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <section className={cls(styles.container)}>
            <div className={cls('text text_type_main-medium mb-6')}>Восстановление пароля</div>
            <form onSubmit={onSubmit}>
                <EmailInput onChange={handleChangeUser} value={email} extraClass="mb-6" name={'email'}
                            placeholder="Укажите e-mail"/>
                <Button disabled={!checkIsValid()} htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
                    Восстановить
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