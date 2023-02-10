import React from 'react';
import './Style.css';
import Logo from '../../../assets/image/logo_dogFood.svg';
import Search from '../../../assets/image/ic-search.svg';
import Like from '../../../assets/image/save.svg'
import { HeartOutlined, ShoppingOutlined, SmileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


export function Header({ changeInput, user, onUpdateUser }, params) {

  const handleClickButtonEdit = (e) => {
    e.preventDefault()
    onUpdateUser({ about: 'писатель', name: 'jon' })

  }

  return (
    <header className='header'>
      <div className='header__container'>
        {/* {user&& <span>{user.email}</span>}
              {user&& <span>{user.name}</span>} */}

        {/* <span>{user?.email}</span>
        <span>{user?.name}</span>
        <button className='btn' onClick={handleClickButtonEdit}>change</button> */}
        <div className='logo__conteiner'>
          <Link to={'/'}>
          <img className='logo' src={Logo}></img>
          </Link>
          {/* <div className='user__info'>  
          <span>email: {user?.email}</span><br/>
          <span>name: {user?.name}</span>
          <button className='btn' onClick={handleClickButtonEdit}>change</button>
        </div> */}
        </div>
        <form className='search__container'>
          <input className='search__input' placeholder='Поиск' onInput={changeInput}></input>
          <img className='search__icon' src={Search}></img>
        </form>
        <div className='navi'>
          <div className='navi__container'>
            <Link to={'/favorite'}>
            <a href='#'><HeartOutlined className='header__icon-smyle' /></a>
            </Link>
            <a href='#'><ShoppingOutlined className='header__icon-smyle' /></a>
            <a href='#'><SmileOutlined className='header__icon-smyle' /></a>
          </div>
        </div>
      </div>
    </header>
  )
}