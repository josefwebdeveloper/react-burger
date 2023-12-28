import React, {useState} from 'react';
import styles from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {
    const menuData = [
        {name: 'Конструктор', active: true},
        {name: 'Лента заказов', active: false},
    ]
    const [menu, setActiveMenu] = useState(menuData)
    const onActiveMenuChange = (activeMenu: React.SetStateAction<{ name: string; active: boolean; }>) => {
        const newMenu = menu.map((item) => {
            item.active = item.name === activeMenu.name;
            return item
        })
        setActiveMenu(newMenu)
    }

    return (
        <header className={styles['burger-header-container']}>
            <nav className={styles['burger-header'] + ' container'}>
                <div className={styles['navbar-menu']}>
                    <ul className={styles['navbar-menu']}>
                        {menu.map((el, i) => <li key={i}
                                                 onClick={() => onActiveMenuChange(el)}
                                                 className={`${styles['navbar__item']} ${el.active ? null : 'text_color_inactive'} text text_type_main-default mr-7`}>
                            <span className={`mr-2`}>
                             {i === 0 && <BurgerIcon type={el.active ? 'primary' : 'secondary'}/>}
                                {i === 1  && <ListIcon type={el.active ? 'primary' : 'secondary'}/>}
                            </span>
                            {el.name}{el.active}
                        </li>)}

                    </ul>
                </div>
                <div className={`${styles['navbar-menu']} ${styles.logo}`}>
                    <Logo/>
                </div>
                <div className={`${styles['navbar-menu']} ${styles.profile}`}>
                    <ProfileIcon type="secondary"/>
                    <span className={`${styles['navbar__item']} text_color_inactive text text_type_main-default ml-2`}>
                        Личный кабинет
                    </span>
                </div>
            </nav>
        </header>
    );
};
