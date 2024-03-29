import { useContext, useState, useEffect } from 'react'
import Spinner from '../Components/Spinner'
import { UserContext } from '../UserContext'
import BookingList from '../Components/Bookings/BookingList'

const BookingsPage = () => {
  const context = useContext(UserContext)
  const token = context.data ? context.data.login.token : null
  const [isLoading, setIsLoading] = useState(false)
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    if (!token) {
      setBookings(null)
      return
    }
    try {
      setIsLoading(true)
      const requestBody = {
        query: `
          query {
            bookings {
              _id
              createdAt
              event {
                _id title date
              }
            }
          }`
      }

      const response = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': 'Bearer ' + token
        },
      })
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.err)
      }
      const resData = await response.json()

      setBookings(resData.data.bookings)
    } catch (err) {
      setError(err.message)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1200);
    }
  }

  const handleCancelBooking = async (bookingId) => {
    if (!token) {
      setBookings(null)
      return
    }
    try {
      setIsLoading(true)
      const requestBody = {
        query: `
          mutation {
            cancelBooking(bookingId: "${bookingId}") {
              _id
              title
            }
          }`
      }

      const response = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: 'Bearer ' + token
        }
      })
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.err)
      }
      const resData = await response.json()

      setBookings(
        bookings.filter((booking) => {
          return booking._id !== bookingId
        })
      )
      alert(`Booking "${resData.data.cancelBooking.title}" canceled.`)
    } catch (err) {
      setError(err.message)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1200)
    }
  }

  return (
    <div className='container mainContainer'>
      <h1 className='title'>Bookings</h1>
      <div className='container'>
        {isLoading ? (
          <Spinner />
        ) : (
          <BookingList bookings={bookings} onCancel={handleCancelBooking} />
        )}
      </div>
    </div>
  )
}

export default BookingsPage
