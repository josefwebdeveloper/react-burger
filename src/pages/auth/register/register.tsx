import styles from './register.module.css';
import cls from "classnames";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "../../../hooks/redux-hooks";
import {register} from "../../../state/auth/auth-slice";
import useForm from "../../../hooks/use-form.hook";



export const Register = () => {
    const { values, onChange } = useForm({ email: "", password: "" ,name: ''});

    const dispatch = useDispatch();
    // const [user, setUser] = useState({name: '', email: '', password: ''});
    // const handleChangeUser = (e: { target: { name: any; value: any; }; }) => {
    //     setUser({...user, [e.target.name]: e.target.value});
    // };

    const checkIsValid=()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
        return (
            values.email.match(emailRegex) &&
            values.password.length >= 6 &&  // Assuming a minimum password length of 6
            values.name.trim().length > 0
        );
    }

    const onSubmit=(e: React.SyntheticEvent<Element, Event>)=>{
        e.preventDefault();
        if(checkIsValid()) {
            dispatch(
                register({
                    name: values.name,
                    email:values.email,
                    password:values.password,
                })
            )
        }
    }
    return (
        <section className={cls(styles.container)}>
            <div className={cls('text text_type_main-medium mb-6')}>Регистрация</div>
            <form onSubmit={onSubmit}>
                <Input  type={'text'} value={values.name} name={'name'} onChange={onChange}  extraClass="mb-6" placeholder="Имя"/>
                <EmailInput onChange={onChange} value={values.email} extraClass="mb-6" name={'email'} placeholder="E-mail"/>
                <PasswordInput value={values.password} name={'password'} extraClass="mb-6"
                       onChange={onChange}  minLength={6}
                       placeholder="Пароль"/>
                <Button disabled={!checkIsValid()}   htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
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