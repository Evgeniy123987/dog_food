import React, { useContext } from "react";
import { useState } from "react";
import Like from '../../../assets/image/save.svg';
import '../Card/Style.css';
import cn from 'classnames';
import { ReactComponent as Save } from '../../../assets/image/save.svg';
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

function Card({   name,
    price,
    discount,
    wight,
    description,
    pictures,
    tags,
    likes,
    onProductLike,
    _id,
}) {
    const instance = useContext(UserContext)

    function handleLikeClick() {
        onProductLike({ _id, likes })
    }

    const liked = likes.some((_id) => _id === instance.curentUser._id)
    const numberLike = likes.length

    const discount_price = Math.round(price - price * discount / 100);

    

    return (
        <section className='card'>
            <div className='card__stycki_top-left'>
                {!!discount && <span className='stycki__discount'>{`-${discount}%`}</span>}
            </div>

            <div className='card__stycki_top-right'>
                <button className={cn('card__favorite', { 'card__favorite_is-active': liked })} onClick={handleLikeClick}>
                    {/* <img className='like' src={Like}/> */}
                    <Save className='card__favorite-icon' />
                </button>
                <span className="number__like">{numberLike}</span>
            </div>

            <Link to={`/product/${_id}`} className='card__link'>
            <img className='card__pictures' src={pictures} />
                <div className='card__desc'>
                    {!!discount && <span className={!!discount ? 'old__price' : ''}>{price}&nbsp;₽</span>}<br />
                    <span className='price'>{discount_price}&nbsp;₽</span><br />
                    <span className='card__wight'>{wight}</span>
                    <p className='card__name'>
                        {name}
                    </p>
                </div>
            </Link>
            <a href='#' className='card__cart'>
                В корзину
            </a>

        </section>
    )
}

export default Card;