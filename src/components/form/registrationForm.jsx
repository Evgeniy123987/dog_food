import { red } from '@mui/material/colors'
import { useForm } from 'react-hook-form'
import s from '../form/index.module.css'

export const RegistrationForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onChange'})
    const onSubmit = (data) => console.log(data)
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form__container}>
        <h3>Регистрация</h3>
            <input 
            className={s.form} 
            type='text' 
            placeholder='Имя' 
            {...register('name', {
                required: 'обязательное поле',
                maxLength: {
                  value: 10,
                  message: 'big name'
                },
            })}

            />
            <span>{errors?.name && <p style={{color: 'red'}}>{errors?.name?.message}</p>}</span>
            <input 
            className={s.form} 
            type='password' 
            placeholder='password' 

            required
            {...register('password', {
                required: 'обязательное поле',
                minLength: {
                    value: 3,
                    message: 'min password'
                }
            }
            )}
            />
            <span>{errors?.password && <p style={{color: 'red'}}>{errors?.password?.message}</p>}</span>
            <input 
            className={s.form} 
            type='number' 
            placeholder='Телефон' 

            required
            {...register('phoneNamber')}
            />
            <button className={s.button}>Отправить</button>
        </form>
    )
}