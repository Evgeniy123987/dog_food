import { useCallback, useEffect, useState } from "react"
import {ReactComponent as Star} from "../rating/star.svg"
import cn from 'classnames'
import s from './index.module.css'

export const Rating = () => {
     const [ratingArr, setRatingArr] = useState(new Array(5).fill(<></>))
    const [rating, setRating] = useState(1)

     const constructorRating = useCallback(()=>{
        const updatedArray = ratingArr.map((ratingElement, index)=>{
            return
            <Star 
            className={cn(s.star, {
                [s.filled]: index < currentRating, 
            })}
            onMouseEnter={()=>changeDisplay(index + 1)}
            onMouseleave={()=>changeDisplay(currentRating)}
            onClick={()=>changeRating(index+1)}
            />
        })
        setRatingArr(updatedArray)
     }, [rating, ratingArr])

    const changeDisplay = (rate) => {
        console.log({rate})
        constructorRating(rate)
    }

    const changeRating = (rating) => {
        setRating(rating)
    }

    useEffect(()=>{
        constructorRating(rating)
    }, [constructorRating, rating])
    return(
        <div>
            {ratingArr.map((r, i)=>(
                <span key={i}>{r}</span>
            ))}
        </div>
    )
}