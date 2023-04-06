import './App.css'
import { Header } from './Header/Header.jsx'
import { Footer } from '../../components/App/Footer/Footer.jsx'
import { useEffect, useState } from 'react'
import { SearchInfo } from '../App/Search/Search.jsx'
import api from '../../utils/Api.jsx'
import useDebounce from '../../hook/useDebaunce'
import Spinner from '../spinner'
import { Router } from '../../router/router'
import { UserContext } from '../../context/userContext'
import { CardContext } from '../../context/cardContext'
import { isLiked } from '../../utils/utils'
import {Route, Routes, useLocation} from 'react-router-dom'
import zamok from '../../assets/image/zamok.jpg'
import { Modal } from '../modal/modal'
import { Login } from '../login/login'
import { Register } from '../register/register'
import { Reset } from '../resetPassword/resetPassword'


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearcQuery] = useState('');
  const [curentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState([])
  const [contacts, setContacts] = useState([])
  const [activeModal, setActiveModal] = useState(false)
  const [reactName, setReactName] = useState('')

  const debounceSearchQuery = useDebounce(searchQuery, 500);

  const checkCardLocal = (i) => {
    return new Date(i.created_at) < new Date(
    "2022-04-12T10:36:12.324Z")
  }
  

  const handleRecuest = (eventFromInput) => {
    setSearcQuery(eventFromInput.target.value)
    setReactName(eventFromInput._reactName)
  }

  useEffect(() => {
    (searchQuery|| reactName) && api.search(searchQuery.toUpperCase())
      .then((cardsFromApi) => {
        setCards(cardsFromApi.filter((e)=>checkCardLocal(e)))
      })
  }, [debounceSearchQuery])

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()])
    .then(([productsData, userData]) => {
      setCards(productsData.products.filter((e)=>checkCardLocal(e)));
      setCurrentUser(userData)
      const favProducts = productsData.products.filter((product)=>isLiked(product.likes, userData._id))

      setFavorites(favProducts)
      setIsLoading(false)
    })
  }, [])

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
      .then(newUser => {
        setCurrentUser(newUser)

      })
  }

  function handleProductLike(product) {
    const liked = isLiked (product.likes, curentUser?._id)
    api.changleLikeProduct(product._id, liked).then((newCard) => {
      const newProducts = cards.map((cardState) => {
        return cardState._id === newCard._id ? newCard : cardState;
      });

      !liked ? (setFavorites((prevState)=>[...prevState, newCard])) : (setFavorites((prevState)=>prevState.filter((cards)=>cards._id !== newCard._id)))

      setCards(newProducts);
    })
  }

  const sortedData = (currentSort)=>{
    switch (currentSort) {
      case 'expensiv': setCards([...cards.sort((a,b)=>b.price - a.price)]); break
      case 'cheep': setCards([...cards.sort((a,b)=>a.price - b.price)]); break
      case 'rayting': setCards([...cards.sort((a,b)=>b.likes.length - a.likes.length)]); break
      case 'discount': setCards([...cards.sort((a,b)=>b.discount - a.discount)]); break
      case 'top': setCards([...cards.sort((a,b)=>b.likes.length - a.likes.length)]); break
      case 'nowelties': setCards([...cards.sort((a,b)=>new Date(b.created_at) - new Date(a.created_at))]); break

      default:
        setCards([...cards.sort((a,b)=>a.price - b.price)])
        break;
    }
  }
  
  const valueProvaider = {
    cards: cards,
    favorites,
    onSortData: sortedData,
    searchQuery
  }

  const userProvider = {
    curentUser,
    handleProductLike,
    favorites
  }

  const addContact = (contact) => {
    setContacts([...contacts, contact])
  }

  
  const location = useLocation()
  const backgroundLocation = location.state?.backgroundLocation
  const initialPath = location.state?.initialPath


  return (
    <>
    <CardContext.Provider value={ valueProvaider }>
      <UserContext.Provider value={userProvider}>
     
        <Header changeInput={handleRecuest} user={curentUser} onUpdateUser={handleUpdateUser} setActiveModal={setActiveModal} />
        <Routes>
        <Route path='/login' element={
              <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
          <Login />
        </Modal>}>
        </Route>

        <Route path='/register' element={ <Modal 
        activeModal={activeModal} setActiveModal={setActiveModal}>
          <Register />
        </Modal>}>
        </Route>

        <Route path='/reset' element={ <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
          <Reset />
        </Modal>}>
        </Route>
        </Routes>
        {!!localStorage.token ? <div className="App">
        
        <SearchInfo searchText={searchQuery} searchCount={cards.length} debounceSearchQuery={debounceSearchQuery} />
     
        {isLoading ? <Spinner /> : <Router handleProductLike={handleProductLike} addContact={addContact} curentUser={curentUser} 
        activeModal={activeModal} setActiveModal={setActiveModal} backgroundLocation={backgroundLocation} initialPath={initialPath} 
        cards={cards} />}
        </div> : <div className='autorization__page'>
          <div>Пожайлуста авторизируйтесь</div>
          <img src={zamok} width={700}></img>
        </div>}

        <Footer />
      </UserContext.Provider>
      </CardContext.Provider>
    </>
  );
}

export default App;