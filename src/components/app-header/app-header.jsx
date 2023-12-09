import './app-header.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {
    return (
        <header>
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-menu   pl-5">
                        <BurgerIcon  type="primary"/>
                        <a href="/orders" className="navbar__item text text_type_main-default ml-2 mr-7">
                            Конструктор
                        </a>
                        <ListIcon  type="secondary"/>
                        <a href="/burgers" className="navbar__item text_color_inactive text text_type_main-default ml-2">
                            Лента заказов
                        </a>
                    </div>
                    <div className="navbar-menu logo">
                        <Logo/>

                    </div>
                    <div className="navbar-menu profile">
                        <ProfileIcon type="secondary" />
                        <a href="/profile" className="navbar__item text_color_inactive text text_type_main-default ml-2">
                            Личный кабинет
                        </a>
                    </div>

                </div>
            </nav>
        </header>
    );

};