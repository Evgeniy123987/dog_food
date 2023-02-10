import { Route, Routes } from "react-router-dom"
import { Favorite } from "../pages/favorites/favoretes"
import { NoMatchFound } from "../pages/NoMatchFound/NoMatchFound"
import { CatalogPage } from "../pages/product/catalog/catalog"
import { ProductPage } from "../pages/product/product"

export const Router = ({ cards, curentUser, handleProductLike })=> {
   
    return (
        <Routes>
          <Route path='/' element={
            <CatalogPage data={cards} curentUser={curentUser} handleProductLike={handleProductLike} />
          }>
          </Route>
          <Route path='/product' element={<ProductPage />}></Route>
          <Route path='/product/:productId' element={<ProductPage />}></Route>
          <Route path='/favorite' element={<Favorite />} />
          <Route path='*' element={<NoMatchFound />}></Route>
          
        </Routes>
    )
}