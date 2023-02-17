import { useLocation } from 'react-router-dom'
import '../Search/Style.css'

export const SearchInfo = ({ searchText, searchCount }) => {

    const location =useLocation()

    return (
        <>
        {location.pathname === '/' ? (searchText && <section className='search__title'>
            По запросу <span className='search__bold'>{searchText}</span> найдено <span className='search__bold'>{searchCount}</span> товаров
        </section>) : ''}
        </>
    )
}