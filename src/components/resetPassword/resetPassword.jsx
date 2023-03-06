import { useForm } from "react-hook-form"
import { EMAIL_REGEXP, VALIDATE_CONFIG } from "../../constants/constants"
import { authApi } from "../../utils/authApi"
import { BaseButton } from "../baseButton/baseButton"
import { Form } from "../form/form"
import '../login/style.css'

export const Reset = () => {

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

    const handleFormSubmit = async(data) => {
        try {
            await authApi.resetPass(data)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <Form handleFormSubmit={handleSubmit(handleFormSubmit)} title={"Восстановление пароля"}>
            <div className="auth__controls">
            <p>Для получения временного пароля необходимо ввести email, указанный при регистрации.</p>
            <input
                {...emailRegister}
                className='auth__input'
                type="email"
                name="email"
                placeholder="Email"
            />
            {errors.email && <p>{errors?.email?.message}</p>}
            </div>
            <p>Срок действия временного пароля 24 ч.</p>
            <div className="login__button">
                <BaseButton type='submit'>Отправить</BaseButton>
            </div>
        </Form>
        </>
    )
}