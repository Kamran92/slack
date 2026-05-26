import { useContext, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import axios from 'axios'
import { Header } from '@widgets/header'
import routes from '@app/routes'
import { useNavigate } from 'react-router-dom'
import authContext from '@app/providers/AuthProvider'
import { useTranslation } from 'react-i18next'
import loginImage from '@shared/assets/loginImage.jpg'

interface LoginValues {
  username: string
  password: string
}

const LoginPage = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()
  const auth = useContext(authContext)
  const navigate = useNavigate()
  const [authFailed, setAuthFailed] = useState(false)

  const onSubmit = async (values: LoginValues) => {
    try {
      const response = await axios.post('/api/v1/login', values)

      auth?.logIn(response.data)

      navigate(routes.chat)
    }
    catch (err) {
      console.log(err)
      setAuthFailed(true)
      inputRef.current?.select()
    }
  }

  const formik = useFormik<LoginValues>({
    initialValues: { username: '', password: '' },
    onSubmit,
  })

  return (
    <div className="d-flex flex-column h-100">
      <Header />

      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img className="rounded-circle" src={loginImage} alt="Login" />
                </div>
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                  <fieldset disabled={formik.isSubmitting}>
                    <h1 className="text-center mb-4">{t('logIn.title')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        onChange={formik.handleChange}
                        name="username"
                        id="username"
                        autoComplete="username"
                        isInvalid={authFailed}
                        required
                        placeholder={t('placeholder.login')}
                        ref={inputRef}
                      />
                      <Form.Label htmlFor="username">{t('placeholder.login')}</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        onChange={formik.handleChange}
                        placeholder={t('placeholder.password')}
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        isInvalid={authFailed}
                        required
                      />
                      <Form.Label htmlFor="password">{t('placeholder.password')}</Form.Label>
                      <div className="invalid-tooltip">{authFailed ? t('logIn.errors.authorization') : null}</div>
                    </Form.Group>
                    <Button type="submit" variant="outline-primary w-100 mb-3">{t('logIn.title')}</Button>
                  </fieldset>
                </Form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('logIn.newUser')}</span>
                  {' '}
                  <a href="/signup">{t('signUp.title')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
