import { createContext, useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
// import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './Api'

export const API_URL = 'http://localhost:8000/graphql'

export const UserContext = createContext()

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null) // User data
  const [login, setLogin] = useState(null) // Status if user loged in is true or false
  const [loading, setLoading] = useState(false) // true while fetching user data
  const [error, setError] = useState(null) // Return the erro if a problem heppens while fetching user data
  const history = useHistory()

  const userLogout = useCallback(
    async () => {
      setData(null)
      setError(null)
      setLoading(false)
      setLogin(false)
      window.localStorage.removeItem('token')
      // navigate('/login')
      history.push('/auth')
    },
    [history]
    // [navigate]
  )

  const userLogin = async (email, password, isLogin=true) => {
    try {
      setError(null)
      setLoading(true)
      let resData

      if (isLogin) {
        const requestBody = {
          query: `
            query {
              login(email: "${email}", password: "${password}"){
                userId email token tokenExpiration
              }
            }
          `
        }
        const response = await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify(requestBody),
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        })
        if (response.status !== 200 && response.status !== 201) {
          throw new Error(`Error ${response.status}: Invalid email or password!`)
        }
        resData = await response.json()
        const json = resData.data.login
        const { token } = json
        window.localStorage.setItem('token', token)
        setLogin(true)
        setData(resData.data)
        history.push('/events')
      } else {
        const requestBody = {
          query: `
            mutation {
              createUser(userInput: {email: "${email}", password: "${password}"}) {
                _id
                email
              }
            }`,
          variables: {},
        }
        const response = await fetch('http://localhost:8000/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          mode: 'cors',
          headers: { 
            'Content-Type': 'application/json;charset=utf-8' 
          },
        })
        if (response.status !== 200 && response.status !== 201) {
          throw new Error(`Error ${response.status}: Invalid email or password!`)
        }
        resData = await response.json()
        if (resData.errors) {
          throw new Error(resData.errors[0].message)
        } else {
          return resData.data.createUser
        }
      }

    } catch (err) {
      setError(err.message)
      setLogin(false)
    } finally {
      setLoading(false)
    }
  }

  //useEffect sempre tem que vir depois de todas as constantes declaradas
  // useEffect(() => {
  //   async function autoLogin() {
  //     const token = window.localStorage.getItem('token')
  //     if (token) {
  //       try {
  //         setError(null)
  //         setLoading(true)
  //         const { url, options } = TOKEN_VALIDATE_POST(token)
  //         const response = await fetch(url, options)
  //         if (!response.ok) throw new Error('Token inválido')
  //         await getUser(token)
  //       } catch (err) {
  //         userLogout()
  //       } finally {
  //         setLoading(false)
  //       }
  //     } else {
  //       setLogin(false)
  //     }
  //   }
  //   autoLogin()
  // }, [userLogout])

  return (
    <UserContext.Provider
      // userLogin -> method to login user
      // userLogout -> method to logout user
      // data -> JSON response from user fetch with all user data
      // error -> Error if a problem heppens while user login ou logout
      // loading -> loading user data status. True while fetch user data
      // Status if user loged in is true or false
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  )
}
