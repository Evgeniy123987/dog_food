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
import { Modal } from '../modal/modal'
import { RegistrationForm } from '../form/registrationForm'

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearcQuery] = useState('');
  const [curentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState([])
  const [contacts, setContacts] = useState([])
  const [activeModal, setActiveModal] = useState(false)

  const debounceSearchQuery = useDebounce(searchQuery, 2000);

  const checkCardLocal = (i) => {
    return new Date(i.created_at) < new Date(
    "2022-04-12T10:36:12.324Z")
  }
  
  const handleRecuest = (eventFromInput) => {
    setSearcQuery(eventFromInput.target.value);
  }

  useEffect (()=>{
    // setActive(true)
    setActiveModal(false)
}, [])

  useEffect(() => {
    api.search(searchQuery.toUpperCase())
      .then((cardsFromApi) => {
        setCards(cardsFromApi.filter((e)=>checkCardLocal(e)))
        // .catch((err) => console.log(err))
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

  // const handleFormSubmit = (e) => {
  //   // e.preventDefault();
  // }

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

  // useEffect(() => {
  //   const filteredCards = [].filter((item) =>
  //     item.name.toUpperCase().includes(searchQuery.toUpperCase()));
  //   setCards([...filteredCards]);

  //   handleRecuest()
  //   console.log('№№№№№№№№№№№№№№№№№№№№№№№',searchQuery)
  // }, [searchQuery])

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
  
  const context = UserContext;
  const valueProvaider = {
    cards: cards,
    favorites,
    // setCurrentSort,
    onSortData: sortedData
  }

  const userProvider = {
    curentUser,
    handleProductLike,
    favorites
  }

  const addContact = (contact) => {
    setContacts([...contacts, contact])
  }
  return (
    <>
    <CardContext.Provider value={ valueProvaider }>
      <UserContext.Provider value={userProvider}>
     
        <Header changeInput={handleRecuest} user={curentUser} onUpdateUser={handleUpdateUser} setActiveModal={setActiveModal} />
        <div className="App">
        <SearchInfo searchText={searchQuery} searchCount={cards.length} />
        {/* <Form /> */}
        {/* <RegistrationForm addContact={addContact}/> */}
        <Modal activeModal={activeModal} setActiveModal={setActiveModal}><RegistrationForm addContact={addContact}/></Modal>
        {isLoading ? <Spinner /> : <Router handleProductLike={handleProductLike} addContact={addContact}/>}
        {/* <Navigate to={'product'} replace /> */}

        {/* <CardList data={cards} curentUser={curentUser} onProductLike={handleProductLike} /> */}
        </div>
        {!!contacts.length && contacts.map((el)=>(
          <div>
            <p>{el.name}</p>
            <p>{el.lastName}</p>
            <p>{el.phoneNamber}</p>
          </div>
        ))}
        <Footer />
      </UserContext.Provider>
      </CardContext.Provider>
    </>
  );
}

export default App;