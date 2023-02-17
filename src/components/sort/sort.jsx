import { useContext } from 'react'
import { CardContext } from '../../context/cardContext'
import './index.css'

const Sort = () => {

    const {onSortData} = useContext(CardContext)

    const tabs = [
        {id: 'top', title: 'Популярные'},
        {id: 'nowelties', title: 'Новинки'},
        {id: 'cheep', title: 'Сначало дешовые'},
        {id: 'expensiv', title: 'Сначало дорогие'},
        {id: 'rayting', title: 'По рейтингу'},
        {id: 'discount', title: 'По скидке'}
    ]

    const handleChange = (id)=>{
        // setCurrentSort(id)
        onSortData(id)
    }

    return <div className='box__sort'>
        {tabs.map((tabs)=>(<div className='box__sort-button' onClick={()=>handleChange(tabs.id)}>{tabs.title}</div>))}
    </div>
}

export default Sort