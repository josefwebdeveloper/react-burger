import './app-header.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {
    return (
        <header className='burger-header-container '>
            <nav className="burger-header container">
                <div className="navbar-menu">
                    <ul className="navbar-menu">
                        <li className="navbar__item text text_type_main-default  mr-7">
                            <span className='mr-2 '><BurgerIcon type="primary"/></span>
                            Конструктор
                        </li>
                        <li className="navbar__item text_color_inactive text text_type_main-default ">
                           <span className='mr-2 '><ListIcon type="secondary"/></span>
                            Лента заказов
                        </li>
                    </ul>
                </div>
                <div className="navbar-menu logo">
                    <Logo/>

                </div>
                <div className="navbar-menu profile">
                    <ProfileIcon type="secondary"/>
                    <span  className="navbar__item text_color_inactive text text_type_main-default ml-2">
                        Личный кабинет
                    </span>
                </div>
            </nav>
        </header>
    );

};