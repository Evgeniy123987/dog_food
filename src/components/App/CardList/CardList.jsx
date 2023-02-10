import Card from '../Card/Card';
import '../CardList/Style.css';

export const CardList = ({ data, curentUser, onProductLike }) => {



    return (
        <div className='cards__list'>
            {console.log(data)}
            {data.map((item, index) => (
                <Card {...item} key={`${index}-${item.name}`} curentUser={curentUser} onProductLike={onProductLike} />
            ))}
        </div>

    )
}

