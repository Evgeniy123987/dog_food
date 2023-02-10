import React, { useContext, useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { CardList } from "../../components/App/CardList/CardList.jsx"
import { Footer } from "../../components/App/Footer/Footer.jsx"
import { Header } from "../../components/App/Header/Header.jsx"
import { SearchInfo } from "../../components/App/Search/Search.jsx"
import { Product } from "../../components/product/product.jsx"
import Spinner from "../../components/spinner/index.jsx"
import { UserContext } from "../../context/userContext.js"
import useDebounce from "../../hocs/useDebaunce.js"
import api from "../../utils/Api.jsx"
// import { useParams } from 'react-router-dom'



const productId = '622c77d477d63f6e70967d1f';

export const ProductPage = () => {

  const [cards, setCards] = useState([]);
  const [searchQuery, setSearcQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { handleProductLike } = useContext(UserContext)
  const { productId } = useParams()

  const handleFormSubmit = (e) => {
    e.preventDefault();
  }

  const handleRecuest = (eventFromInput) => {
    setSearcQuery(eventFromInput.target.value);
  }

  const debounceSearchQuery = useDebounce(searchQuery, 2000);

  useEffect(() => {
    api.search(searchQuery.toUpperCase())
      .then((cardsFromApi) => {
        setCards(cardsFromApi)
        // .catch((err) => console.log(err))
      })
  }, [debounceSearchQuery])

  useEffect(() => {
    setIsLoading(true);
    api.getUserInfo().then((userData) => setCurrentUser(userData));
    api.getProductById(productId)
      .then((productData) => setProduct(productData))
      .catch((err) => console.log('err', err))
      .finally(() => setIsLoading(false))
  }, [productId])

  // function handleUpdateUser(userUpdateData) {
  //   api.setUserInfo(userUpdateData)
  //     .then(newUser => {
  //       console.log({ newUser });
  //       setCurrentUser(newUser)

  //     })
  // }



  const onProductLike = () => { 
    handleProductLike(product)
  }

  // const { productId } = useParams()
  // console.log(productId)
  return <>
    <div className="App">
      {isLoading ? <Spinner /> : <Product {...product} currentUser={currentUser} onProductLike={onProductLike} />}
    </div>
  </>
}