import styled from 'styled-components'
import Button from '../../Forms/Button'

const BookingList = ({ bookings, onCancel }) => {
  return (
    <BookingsList>
      {bookings.map((booking) => (
        <BookingsItem key={booking._id}>
          <BookingsItemData>
            {`${booking.event.title} - ${booking.createdAt}`}
          </BookingsItemData>
          <BookingsItemActions>
            <Button onClick={() => onCancel(booking._id)}>Cancel</Button>
          </BookingsItemActions>
        </BookingsItem>
      ))}
    </BookingsList>
  )
}

const BookingsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const BookingsItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid var(--clr-primary);
`

const BookingsItemData = styled.div``

const BookingsItemActions = styled.div``

export default BookingList
