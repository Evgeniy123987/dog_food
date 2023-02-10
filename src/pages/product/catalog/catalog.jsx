import React, { useContext } from "react"
import { CardList } from "../../../components/App/CardList/CardList"
import { CardContext } from "../../../context/cardContext"


export const CatalogPage = ({ handleProductLike}) => {
 
const {cards} = useContext(CardContext)
 return <>
     <CardList onProductLike={handleProductLike} cards={cards} />
  </>
}