import React from "react"
import { useState } from "react"

export function Games () {

    const [count, setState] = useState(0);
    console.log({count});
    const click = () => {setState ((state) => {
        return state = state + 10;
    })}

    return (
        <div>
        <button className='buttonGame' onClick={click}>click my</button>
        <span>{count}</span>
        </div>
    )
}