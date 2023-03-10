import React, { useContext } from 'react'
import './Style.css'
import Logo from '../../../assets/image/logo_dogFood.svg'
import Search from '../../../assets/image/ic-search.svg'
import { HeartOutlined, ShoppingOutlined, SmileOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { CardContext } from '../../../context/cardContext'


export function Header({ changeInput, user, onUpdateUser, setActiveModal }, params) {

  // const handleClickButtonEdit = (e) => {
  //   e.preventDefault()
  //   onUpdateUser({ about: 'писатель', name: 'jon' })
  // }

  const {favorites} = useContext(CardContext)
  const favNamber = favorites.length

  const location = useLocation()
  
  return (
    <header className='header'>
      <div className='header__container'>
  
        <div className='logo__conteiner'>
          <Link to={'/'}>
          <img className='logo' alt='Logo' src={Logo}></img>
          </Link>
          {/* <div className='user__info'>  
          <span>email: {user?.email}</span><br/>
          <span>name: {user?.name}</span>
          <button className='btn' onClick={handleClickButtonEdit}>change</button>
        </div> */}
        </div>
        {location.pathname === '/' ?
        <form className='search__container'>
          <input className='search__input' placeholder='Поиск' onInput={changeInput}></input>
          <img className='search__icon' alt='Search' src={Search}></img>
        </form> : ""
}
        <div className='navi'>
          <div className='navi__container'>
            <Link to={'/favorite'}>
            <HeartOutlined className='header__icon-smyle' />
            <span className={favNamber !==0 ? "counts__likes" : null}>{favNamber !== 0 ? (favNamber) : null}</span>
            </Link>
            <Link to={'/'}><ShoppingOutlined className='header__icon-smyle' /></Link> 
            <Link to={'/'}><SmileOutlined className='header__icon-smyle' /></Link> 
            <Link to="/login" 
            // state={{backgroundLocation: location, initialPath: location.pathname}}
            ><span style={{cursor: 'pointer'}} onClick={()=>setActiveModal(true) }>
              {/* {!!localStorage.token ? "" : "Вход"} */}
              Вход
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}