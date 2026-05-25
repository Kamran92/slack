import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: Yup.string()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов'),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
})
