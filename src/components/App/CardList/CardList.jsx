import Card from '../Card/Card';
import '../CardList/Style.css';

export const CardList = ({ onProductLike, cards=[] }) => {

    

    return (
        <div className='cards__list'>
            {cards.map((item, index) => (
                <Card {...item} key={`${index}-${item.name}`} onProductLike={onProductLike} />
            ))}
        </div>

    )
}

