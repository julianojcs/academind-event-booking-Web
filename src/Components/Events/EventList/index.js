import { useContext } from 'react'
import { UserContext } from '../../../UserContext'
import styled from 'styled-components'
import EventItem from './EventItem'

function EventList({ events, authUserId, onViewDetail }) {
  const context = useContext(UserContext)
  const userId = context.data ? context.data.login._id : null

  const onViewDetaila = (eventId) => {
    console.log(eventId);
  }
  return (
    <EventsList>
      {events.map((event) => {
        return (
          <EventItem
            key={event._id}
            event={event}
            userId={authUserId}
            creatorId={event.creator._id}
            onDetail={onViewDetail}
          />
        )
      })}
    </EventsList>
  )
}

const EventsList = styled.ul`
  display: grid;
  row-gap: 0.5rem;
  width: 40rem;
  max-width: 100%;
  margin: 0 auto;
  list-style: none;
  padding: 0;
`

export default EventList
