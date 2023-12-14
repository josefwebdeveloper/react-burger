import React, {useState} from 'react';
import styles from './app-header.module.css';
import {BurgerIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {
    const menuData = [
        {name: 'Конструктор', active: true},
        {name: 'Лента заказов',  active: false},
    ]
    const [menu, setActiveMenu] = useState(menuData)
   const  onActiveMenuChange=(activeMenu: React.SetStateAction<{ name: string; active: boolean; }>)=>{
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
                        {menu.map((el,i)=><li key={i}
                             onClick={() => onActiveMenuChange(el)}
                             className={`${styles['navbar__item']} ${el.active ? null : 'text_color_inactive'} text text_type_main-default mr-7`}>
                            <span className={`mr-2`}><BurgerIcon
                                type={el.active ? 'primary' : 'secondary'}/></span>
                            {el.name}{el.active}
                        </li>)}
                        {/*<li onMouseEnter={handleMouseEnter}*/}
                        {/*    onMouseLeave={handleMouseLeave}*/}
                        {/*    onClick={() => onActiveMenuChange(menu[0])}*/}
                        {/*    className={`${styles['navbar__item']} ${menu[0].active ? null : 'text_color_inactive'}text text_type_main-default mr-7`}>*/}
                        {/*    <span className={`mr-2`}><BurgerIcon*/}
                        {/*        type={menu[0].active ? 'primary' : 'secondary'}/></span>*/}
                        {/*    {menu[0].name}*/}
                        {/*</li>*/}
                        {/*<li onMouseEnter={handleMouseEnter}*/}
                        {/*    onMouseLeave={handleMouseLeave}*/}
                        {/*    onClick={() => onActiveMenuChange(menu[1])}*/}
                        {/*    className={`${styles['navbar__item']} ${menu[1].active? null:'text_color_inactive'} text text_type_main-default`}>*/}
                        {/*    <span className='mr-2'><ListIcon type={menu[1].active? 'primary':'secondary'}/></span>*/}
                        {/*    {menu[1].name}*/}
                        {/*</li>*/}
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
