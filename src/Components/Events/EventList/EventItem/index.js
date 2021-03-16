import styled from 'styled-components'
import Button from '../../../Forms/Button'

import React from 'react'

function EventItem({ event, userId, creatorId, onDetail }) {
  return (
    <EventsListItem key={event._id}>
      <div>
        <h1>{event.title}</h1>
        <h2>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
          }).format(event.price)} - {
          event.date
          }
        </h2>
      </div>
      <RigthContent>
        {userId === creatorId ? (
          <p>You are the owner of this event.</p>
        ) : (
          <ButtonSmall onClick={(e) => onDetail(event._id, e)}>View Details</ButtonSmall>
        )}
      </RigthContent>
    </EventsListItem>
  )
}

const RigthContent = styled.div`
  text-align: end;
  & p {
    margin: 0;
  }
`

const ButtonSmall = styled(Button)`
  font-size: 0.8rem;
  min-width: 6rem;
  padding: 0.3rem 0.2rem;
`

const EventsListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 1rem;
  border: 1px solid var(--clr-primary);
  align-items: center;
  border-radius: 5px;
  & h1 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--clr-primary-dark);
  }
  & h2 {
    margin: 0;
    font-size: 1rem;
    color: var(--clr-darkgray);
  }

  @media all and (max-width: 50rem) {
    padding: 0.5rem;
  }
`
export default EventItem
