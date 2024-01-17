import styles from './register.module.css';
import cls from "classnames";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "../../../hooks/redux-hooks";
import {register} from "../../../state/auth/auth-slice";



export const Register = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({name: '', email: '', password: ''});
    const handleChangeUser = (e: { target: { name: any; value: any; }; }) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const checkIsValid=()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
        return (
            user.email.match(emailRegex) &&
            user.password.length >= 6 &&  // Assuming a minimum password length of 6
            user.name.trim().length > 0
        );
    }

    const onSubmit=()=>{

        if(checkIsValid()) {
            console.log(user, 'valid')
            dispatch(
                register({
                    name: user.name,
                    email:user.email,
                    password:user.password,
                })
            )
        }
        console.log(user,'not valid')
    }
    return (
        <section className={cls(styles.container)}>
            <div className={cls('text text_type_main-medium mb-6')}>Регистрация</div>
            <form onSubmit={onSubmit}>
                <Input  type={'text'} value={user.name} name={'name'} onChange={handleChangeUser}  extraClass="mb-6" placeholder="Имя"/>
                <EmailInput onChange={handleChangeUser} value={user.email} extraClass="mb-6" name={'email'} placeholder="E-mail"/>
                <PasswordInput value={user.password} name={'password'} extraClass="mb-6"
                       onChange={handleChangeUser}  minLength={6}
                       placeholder="Пароль"/>
                <Button disabled={!checkIsValid()}  onClick={onSubmit} htmlType="button" type="primary" size="medium" extraClass='mb-20'>
                    Зарегистрироваться
                </Button>
            </form>
                <div className={cls(styles.footer)}>
                    <span className={ 'text text_type_main-default text_color_inactive'}>Уже зарегистрированы? </span>
                    <span className={cls(styles.link,'text text_type_main-default')}><Link to={'/login'}> Войти</Link></span>
                </div>

        </section>
    );
};