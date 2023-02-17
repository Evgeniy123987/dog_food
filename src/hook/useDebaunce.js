import { useEffect } from "react";
import { useState } from "react";

const useDebounce = (value, delay) => {
    const[debounceValue, setDebaunceValue] = useState(value);

    useEffect(()=>{
        const timeaut = setTimeout(()=>{
            setDebaunceValue(value)
        },delay);

        return() => clearTimeout(timeaut)
    })
    return debounceValue
}

export default useDebounce;