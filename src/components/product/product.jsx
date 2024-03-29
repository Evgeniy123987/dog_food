import cn from "classnames"
import React, { useState } from "react"
import { useEffect } from "react"
import s from "./index.module.css"
import { ReactComponent as Save } from "./img/save.svg"
import quality from './img/quality.svg'
import truck from './img/truck.svg'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Rating } from "../rating/rating"
import api from '../../../src/utils/Api'
import { Form } from "../form/form"
import { useForm } from "react-hook-form"
import { BaseButton } from "../baseButton/baseButton"
import { VALIDATE_CONFIG } from "../../constants/constants"
import { DeleteOutlined } from "@mui/icons-material"
import { LeftOutlined } from "@ant-design/icons"

export const Product = ({ pictures, name, price, discount, onProductLike, likes = [], currentUser,
    description, reviews, onSendReviews, deleteReviews, stock }) => {
    const [users, setUsers] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [rating, setRating] = useState(0)
    const [counterCard, setCounterCard] = useState(0)

    const discount_price = Math.round(price - price * discount / 100);
    const isLike = likes.some((id) => id === currentUser?._id);

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


        const reviewRegister = register('text', {
            required: {
                value: true,
                message: VALIDATE_CONFIG.requiredMessage
            },
            minLength: {value: 4,
            message: 'минимальное количество символов'}
        })    
    
    const formSabmit = () => {
        setShowForm(true)
    }
    
    const deleteReviewSabmit = (e)  => {
        deleteReviews(e)
    }

    const handleCard = ()=> {
        const goods = localStorage.getItem('goods')
        if (!goods) {
            localStorage.setItem('goods', JSON.stringify([{name, counterCard}]))
        } else {
            localStorage.setItem('goods', JSON.stringify([...JSON.parse(goods), {name, counterCard}]))
        }
    }

    return <>
    <span onClick={handleClick} className={s.button__back}>
        <LeftOutlined /> Назад
    </span>
    <div className={s.product__container}>
        <div>
        <div>
            <h1 className={s.productTitle}>{name}</h1>
            <div className={s.rating__cards}>
                <span>артикул: </span><b>23890</b>
                <span className={s.rating__top}><Rating isEditable={true} rating={rating} setRating={setRating}/></span>
                <a href="#reviews" className={s.rating__link}>{reviews?.length} отзывов</a>
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
                    <button className={s.minus} onClick={()=>counterCard > 0 && setCounterCard(counterCard - 1)}>-</button>
                    <span className={s.num}>{counterCard}</span>
                    <button className={s.plus} onClick={()=>stock > counterCard && setCounterCard(counterCard + 1)}>+</button>
                </div>
                <button href="/#" className={s.product__basket} onClick={handleCard}>В корзину</button>
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
            <p className={s.subtitle}>{description}</p>
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

        <div className={s.reviews}>
            <div id="reviews">Reviews</div>
            
            {!showForm ? <button className={s.reviews__button} onClick={()=>{formSabmit()}}>Написать отзыв</button> : ""}

            {showForm ? 
            <Form 
            handleFormSubmit={handleSubmit(onSendReviews)} title={"Написать отзыв"}>
                <Rating isEditable={true} rating={rating} setRating={setRating} />
            <div className={s.review__container}>
            <textarea
                {...reviewRegister}
                className={s.review__input}
                type="text"
                name="text"
                placeholder="Написать отзыв"
            />
            <div className={s.review__button}>
                <BaseButton type='submit'>Отправить</BaseButton>
            </div>
            </div>
            </Form> : ''
            }

            {reviews?.sort((a, b)=> new Date(b.created_at) - new Date(a.created_at)).map((e)=>
            <div key={e._id}>
                <span>{getUser(e.author)}</span>
                <span>{e.created_at.slice(0, 10)}</span><br></br>
                <Rating rating={e.rating}/>
                <p>{e.text}</p>
                {(e.author === currentUser._id) ? <span onClick={()=>deleteReviewSabmit(e._id)}><DeleteOutlined /></span> : ""}
                <div className={s.reviews__section_line}></div>
            </div>)}
        </div>
    </>
}

