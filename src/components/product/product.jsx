import cn from "classnames"
import React, { useState } from "react"
import { useEffect } from "react"
import s from "./index.module.css"
import { ReactComponent as Save } from "./img/save.svg"
import quality from './img/quality.svg'
import truck from './img/truck.svg'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Rating } from "../rating/rating"
import { UserContext } from "../../context/userContext"
import { useContext } from "react"
import api from '../../../src/utils/Api'
import { Form } from "../form/form"
import { useForm } from "react-hook-form"
import { BaseButton } from "../baseButton/baseButton"

export const Product = ({ pictures, name, price, discount, onProductLike, likes = [], currentUser,
    description, reviews }) => {
    const [users, setUsers] = useState([])

    const discount_price = Math.round(price - price * discount / 100);
    const isLike = likes.some((id) => id === currentUser?._id);
    const desctiptionHTML = { __html: description }

    let navigate = useNavigate()

    const handleClick = () => {
        navigate(-1)
    }
    const location = useLocation()
    
    useEffect(() => {
        location.search.includes('name=dear') ? navigate('/') : console.log('err')
    },[location.search])

    useEffect(()=>{
        api.getUsers().then((data)=>setUsers(data))
    },[])
    
    const param = useParams()

    const getUser = (id)=>{
        if (!users.length) return 'User'
        const user = users.find(el => el._id === id)
        return user?.name ?? 'User'
    }

    const {
        register, 
        handleSubmit, 
        formState: {errors}} = useForm({mode: 'onChange'})

    const sendReviews = (data) => {
        console.log(data)
    }    

    return <>
    <button onClick={handleClick} className="button">назад</button>
    <div className={s.product__container}>
        <div>
        <div>
            <h1 className={s.productTitle}>{name}</h1>
            <div>
                <span>артикул: </span><b>23890</b>
                <Rating isEditable={true} rating={5} />
                <span>{reviews?.length}отзывов</span>
            </div>
        </div>
        <div className={s.product}>
            <div className={s.imgWrapper}>
                <img src={pictures} alt={`Изображение ${name}`} className={s.product__pictures} />
            </div>
        </div>
        </div>
        <div className={s.desc}>
            <span className={discount ? s.oldPrice : s.price}>{price}&nbsp;P</span>
            {!!discount && (<span className={cn(s.price, 'card__price_type_discount')}>{discount_price}&nbsp;P</span>)}
            <div className={s.btnWrap}>
                <div className={s.left}>
                    <button className={s.minus}>-</button>
                    <span className={s.num}>0</span>
                    <button className={s.plus}>+</button>
                </div>
                <a href="/#" className={cn('btn', 'btn_type_primary', s.card)}>В корзину</a>
            </div>
            <button className={cn(s.favorite, { [s.favoriteActive]: isLike })} onClick={onProductLike}>
                <Save />
                <span>{isLike ? 'В избранном' : 'В избранное'}</span>
            </button>
            <div className={s.delivery}>
                <img src={truck} alt='truck' />
                <div className={s.right}>
                    <h3 className={s.name}>Доставка по всему Миру!</h3>
                    <p className={s.text}>
                        Доставка курьером - <span className={s.bold}>от 399 Р</span>
                    </p>
                </div>
            </div>
            <div className={s.delivery}>
                <img src={quality} alt='quality' />
                <div className={s.right}>
                    <h3 className={s.name}>Доставка по всему Миру!</h3>
                    <p className={s.text}>
                        Доставка курьером - <span className={s.bold}>от 399 P</span>
                    </p>
                </div>
            </div>
        </div>
        </div>    

        <div className={s.box}>
            <h2 className={s.title}>Описание</h2>
            <p className={s.subtitle} dangerouslySetInnerHTML={desctiptionHTML}></p>
            <h2 className={s.title}>Характеристики</h2>
            <div className={s.grid}>
                <div className={s.naming}>Вес</div>
                <div className={s.description}>1 шт 120-200 грамм</div>
                <div className={s.naming}>Цена</div>
                <div className={s.description}>490 ₽ за 100 грамм</div>
                <div className={s.naming}>Польза</div>
                <div className={s.description}>
                    <p>
                        Большое содержание аминокислот и микроэлементов оказывает
                        положительное воздействие на общий обмен веществ собаки.
                    </p>
                    <p>Способствуют укреплению десен и жевательных мышц.</p>
                    <p>
                        Развивают зубочелюстной аппарат, отвлекают собаку во время смены
                        зубов.
                    </p>
                    <p>
                        Имеет цельную волокнистую структуру, при разжевывание получается
                        эффект зубной щетки, лучше всего очищает клыки собак.
                    </p>
                    <p>Следует учесть высокую калорийность продукта.</p>
                </div>
            </div>
        </div>
        {/* <div className="reviews__section">
            <h3 className={s.title}>Отзывы</h3>
            <button className={s.reviews__button}>Написать отзыв</button>
            <div className="reviews__photo-section">
                <h5>Фотографии наших покупателей</h5>
                <div className="reviews__photo">

                </div>
            </div>
            <div className={s.reviews__section_line}></div>
            <div className="reviews__section-feetback">
                <h4></h4>
                <span></span>
                <Rating />
                <p></p>
               
            </div>
            <div className="reviews__section-line"></div>
            <button className={s.reviews__button}>Все отзывы</button>
        </div> */}

        <div className={s.reviews}>
            <div>Reviews</div>
            <button className={s.reviews__button} onClick={()=>{}}>Написать отзыв</button>
            <Form 
            handleFormSubmit={handleSubmit(sendReviews)} title={"Написать отзыв"}>
            <div className={s.review__container}>
            <input
                {...register}
                className={s.review__input}
                type="email"
                name="email"
                placeholder="Написать отзыв"
            />
            <div className="review__button">
                <BaseButton type='submit'>Отправить</BaseButton>
            </div>
            </div>
        </Form>
            {reviews?.map((e)=><div>
                <span>{getUser(e.author)}</span>
                <span>{e.created_at.slice(0, 10)}</span><br></br>
                <Rating rating={e.rating}/>
                <p>{e.text}</p>
                <div className={s.reviews__section_line}></div>
            </div>)}
        </div>
    </>
}

