import React, {useState} from 'react';
import styles from './app-header.module.css';
import {BurgerIcon, CloseIcon, Logo, MenuIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import mobileLogo from '../../images/mobile-logo.svg'
import {isMobile} from "../../utils/utils";

export const AppHeader = () => {
    const menuData = [
        {name: 'Конструктор', active: true},
        {name: 'Лента заказов', active: false},
    ]
    const [menu, setActiveMenu] = useState(menuData)
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    const onActiveMenuChange = (activeMenu: React.SetStateAction<{ name: string; active: boolean; }>) => {
        const newMenu = menu.map((item) => {
            item.active = item.name === activeMenu.name;
            return item
        })
        setActiveMenu(newMenu)
    }


    return (
        <header className={styles['burger-header-container']}>
            {!isMobile() ? (
                <ViewDesktop menu={menu} onActiveMenuChange={onActiveMenuChange}/>
            ) : (

                <ViewMobile menu={menu} onActiveMenuChange={onActiveMenuChange} menuOpen={menuOpen} toggleMenu={toggleMenu}/>
            )}
        </header>
    );
};

interface ViewMobileProps {
}

interface ViewMobileProps {
    toggleMenu: () => void,
    menuOpen: boolean,
    onActiveMenuChange: (activeMenu: React.SetStateAction<{ name: string; active: boolean }>) => void,
    menu: ({ name: string; active: boolean } | { name: string; active: boolean })[]
}

const ViewMobile = ({ toggleMenu, menuOpen, onActiveMenuChange, menu }: ViewMobileProps) => {
    return (
        <>
            <div className={styles['mobile-menu']}>
                <div className={`${styles['mobile-header-element']}  ${styles.logo}`}>
                    {!menuOpen && <img src={mobileLogo} alt={mobileLogo}/>}
                    {menuOpen && <span className={classNames(styles['menu-item'],'text' ,'text_type_main-medium')}>Меню</span>}
                </div>
                <div onClick={toggleMenu}
                className={classNames(styles['mobile-menu-button'], styles['mobile-header-element'])}>
                {!menuOpen && <MenuIcon type="primary"/>}
                {menuOpen && <CloseIcon type="primary"/>}
                </div>
            </div>

            {menuOpen && <div className={classNames(styles["opened-mobile-menu"],styles.open)}>
                {/*<span*/}
                {/*    className={classNames(styles['menu-item'], 'text', 'text_type_main-default')}>Личный кабинет</span>*/}
                {/*<span*/}
                {/*    className={classNames(styles['menu-item'], 'text', 'text_type_main-default')}>Конструктор бургеров</span>*/}
                {/*<span className={classNames(styles['menu-item'], 'text', 'text_type_main-default')}>Лента заказов</span>*/}
                <ul className={classNames(styles['navbar-menu'])}>
                    {menu.map((el, i) => <li key={i}
                                             onClick={() => onActiveMenuChange(el)}
                                             className={`${styles['navbar__item']} ${el.active ? null : 'text_color_inactive'} text text_type_main-default mr-7`}>
                            <span className={`mr-2`}><BurgerIcon
                                type={el.active ? 'primary' : 'secondary'}/></span>
                        {el.name}{el.active}
                    </li>)}

                </ul>
            </div>}
        </>

    )
}

interface ViewDesktopProps {
    onActiveMenuChange: (activeMenu: React.SetStateAction<{ name: string; active: boolean; }>) => void;
    menu: { name: string; active: boolean; }[];
}

const ViewDesktop = ({onActiveMenuChange, menu}: ViewDesktopProps) => {
    return (
        <nav className={styles['burger-header'] + ' container'}>
            <div className={styles['navbar-menu']}>

                <ul className={classNames(styles['navbar-menu'])}>
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
