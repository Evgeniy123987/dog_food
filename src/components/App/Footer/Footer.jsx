import React from "react";
import Like from '../../../assets/image/save.svg';
import Logo from '../../../assets/image/logo_dogFood.svg';
import '../Footer/Style.css';


export function Footer (params) {
    return (
        <header className='footer'>
            <div className='footer__container'>

                <div className='logo__conteiner'>
                  <a href='#'><img  className='logo' src={Logo}></img></a>
                  <div className='footer__copytight'> © DogFood EAbramovich</div>
                </div>

            <div className='footer__group'>
                <ul>
                    <li><a href='#'>Каталог</a></li>
                    <li><a href='#'>Акции</a></li>
                    <li><a href='#'>Новости</a></li>
                    <li><a href='#'>Отзывы</a></li>
                </ul>
            </div>

            <div className='footer__group'>
            <ul>
                    <li><a href='#'>Оплата и доставка</a></li>
                    <li><a href='#'>Часто спрашивают</a></li>
                    <li><a href='#'>Обратная связь</a></li>
                    <li><a href='#'>Контакты</a></li>
                </ul>
            </div>
                <div className='footer__group footer__group-navi'>
                    <h3><a href='#'>Мы на связи</a></h3>
                    <a href='tel:+7 (999) 999-99-99'>+7 (999) 999-99-99</a>
                    <a href='#'>dogfood.ru@gmail.com</a>
                    <div className='navi__container'>
                    <a href='#'><i class="fa-brands fa-telegram"></i></a>
                    <a href='#'><img src={Like}></img></a>
                    <a href='#'><img src={Like}></img></a>
                    <a href='#'><img src={Like}></img></a>
                    <a href='#'><img src={Like}></img></a>
                    </div>
                </div>
            </div>
            
        </header>
    )
}