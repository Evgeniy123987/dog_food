import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { EMAIL_REGEXP, PASS_REGEXP, VALIDATE_CONFIG } from "../../constants/constants"
import { authApi } from "../../utils/authApi"
import { BaseButton } from "../baseButton/baseButton"
import { Form } from "../form/form"
import '../login/style.css'

export const Register = () => {

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

    const handleFormSubmit = async (data) => {
        try{
        console.log(data)
        await authApi.register({...data, group: 'group-9'})
        navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }


    const navigate = useNavigate()
    return(
        <>
        <Form handleFormSubmit={handleSubmit(handleFormSubmit)} title={"Регистрация"}>
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
            <p className="" onClick={()=>{}}>Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.</p>
            </div>
            <div className="login__button">
                <BaseButton type='submit'>Зарегестрироваться</BaseButton>
                <BaseButton type='button' onClick={()=>navigate('/login')} >Войти</BaseButton>
            </div>
        </Form>
        </>
    )
}