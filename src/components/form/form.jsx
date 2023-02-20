
import s from '../form/index.module.css'

export const Form = ({title, handleFormSubmit, children})=>{


    return (
        <form onSubmit={handleFormSubmit} className={s.form__container}>
            <h1 className={s.title}>{title}</h1>
            {children}
        </form>
    )
}