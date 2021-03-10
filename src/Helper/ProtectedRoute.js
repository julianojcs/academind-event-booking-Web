import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const { login } = useContext(UserContext)

  return !!login ? <Route {...props} /> : <Redirect to='/auth' />
}

export default ProtectedRoute
