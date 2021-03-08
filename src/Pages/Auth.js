import { useContext } from 'react'
import { UserContext } from '../UserContext'
import styles from './Auth.module.css'
import Input from '../Components/Forms/Input'
import Button from '../Components/Forms/Button'
import useForm from '../Hooks/useForm'
import Error from '../Helper/Error';

const AuthPage = (props) => {

  const email = useForm('email') // useForm(false) -> no validation
  const password = useForm() // useForm() -> input value is required

  const {  userLogin, error, loading  } = useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault()

    // const requestBody = {
    //   query: `
    //     mutation {
    //       createUser(userInput: {email: "${email}", password: "${password}"}) {
    //         _id
    //         email
    //       }
    //     }`,
    //   variables: {},
    // }

    // fetch('http://localhost:8000/graphql', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(requestBody),
    // })
    //   .then(res => res.json())
    //   .then(res => console.log(res.data))


    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value)
    }
  }

  return (
    <div className='container mainContainer'>
      <h1 className='title'>Authentication</h1>
      <div className={styles.container_center}>
        <form onSubmit={handleSubmit} className={styles.auth_form}>
          <Input label='email' type='email' name='email' {...email}
          />
          <Input label='Password' type='password' name='password' {...password}
          />
          <div className={styles.buttons_control}>
            {loading ? (
              <>
                <Button disabled type="button">Sing-up</Button>
                <Button disabled>Carregando...</Button>
              </>
            ) : (
              <>
                <Button type="button">Sing-up</Button>
                <Button type="submit" onClick={handleSubmit}>Submit</Button>
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
