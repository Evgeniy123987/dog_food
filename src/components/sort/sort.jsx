import { useContext, useState } from 'react'
import { CardContext } from '../../context/cardContext'
import './index.css'

const Sort = () => {

    const {onSortData} = useContext(CardContext)
    const [sortedId, setSortedId] = useState('new')
    
    const tabs = [
        {id: 'top', title: 'Популярные'},
        {id: 'nowelties', title: 'Новинки'},
        {id: 'cheep', title: 'Сначало дешовые'},
        {id: 'expensiv', title: 'Сначало дорогие'},
        {id: 'rayting', title: 'По рейтингу'},
        {id: 'discount', title: 'По скидке'}
    ]

    const handleChange = (id)=>{
        onSortData(id)
        setSortedId(id)
    }

    return <div className='box__sort'>
        {tabs.map((tabs)=>(<div className={`box__sort-button ${sortedId === tabs.id ? 'box__sort-black' : ''}`} onClick={()=>handleChange(tabs.id)}>{tabs.title}</div>))}
    </div>
}

export default Sort