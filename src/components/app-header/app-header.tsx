import React, {useState} from 'react';
import styles from './app-header.module.css';
import {BurgerIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import mobileLogo from '../../images/mobile-logo.svg'

export const AppHeader = () => {
    const menuData = [
        {name: 'Конструктор', active: true},
        {name: 'Лента заказов',  active: false},
    ]
    const [menu, setActiveMenu] = useState(menuData)
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    }
   const  onActiveMenuChange=(activeMenu: React.SetStateAction<{ name: string; active: boolean; }>)=>{
        const newMenu = menu.map((item) => {
            item.active = item.name === activeMenu.name;
            return item
        })
        setActiveMenu(newMenu)
   }

    return (
        <header className={styles['burger-header-container']}>
            {isMobileMenuOpen ? (
                <ViewDesktop isMobileMenuOpen={isMobileMenuOpen}   menu={menu} onActiveMenuChange={onActiveMenuChange}/>
            ) : (

                // <ViewMobile isMobileMenuOpen={isMobileMenuOpen} onActiveMenuChange={onActiveMenuChange} menu={menu}/>
                <ViewMobile isMobileMenuOpen={isMobileMenuOpen} />
            )}
        </header>
    );
};
interface ViewMobileProps {
    isMobileMenuOpen: boolean | undefined,
}
const ViewMobile = ({  isMobileMenuOpen }:ViewMobileProps) => {
    return (
        <nav className={styles['burger-header'] + ' container'}>
            <div className={styles['navbar-menu']}>
                <div className={`${styles['navbar-menu']} ${styles.logo}`}>
                    <img src={mobileLogo} alt={mobileLogo}/>
                </div>
                <button className={styles['mobile-menu-button']}>
                    <BurgerIcon type="secondary"/>
                </button>
                {/*<ul className={classNames(styles['navbar-menu'], isMobileMenuOpen ? styles['mobile-menu-open'] : '')}>*/}
                {/*    {menu.map((el, i) => <li key={i}*/}
                {/*                             onClick={() => onActiveMenuChange(el)}*/}
                {/*                             className={`${styles['navbar__item']} ${el.active ? null : 'text_color_inactive'} text text_type_main-default mr-7`}>*/}
                {/*            <span className={`mr-2`}><BurgerIcon*/}
                {/*                type={el.active ? 'primary' : 'secondary'}/></span>*/}
                {/*        {el.name}{el.active}*/}
                {/*    </li>)}*/}

                {/*</ul>*/}
            </div>

            {/*<div className={`${styles['navbar-menu']} ${styles.profile}`}>*/}
            {/*    <ProfileIcon type="secondary"/>*/}
            {/*    <span className={`${styles['navbar__item']} text_color_inactive text text_type_main-default ml-2`}>*/}
            {/*            Личный кабинет*/}
            {/*        </span>*/}
            {/*</div>*/}
        </nav>
    )
}
interface ViewDesktopProps {
    isMobileMenuOpen: boolean | undefined,
    onActiveMenuChange: (activeMenu: React.SetStateAction<{ name: string; active: boolean; }>) => void;
    menu: { name: string; active: boolean; }[];
}
const ViewDesktop = ({isMobileMenuOpen, onActiveMenuChange,menu}:ViewDesktopProps) => {
    return (
        <nav className={styles['burger-header'] + ' container'}>
            <div className={styles['navbar-menu']}>
                {/*<button className={styles['mobile-menu-button']} onClick={toggleMobileMenu}>*/}
                {/*    <BurgerIcon type="secondary"/>*/}
                {/*</button>*/}
                <ul className={classNames(styles['navbar-menu'], isMobileMenuOpen ? styles['mobile-menu-open'] : '')}>
                    {menu.map((el, i) => <li key={i}
                                             onClick={() => onActiveMenuChange(el)}
                                             className={`${styles['navbar__item']} ${el.active ? null : 'text_color_inactive'} text text_type_main-default mr-7`}>
                            <span className={`mr-2`}><BurgerIcon
                                type={el.active ? 'primary' : 'secondary'}/></span>
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
    )
}
