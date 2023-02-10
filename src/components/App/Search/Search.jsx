import '../Search/Style.css';

export const SearchInfo = ({ searchText, searchCount }) => {
    console.log(searchCount)
    console.log({searchText})
    return (
        searchText && <section className='search__title'>
            По запросу <span className='search__bold'>{searchText}</span> найдено {searchCount} товаров
        </section>
    )
}