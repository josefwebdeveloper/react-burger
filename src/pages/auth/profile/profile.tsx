import styles from './profile.module.css';
import classNames from "classnames";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {useDispatch} from "../../../hooks/redux-hooks";
import {getUser, logout, updateUser} from "../../../state/auth/auth-slice";
import {useSelector} from "react-redux";
import {RootState} from "../../../state/store";
import {User} from "../../../models/auth.model";
interface Fields {
    name?: string;
    email?: string;
    password?: string;
    icon: keyof TICons;
}
export const Profile = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.auth.basicUserInfo);


    useEffect(() => {
        if (!userData) {
            dispatch(getUser());
        }
    }, [dispatch, userData]);

    const [user, setUser] = useState<Fields[]>([])
    useEffect(() => {
        if(userData) {
            setUser([
                {
                    name: userData.name,
                    icon: 'EditIcon' as keyof TICons
                },
                {
                    email: userData.email,
                    icon: 'EditIcon' as keyof TICons
                },
                {
                    password: '',
                    icon: 'EditIcon' as keyof TICons
                }
            ])
        }

    }, [userData]);

    const location = useLocation(); // Get the current location
    const checkForm = () => {

        const updatedFields:Partial<User>  = {};

        // Check each field and add to updatedFields if it has been changed
        if (user[0].name && userData.name !== user[0].name && user[0].name.trim().length > 6) {
            updatedFields.name = user[0].name;
        }
        if (user[1].email && userData.email !== user[1].email && user[1].email.match(emailRegex)) {
            updatedFields.email = user[1].email;
        }
        // Assuming you want to allow password update even if it's the same
        if (user[2].password) {
            updatedFields.password = user[2].password;
        }

        // Check if there's anything to update
        if (Object.keys(updatedFields).length > 0) {
            // dispatch(updateUser(updatedFields));
            return updatedFields
        } else {
            console.log("No changes to update");
            return null
        }
    };

    const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser(prevState => {
            const newState = [...prevState];
            if (name === 'name') {
                newState[0].name = value;
            } else if (name === 'email') {
                newState[1].email = value;
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
            } else if (fieldName === 'email') {
                newState[1] = iconHandler(newState[1]);

            } else if (fieldName === 'password') {
                newState[2] = iconHandler(newState[2]);

            }

            return newState;
        });
    };
    const onSubmit = () => {
        const newUser = checkForm();
        if (newUser) {
            dispatch(updateUser(newUser))
                .unwrap()
                .then(() => {
                    // After updateUser is successfully fulfilled, dispatch getUser
                    dispatch(getUser());
                })
                .catch((error) => {
                    // Handle any error from updateUser here
                    console.error('Update failed:', error);
                });
        } else {
            console.log('Form data is not valid or incomplete');
        }
    };

    return (
        <div className={classNames(styles.container)}>
            <div className={styles.profile}>
                <Link
                    className={classNames(styles.link, 'text', 'text_type_main-medium', location.pathname !== 'profile' ? 'white' : 'text_color_inactive')}
                    to={'/profile'}>Профиль</Link>
                <Link className={classNames(styles.link, 'text', 'text_type_main-medium', 'text_color_inactive')}
                      to={'/order-feed'}>История заказов</Link>
                <Link onClick={() => dispatch(logout())}
                    className={classNames(styles.link, 'text', 'text_type_main-medium', 'text_color_inactive', 'mb-20')}
                    to={'/login'}>Выход</Link>
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
                    <Input  type={'text'} icon={user[1].icon} value={user[1].email || ''}
                           onIconClick={() => handleEditClick('email')}
                           extraClass={'mb-6'} name={'email'} onChange={handleChangeUser} placeholder={'Логин'}/>
                    <Input  value={user[2].password || ''} extraClass={'mb-6'} icon={user[2].icon} type={'password'}
                           onIconClick={() => handleEditClick('password')} name={'password'}
                           onChange={handleChangeUser} placeholder={'Пароль'}/>
                    { // Check if any of the fields is not empty
                        checkForm() && (
                            <div className={classNames(styles['button-group-container'])}>
                                <span className={classNames('text', 'text_type_main-default', styles.cancel, 'mr-4')}>Отмена</span>
                                <Button  onClick={onSubmit} htmlType="button" type="primary" size="medium">
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