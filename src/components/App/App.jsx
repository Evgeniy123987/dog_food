
import './App.css';
import { Header } from './Header/Header.jsx';
import { Footer } from '../../components/App/Footer/Footer.jsx';
import { CardList } from '../../components/App/CardList/CardList.jsx';
import { useContext, useEffect, useState } from 'react';
import data from '../../assets/data.json';
import { Games } from './xxx';
import { SearchInfo } from '../App/Search/Search.jsx';
import api from '../../utils/Api.jsx';
import useDebounce from '../../hocs/useDebaunce';
import { CatalogPage } from '../../pages/product/catalog/catalog.jsx';
import { ProductPage } from '../../pages/product/product.jsx';
// import { Navigate, Router, Routes } from 'react-router-dom';
// import { Route } from 'react-router-dom';
import { NoMatchFound } from '../../pages/NoMatchFound/NoMatchFound';
import Spinner from '../spinner';
import { Router } from '../../router/router'
import { UserContext } from '../../context/userContext';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearcQuery] = useState('');
  const [curentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const debounceSearchQuery = useDebounce(searchQuery, 2000);

  const handleRecuest = (eventFromInput) => {
    setSearcQuery(eventFromInput.target.value);
  }

  useEffect(() => {
    api.search(searchQuery.toUpperCase())
      .then((cardsFromApi) => {
        setCards(cardsFromApi)
        // .catch((err) => console.log(err))
      })
  }, [debounceSearchQuery])

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()]).then(([productsData, userData]) => {
      setCards(productsData.products);
      setCurrentUser(userData)
      setIsLoading(false)
    })
    // api.getProductList().then((data) => setCards(data.products));
    // api.getUserInfo().then((userData) => setCurrentUser(userData))
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault();
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
      .then(newUser => {
        console.log({ newUser });
        setCurrentUser(newUser)

      })
  }

  function handleProductLike(product) {
    const liked = product.likes.some((id) => id === curentUser?._id);
    api.changleLikeProduct(product._id, liked).then((newCard) => {
      const newProducts = cards.map((cardState) => {
        return cardState._id === newCard._id ? newCard : cardState;
      });
      setCards(newProducts);
    })
  }

  // useEffect(() => {
  //   // const filteredCards = [].filter((item) =>
  //   //   item.name.toUpperCase().includes(searchQuery.toUpperCase()));
  //   // setCards([...filteredCards]);

  //   handleRecuest()
  //   console.log('№№№№№№№№№№№№№№№№№№№№№№№',searchQuery)
  // }, [searchQuery])
  const context = UserContext;

  return (
    <>
      <UserContext.Provider value={{curentUser: curentUser, handleProductLike: handleProductLike}}>
      <div className="App">
        <Header changeInput={handleRecuest} user={curentUser} onUpdateUser={handleUpdateUser} />
        <SearchInfo searchText={handleFormSubmit} searchCount={cards.length} />
        {isLoading ? <Spinner /> : <Router cards={cards} curentUser={curentUser} handleProductLike={handleProductLike} />
        // <Routes>
        //   <Route path='/' element={
        //     <CatalogPage data={cards} curentUser={curentUser} handleProductLike={handleProductLike} />
        //   }>
        //   </Route>
        //   <Route path='/product' element={<ProductPage />}></Route>
        //   <Route path='/product/:productId' element={<ProductPage />}></Route>
        //   <Route path='*' element={<NoMatchFound />}></Route>
          
        // </Routes>
        }
        {/* <Navigate to={'product'} replace /> */}

        {/* <CardList data={cards} curentUser={curentUser} onProductLike={handleProductLike} /> */}
        <Footer />
      </div>
      </UserContext.Provider>
    </>
  );
}

export default App;