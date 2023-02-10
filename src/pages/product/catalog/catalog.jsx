import React from "react"
import { CardList } from "../../../components/App/CardList/CardList"


export const CatalogPage = ({data, curentUser, handleProductLike}) => {
  return <>
     <CardList data={data} curentUser={curentUser} onProductLike={handleProductLike} />
  </>
}