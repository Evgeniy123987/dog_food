import cn from "classnames"
import { useEffect, useState } from "react"
import '../modal/index.css'

export const Modal = ({ children, activeModal, setActiveModal }) => {
    
    // const [active, setActive] = useState(false)

    useEffect (()=>{
        // setActive(true)
        // setActiveModal(false)
    }, [])
    return (
        <div className={cn('modal', {['active']: activeModal})} onClick={()=>setActiveModal(false)}>
            <div className={cn('modal_content', {['active']: activeModal})} onClick={(e)=>e.stopPropagation()}>{children}</div>
        </div>
    )
}