import { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import styled from 'styled-components'
import Input from '../Components/Forms/Input'
import Button from '../Components/Forms/Button'
import useForm from '../Hooks/useForm'
import Error from '../Helper/Error'

const AuthPage = (props) => {

  const [isLogin, setIsLogin] = useState(true)

  const email = useForm('email') // useForm(false) -> no validation
  const password = useForm() // useForm() -> input value is required

  const { userLogin, error, loading } = useContext(UserContext)

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
      <h1 className='title'>{isLogin ? 'Login' : 'SignUp'}</h1>
      <div className='container_center'>
        <Form onSubmit={handleSubmit}>
          <Input label='email' type='email' name='email' {...email} />
          <Input
            label='Password'
            type='password'
            name='password'
            {...password}
          />
          <BtnControl>
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
          </BtnControl>
          <Error error={error} />
        </Form>
      </div>
    </div>
  )
}

const Form = styled.form`
  width: 20rem;
  max-width: 80%;
  margin: auto auto;
  @media all and (max-width: 50rem) {
    width: 100%;
    max-width: 100%;
  }
`

const BtnControl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  justify-content: space-between;
`

export default AuthPage
