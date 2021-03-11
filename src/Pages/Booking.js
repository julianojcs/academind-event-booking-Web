import { useContext, useEffect } from 'react'
import { UserContext } from '../UserContext'

const BookingsPage = () => {
  const { data, login } = useContext(UserContext)

  useEffect(() => {}, [data])

  return (
    <div className='container mainContainer'>
      <h1 className='title'>Bookings</h1>
      <div className='container_center'>
        <p>{data && data.login.email}</p>
        <p>{login ? 'true' : 'false'}</p>
      </div>
    </div>
  )
}

export default BookingsPage
