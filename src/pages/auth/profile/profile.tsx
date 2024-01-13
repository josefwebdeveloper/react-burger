import styles from './profile.module.css';
import classNames from "classnames";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
interface ProfileUser {
    name?: string;
    login?: string;
    password?: string;
    icon: keyof TICons;
}
export const Profile = () => {
    const initialUser = {
        name: 'Joseph',
        login: 'jose@gmail.com',
        password: '123456'
    }
    const [user, setUser] = useState<ProfileUser[]>([])
    useEffect(() => {
        setUser([
            {
                name: initialUser.name,
                icon: 'EditIcon' as keyof TICons
            },
            {
                login: initialUser.login,
                icon: 'EditIcon' as keyof TICons
            },
            {
                password: initialUser.password,
                icon: 'EditIcon' as keyof TICons
            }
        ])


    }, []);

    const location = useLocation(); // Get the current location


    const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setUser(prevState => {
            // Create a copy of the current state
            const newState = [...prevState];

            // Determine which field to update based on the 'name' attribute
            if (name === 'name') {
                newState[0].name = value;
            } else if (name === 'login') {
                newState[1].login = value;
            } else if (name === 'password') {
                newState[2].password = value;
            }

            // Return the updated state
            return newState;
        });
    };
    const iconHandler = (field: any) => {
        if (field.icon === 'EditIcon') {
            field.icon = 'CloseIcon' as keyof TICons;

        } else {
            field.icon = 'EditIcon' as keyof TICons;
            field.name = '';
        }
        return field;
    }
    const handleEditClick = (fieldName: string) => {
        setUser(prevState => {
            const newState = [...prevState];

            if (fieldName === 'name') {
                newState[0] = iconHandler(newState[0]);
            } else if (fieldName === 'login') {
                newState[1] = iconHandler(newState[1]);

            } else if (fieldName === 'password') {
                newState[2] = iconHandler(newState[2]);

            }

            return newState;
        });
    };
    const onSubmit = () => {
        console.log(user)


    }
    return (
        <div className={classNames(styles.container)}>
            <div className={styles.profile}>
                <Link
                    className={classNames(styles.link, 'text', 'text_type_main-medium', location.pathname !== 'profile' ? 'white' : 'text_color_inactive')}
                    to={'/profile'}>Профиль</Link>
                <Link className={classNames(styles.link, 'text', 'text_type_main-medium', 'text_color_inactive')}
                      to={'/order-feed'}>История заказов</Link>
                <Link
                    className={classNames(styles.link, 'text', 'text_type_main-medium', 'text_color_inactive', 'mb-20')}
                    to={'/logout'}>Выход</Link>
                <div className={classNames(styles.info, 'text', 'text_type_main-default', 'text_color_inactive')}>
                    В этом разделе вы можете
                    изменить свои персональные данные
                </div>
            </div>
            {user.length>0 && <div className={styles.form}>
                <form onSubmit={onSubmit} className={classNames(styles['form-group'])}>
                    <Input  type={'text'} icon={user[0].icon}
                           value={user[0].name || ''} extraClass={'mb-6'}
                           onIconClick={() => handleEditClick('name')}
                           name={'name'} onChange={handleChangeUser} placeholder={'Имя'}/>
                    <Input disabled={user[1].icon === 'EditIcon'} type={'text'} icon={user[1].icon} value={user[1].login || ''}
                           onIconClick={() => handleEditClick('login')}
                           extraClass={'mb-6'} name={'login'} onChange={handleChangeUser} placeholder={'Логин'}/>
                    <Input disabled={user[2].icon === 'EditIcon'} value={user[2].password || ''} extraClass={'mb-6'} icon={user[2].icon} type={'password'}
                           onIconClick={() => handleEditClick('password')} name={'password'}
                           onChange={handleChangeUser} placeholder={'Пароль'}/>
                    { // Check if any of the fields is not empty
                        (user[0].name !== '' || user[1].login !== '' || user[2].password !== '') && (
                            <div className={classNames(styles['button-group-container'])}>
                                <span className={classNames('text', 'text_type_main-default', styles.cancel, 'mr-4')}>Отмена</span>
                                <Button htmlType="submit" type="primary" size="medium">
                                    Сохранить
                                </Button>
                            </div>
                        )
                    }
                </form>
            </div>}


        </div>
    );
};