import { useContext, useEffect } from 'react'
import { UserContext } from '../UserContext'

const BookingsPage = () => {
  const { data, login } = useContext(UserContext)

  useEffect(() => {
    console.log(data?.login.userId)
    console.log(login)
  }, [data])

  return (
    <div className='container mainContainer'>
      <h1 className='title'>Bookings Page</h1>
      <p>{data && data.login.email}</p>
      <p>{login ? 'true' : 'false'}</p>
    </div>
  )
}

export default BookingsPage
