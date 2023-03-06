import { Modal } from "../components/modal/modal"
import { Route, Routes, useLocation } from "react-router-dom"
import { FaqPage } from "../pages/faq/faq-page"
import { Favorite } from "../pages/favorites/favoretes"
import { NoMatchFound } from "../pages/NoMatchFound/NoMatchFound"
import { CatalogPage } from "../pages/product/catalog/catalog"
import { ProductPage } from "../pages/product/product"
import { Login } from "../components/login/login"
import { Register } from "../components/register/register"
import { Reset } from "../components/resetPassword/resetPassword"


export const Router = ({ handleProductLike, curentUser, setActiveModal, activeModal, backgroundLocation, initialPath })=> {
   
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

          <Route path='/login' element={
              <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
          <Login />
        </Modal>}>
        </Route>

        <Route path='/register' element={ <Modal 
        activeModal={activeModal} setActiveModal={setActiveModal}>
          <Register />
        </Modal>}>
        </Route>

        <Route path='/reset' element={ <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
          <Reset />
        </Modal>}>
        </Route>
        </Routes>
    )
}