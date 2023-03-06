import { useCallback, useEffect, useState } from "react"
import {ReactComponent as Star} from "../rating/star.svg"
import cn from 'classnames'
import s from './index.module.css'

export const Rating = ({rating, isEditable = false, setRating}) => {
     const [ratingArr, setRatingArr] = useState(new Array(5).fill(<></>))
    // const [ratingState, setRatingState] = useState(rating)

     const constructorRating = useCallback((currentRating)=>{
        const updatedArray = ratingArr.map((ratingElement, index)=>{
            return(
            <Star 
            className={cn(s.star, {
                [s.filled]: index < currentRating, 
                [s.editable]: !isEditable,
            })}
            onMouseEnter={()=>changeDisplay(index + 1)}
            onMouseLeave={()=>changeDisplay(rating)}
            onClick={()=>changeRating(index+1)}
            />)
        })
        setRatingArr(updatedArray)
     }, [isEditable, rating])


    const changeDisplay = (rate) => {
        if (!isEditable) return
        constructorRating(rate)
    }

    const changeRating = (ratingState) => {
        if (!isEditable) return
        setRating(ratingState)
    }

    useEffect(()=>{
        constructorRating(rating)
    }, [rating])
    return(
        <div>
            {ratingArr.map((r, i)=>(
                <span key={i}>{r}</span>
            ))}
        </div>
    )
}