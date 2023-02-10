import { useLocation } from 'react-router-dom';
import '../Search/Style.css';

export const SearchInfo = ({ searchText, searchCount }) => {

    const location =useLocation()
    console.log({searchText})
    return (
        <>
        {location.pathname === '/' ? (searchText && <section className='search__title'>
            По запросу <span className='search__bold'>{searchText}</span> найдено {searchCount} товаров
        </section>) : ''}
        </>
    )
}