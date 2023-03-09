import React, { useContext, useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { openNotification } from "../../components/notification/notification.jsx"
import { Product } from "../../components/product/product.jsx"
import Spinner from "../../components/spinner/index.jsx"
import { UserContext } from "../../context/userContext.js"
import api from "../../utils/Api.jsx"

// const productId = '622c77d477d63f6e70967d1f';

export const ProductPage = ({curentUser}) => {

  // const [cards, setCards] = useState([]);
  // const [searchQuery, setSearcQuery] = useState('');
  // const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { handleProductLike } = useContext(UserContext)
  const { productId } = useParams()

  // const debounceSearchQuery = useDebounce(searchQuery, 2000);

  const fav = useContext(UserContext)

  // useEffect(() => {
  //   api.search(searchQuery.toUpperCase())
  //     .then((cardsFromApi) => {
  //       setCards(cardsFromApi)
  //       // .catch((err) => console.log(err))
  //     })
  // }, [debounceSearchQuery])

  useEffect(() => {
    setIsLoading(true);
    // api.getUserInfo().then((userData) => setCurrentUser(userData));
    api.getProductById(productId)
      .then((productData) => setProduct(productData))
      // .catch((err) => console.log('err', err))
      .finally(() => setIsLoading(false))
  }, [productId, fav.favorites])

  const onProductLike = () => { 
    handleProductLike(product)
  }

  const onSendReviews = async (data) =>{
    try {
      const res = await api.addReview(product._id, data)
      setProduct({...res})
      openNotification('success', 'Success', 'Ваш отзыв успешно опубликован')
    } catch (error) {
      openNotification('error', 'Error', 'Не получилось опубликовать отзыв')
    }
    
  }

  const deleteReviews = async (id) =>{
    try {
      const res = await api.deleteReviews(product._id, id)
      setProduct({...res})
      openNotification('success', 'Success', 'Ваш отзыв успешно удален')
    } catch (error) {
      openNotification('error', 'Error', 'Не получилось удалить отзыв')
    }
    
  }
  return <>
    <div className="App">
      {isLoading ? <Spinner /> : <Product {...product} currentUser={curentUser} onProductLike={onProductLike} 
      onSendReviews={onSendReviews} deleteReviews={deleteReviews} />}
    </div>
  </>
}