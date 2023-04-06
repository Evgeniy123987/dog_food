import { useLocation } from 'react-router-dom'
import { NoMatchFound } from '../../../pages/NoMatchFound/NoMatchFound'
import '../Search/Style.css'

export const SearchInfo = ({ searchText, searchCount, debounceSearchQuery }) => {

    const location = useLocation()

    return (
        <>
        {location.pathname === '/' ? (searchText && <section className='search__title'>
            По запросу <span className='search__bold'>{searchText}</span> найдено <span className='search__bold'>{debounceSearchQuery ? searchCount : ''}</span> товаров
        </section>) : ''}
        {searchCount === 0 ? <NoMatchFound /> : ""}
        </>
    )

}