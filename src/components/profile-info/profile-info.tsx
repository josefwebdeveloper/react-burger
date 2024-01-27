import styles from './profile-info.module.css';
import classNames from "classnames";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {User} from "../../models/auth.model";
import React, {useEffect, useState} from "react";
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {getUser, updateUser} from "../../state/auth/auth-slice";
import {useDispatch, useSelector} from "../../hooks/redux-hooks";
import {RootState} from "../../state/store";
interface Fields {
    name?: string;
    email?: string;
    password?: string;
    icon: keyof TICons;
}
export const ProfileInfo = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.auth.basicUserInfo);
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
    const checkForm = () => {

        const updatedFields:Partial<User>  = {};

        if (user[0].name && userData.name !== user[0].name && user[0].name.trim().length > 6) {
            updatedFields.name = user[0].name;
        }
        if (user[1].email && userData.email !== user[1].email && user[1].email.match(emailRegex)) {
            updatedFields.email = user[1].email;
        }

        if (user[2].password) {
            updatedFields.password = user[2].password;
        }


        if (Object.keys(updatedFields).length > 0) {
            return updatedFields
        } else {
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
        setUser((prevState: any) => {
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
    const onSubmit = (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        const newUser = checkForm();
        if (newUser) {
            dispatch(updateUser(newUser))
                .unwrap()
                .then(() => {
                    dispatch(getUser());
                })
                .catch((error) => {
                    console.error('Update failed:', error);
                });
        } else {
        }
    };
    return (
        <>
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
                        userData && checkForm() && (
                            <div className={classNames(styles['button-group-container'])}>
                                <span className={classNames('text', 'text_type_main-default', styles.cancel, 'mr-4')}>Отмена</span>
                                <Button  htmlType="submit" type="primary" size="medium">
                                    Сохранить
                                </Button>
                            </div>
                        )
                    }
                </form>
            </div>}
        </>
    );
};