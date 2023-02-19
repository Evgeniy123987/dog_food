import React, { useContext, useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Product } from "../../components/product/product.jsx"
import Spinner from "../../components/spinner/index.jsx"
import { UserContext } from "../../context/userContext.js"
import useDebounce from "../../hook/useDebaunce.js"
import api from "../../utils/Api.jsx"

const productId = '622c77d477d63f6e70967d1f';

export const ProductPage = () => {

  const [cards, setCards] = useState([]);
  const [searchQuery, setSearcQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { handleProductLike } = useContext(UserContext)
  const { productId } = useParams()

  const debounceSearchQuery = useDebounce(searchQuery, 2000);

  const fav = useContext(UserContext)

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
      // .catch((err) => console.log('err', err))
      .finally(() => setIsLoading(false))
  }, [productId, fav.favorites])

  console.log(fav.favorites)

  const onProductLike = () => { 
    handleProductLike(product)
  }
  console.log(product)
  return <>
    <div className="App">
      {isLoading ? <Spinner /> : <Product {...product} currentUser={currentUser} onProductLike={onProductLike} />}
    </div>
  </>
}