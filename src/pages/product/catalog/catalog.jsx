import React, { useContext } from "react"
import { CardList } from "../../../components/App/CardList/CardList"
import Sort from "../../../components/sort/sort"
import { CardContext } from "../../../context/cardContext"


export const CatalogPage = ({ handleProductLike}) => {
 
const {cards} = useContext(CardContext)
const {searchQuery} = useContext(CardContext)

 return <>
    {searchQuery ? "" : <Sort />}
     <CardList onProductLike={handleProductLike} cards={cards} />
  </>
}