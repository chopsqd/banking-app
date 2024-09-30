import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const PASSWORD_MIN_LENGTH = 6

export function useLoginForm() {
  const router = useRouter()
  const store = useStore()
  const {handleSubmit, isSubmitting} = useForm()

  const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
    'email',
    yup
      .string()
      .trim()
      .required('Это обязательное поле')
      .email('Необходимо ввести корректный email')
  )

  const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
    'password',
    yup
      .string()
      .trim()
      .required('Это обязательное поле')
      .min(PASSWORD_MIN_LENGTH, `Пароль не может быть меньше ${PASSWORD_MIN_LENGTH} символов`)
  )

  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('auth/login', values)
      await router.push('/')
    } catch (error) {
      console.log(error)
    }
  })

  return {
    email, password,
    eError, pError,
    eBlur, pBlur,
    onSubmit, isSubmitting
  }
}
