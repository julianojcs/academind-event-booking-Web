import styles from './Auth.module.css'
import Input from '../Components/Forms/Input'
import Button from '../Components/Forms/Button'

const AuthPage = () => {
  return (
    <div className='container mainContainer'>
      <h1 className='title'>Authentication</h1>
      <div className={styles.container_center}>
        <form action="" className={styles.auth_form}>
          <Input label='Usuário' type='email' name='email' id='email'/>
          <Input label='Password' type='pasword' name='password' id='password'/>
          <div className={styles.buttons_control}>
            <Button type="button">Sing-up</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthPage
