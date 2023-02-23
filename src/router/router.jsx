import { Route, Routes } from "react-router-dom"
import { FaqPage } from "../pages/faq/faq-page"
import { Favorite } from "../pages/favorites/favoretes"
import { NoMatchFound } from "../pages/NoMatchFound/NoMatchFound"
import { CatalogPage } from "../pages/product/catalog/catalog"
import { ProductPage } from "../pages/product/product"

export const Router = ({ handleProductLike, addContact, curentUser })=> {
   
    return (
        <Routes>
          <Route path='/' element={
            <CatalogPage handleProductLike={handleProductLike} />
          }>
          </Route>
          <Route path='/product/:productId' element={<ProductPage curentUser={curentUser}/>}></Route>
          <Route path='/favorite' element={<Favorite />} />
          <Route path="/faq" element={<FaqPage />}></Route>
          <Route path='*' element={<NoMatchFound />}></Route>
          
        </Routes>
    )
}