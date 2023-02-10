import { useContext } from "react"
import { CardList } from "../../components/App/CardList/CardList"
import { CardContext } from "../../context/cardContext"
import { UserContext } from "../../context/userContext"

export const Favorite = () => {

    const {favorites} = useContext(CardContext)
    const {handleProductLike} = useContext(UserContext)

    console.log(favorites, handleProductLike)
    
    return (
        <>
        <h3>Избранное</h3>
        <CardList onProductLike={handleProductLike} cards={favorites} />
        </>
    )
}