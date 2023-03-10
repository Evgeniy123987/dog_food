import React from "react";
import Logo from '../../../assets/image/logo_dogFood.svg';
import '../Footer/Style.css';
import { Link } from "react-router-dom";
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import Viber from './img/viber.svg'
import Vk from './img/vk.svg'

export function Footer (params) {
    return (
        <footer className='footer'>
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
                    <li><Link to={'/faq'}>Часто спрашивают</Link></li>
                    <li><a href='#'>Обратная связь</a></li>
                    <li><a href='#'>Контакты</a></li>
                </ul>
            </div>
                <div className='footer__group footer__group-navi'>
                    <h3><a href='#'>Мы на связи</a></h3>
                    <a href='tel:+7 (999) 999-99-99'>+7 (999) 999-99-99</a>
                    <a href='#'>dogfood.ru@gmail.com</a>
                    <div className='navi__container-footer'>
                    <a href='#'><TelegramIcon className='footer__icon' /></a>
                    <a href='#'><WhatsAppIcon className='footer__icon' /></a>
                    <a href='#'><img className='footer__icon' src={Viber}></img></a>
                    <a href='#'><InstagramIcon className='footer__icon' /></a>
                    <a href='#'><img className='footer__icon' src={Vk}></img></a>
                    </div>
                </div>
            </div>
            
        </footer>
    )
}