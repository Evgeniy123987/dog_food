import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { EMAIL_REGEXP, PASS_REGEXP, VALIDATE_CONFIG } from "../../constants/constants"
import { BaseButton } from "../baseButton/baseButton"
import { Form } from "../form/form"
import '../login/style.css'

export const Login = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})

    const emailRegister = register('email', {
        required: {
            value: true,
            message: VALIDATE_CONFIG.requiredMessage
        },
        pattern: {
            value: EMAIL_REGEXP,
            message: VALIDATE_CONFIG.email
        }
    })

    const passwordRegister = register('password', {
        required: {
            value: true,
            message: VALIDATE_CONFIG.requiredMessage
        },
        pattern: {
            value: PASS_REGEXP,
            message: VALIDATE_CONFIG.password
        }
    })

    const handleFormSubmit = (data) => {
        console.log(data)
    }

    return(
        <>
        <Form handleFormSubmit={handleSubmit(handleFormSubmit)} title={"Вход"}>
            <div className="auth__controls">
            <input
                {...emailRegister}
                className='auth__input'
                type="email"
                name="email"
                placeholder="Email"
            />
            {errors.email && <p>{errors?.email?.message}</p>}
            <input 
                {...passwordRegister}
                className='auth__input'
                type='password'
                name="password"
                placeholder="Пароль"
                required
            />
            {errors.password && <p>{errors?.password?.message}</p>}
            <p className="" onClick={()=>{}}>Востановить пароль</p>
            </div>
            <div className="login__button">
                <BaseButton type='submit'>Войти</BaseButton>
                <BaseButton type='button' onClick={()=>{}} >Регистрация</BaseButton>
            </div>
        </Form>
        </>
    )
}