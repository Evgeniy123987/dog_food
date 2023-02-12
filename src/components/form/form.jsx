import { useState } from 'react'
import s from '../form/index.module.css'

export const Form = ({addContact})=>{

    const [contactInfo, setContactInfo] = useState({
        name: '',
        lastName: '',
        phoneNamber: ''
    })

    const handleChange = (e)=>{
        setContactInfo({...contactInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        console.log(e)
        e.preventDefault()
        console.log(contactInfo)
        addContact(contactInfo)
    }

    return (
        <form onSubmit={handleSubmit} className={s.form__container}>
            <h3>Введите данные</h3>
            <input className={s.form} type='text' name='name' placeholder='Имя' onInput={handleChange} />
            <input className={s.form} type='text' name='lastName' placeholder='Фамилия' onInput={handleChange} />
            <input className={s.form} type='number' name='phoneNamber' placeholder='Телефон' onInput={handleChange} />
            <button className={s.button}>Отправить</button>
        </form>
    )
}