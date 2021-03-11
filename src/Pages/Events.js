import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../UserContext'
import styled from 'styled-components'
import Modal from '../Components/Modal'
import Button from '../Components/Forms/Button'
import Input from '../Components/Forms/Input'
import Textarea from '../Components/Forms/Textarea'
import useForm from '../Hooks/useForm'

const EventsPage = () => {

  const [creating, setCreating] = useState(false)
  const [events, setEvents] = useState([])

  const context = useContext(UserContext)

  const token = context.data ? context.data.login.token : null

  const title = useForm()
  const price = useForm('decimal')
  const date = useForm()
  const description = useForm()


  const clearModal = () => {
    title.setValue('')
    price.setValue('')
    date.setValue('')
    description.setValue('')
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const startCreateEventHandler = () => {
    setCreating(true)
  }

  const modalConfirmHandler = async () => {
    try {
      const event = {
        title: title.value,
        price: +price.value.replace(',','.'),
        date: date.value,
        description: description.value}

      const requestBody = {
        query: `
          mutation {
            createEvent(eventInput: {title: "${event.title}", price: ${event.price}, date: "${event.date}", description: "${event.description}"}) {
              _id
              title
              description
              date
              creator {
                _id
                email
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

      events.push(resData.data.createEvent)

      clearModal()
      
      setCreating(false)
    } catch (err) {
      console.log(err.message)
    }

  }

  async function fetchEvents() {
    try {
      const requestBody = {
        query: `
        query {
            events {
              _id
              title
              description
              date
              creator {
                _id
                email
              }
            }
          }`
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
        throw new Error(response.err)
      }
      const resData = await response.json()

      setEvents(resData.data.events)

    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <Modal 
        title='Add Event' 
        canCancel 
        canConfirm 
        show={creating}
        onCancel={() => setCreating(false)}
        onConfirm={modalConfirmHandler}
      >
        <form>
          <div>
          <Input label='Title' type='text' name='title' {...title} />
          <Input label='Price' type='number' name='price' {...price} />
          <Input label='Date' type='datetime-local' name='date' {...date} />
          <Textarea label='Description' name='description' rows='4' {...description} />
          </div>
        </form>
      </Modal>
      <div className='container mainContainer'>
        <h1 className='title'>Events</h1>
          <div className='container_center'>
            {token && (
              <EventControl>
                <Paragraph>Share your own Events!</Paragraph>
                <Button onClick={startCreateEventHandler}>Create Event</Button>
              </EventControl>
            )}
            <EventsList>
              {events.map((event) => {
                return <EventsListItem key={event._id}>{event.title}</EventsListItem>
              })}
            </EventsList>
          </div>
      </div>
    </>
  )
}

const EventsList = styled.ul`
  display: grid;
  row-gap: .5rem;
  width: 40rem;
  max-width: 90%;
  margin: 1rem auto;
  list-style: none;
  padding: 0;
`

const EventsListItem = styled.li`
  margin: 0;
  padding: 1rem;
  border: 1px solid var(--clr-primary);
  border-radius: 5px;
`

const Paragraph = styled.p`
  margin-block-start: 1em;
  margin-block-end: 1em;
`

const EventControl = styled.div`
  text-align: center;
  width: 30rem;
  max-width: 80%;
  margin: 0 auto 1rem;
  padding: 1rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 5px;
`

export default EventsPage
