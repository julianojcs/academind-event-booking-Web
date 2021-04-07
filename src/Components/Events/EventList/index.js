import styled from 'styled-components'
import EventItem from './EventItem'

function EventList({ events, authUserId, onViewDetail }) {
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
