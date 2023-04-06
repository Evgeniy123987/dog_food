
import { Route, Routes, useLocation } from "react-router-dom"
import { FaqPage } from "../pages/faq/faq-page"
import { Favorite } from "../pages/favorites/favoretes"
import { NoMatchFound } from "../pages/NoMatchFound/NoMatchFound"
import { CatalogPage } from "../pages/product/catalog/catalog"
import { ProductPage } from "../pages/product/product"
import { Charts } from "../components/chart/chart"


export const Router = ({ handleProductLike, curentUser, setActiveModal, activeModal, backgroundLocation, initialPath, cards })=> {
   
  const location = useLocation()
  
    return (
        <Routes location={backgroundLocation && {...backgroundLocation, state:initialPath || location}}>
          <Route path='/' element={
            <CatalogPage handleProductLike={handleProductLike} />
          }>
          </Route>
          <Route path='/product/:productId' element={<ProductPage curentUser={curentUser}/>}></Route>
          <Route path='/favorite' element={<Favorite />} />
          <Route path="/faq" element={<FaqPage />}></Route>
          <Route path='*' element={<NoMatchFound />}></Route>

          <Route path="/charts" element={<Charts cards={cards}/>}></Route>
        </Routes>
    )
}