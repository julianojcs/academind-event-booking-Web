import { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import styles from './Auth.module.css'
import Input from '../Components/Forms/Input'
import Button from '../Components/Forms/Button'
import useForm from '../Hooks/useForm'
import Error from '../Helper/Error';

const AuthPage = (props) => {

  const [isLogin, setIsLogin] = useState(true)

  const email = useForm('email') // useForm(false) -> no validation
  const password = useForm() // useForm() -> input value is required

  const {  userLogin, error, loading  } = useContext(UserContext)

  const switchModeHandler = () => {
    setIsLogin(!isLogin)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (email.validate() && password.validate()) {
      const result = await userLogin(email.value, password.value, isLogin)
      if (result) {
        setIsLogin(!isLogin)
        userLogin(email.value, password.value)
      }
    }
  }

  return (
    <div className='container mainContainer'>
      <h1 className='title'>Authentication</h1>
      <div className={styles.container_center}>
        <form onSubmit={handleSubmit} className={styles.auth_form}>
          <Input label='email' type='email' name='email' {...email} />
          <Input
            label='Password'
            type='password'
            name='password'
            {...password}
          />
          <div className={styles.buttons_control}>
            {loading ? (
              <>
                <Button disabled type='button'>
                  Sing-up
                </Button>
                <Button disabled>Carregando...</Button>
              </>
            ) : (
              <>
                <Button type='button' onClick={switchModeHandler}>
                  Switch to {isLogin ? 'SignUp' : 'Login'}
                </Button>
                <Button type='submit' onClick={handleSubmit}>
                  Submit
                </Button>
              </>
            )}
          </div>
          <Error error={error} />
        </form>
      </div>
    </div>
  )
}

export default AuthPage
