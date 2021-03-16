import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../UserContext'
import styled from 'styled-components'
import Modal from '../Components/Modal'
import Button from '../Components/Forms/Button'
import Input from '../Components/Forms/Input'
import Textarea from '../Components/Forms/Textarea'
import useForm from '../Hooks/useForm'
import Error from '../Helper/Error'
import EventList from '../Components/Events/EventList'

const EventsPage = () => {
  const [creating, setCreating] = useState(false)
  const [events, setEvents] = useState([])
  const [error, setError] = useState('')
  const context = useContext(UserContext)
  const token = context.data ? context.data.login.token : null
  const userId = context.data ? context.data.login.userId : null
  const title = useForm()
  const price = useForm('decimal')
  const date = useForm()
  const description = useForm('datetimeLocal')


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
    if (
      !(
        title.validate() &&
        price.validate() &&
        date.validate() &&
        description.validate()
      )
    ) {
      setError('Fill the form whit valid values!')
    }
    try {
      const event = {
        title: title.value,
        price: +price.value.replace(',', '.'),
        date: date.value,
        description: description.value
      }

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
          Authorization: 'Bearer ' + token
        }
      })
      if (response.status !== 200 && response.status !== 201) {
        throw new Error()
      }
      const resData = await response.json()

      if (resData?.data?.createEvent) {
        events.push(resData.data.createEvent)
        clearModal()
        setCreating(false)
      } else if (resData?.errors?.length) {
        throw new Error(resData.errors[0].message)
      }
    } catch (err) {
      setError(err.message)
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
              price
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
      setError(err.message)
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
            <Input
              label='Price'
              type='number'
              name='price'
              placeholder='0.00'
              min='0'
              value='0'
              step='1.00'
              {...price}
            />
            <Input label='Date' type='datetime-local' name='date' {...date} />
            <Textarea
              label='Description'
              name='description'
              rows='4'
              {...description}
            />
          </div>
          {error && <Error error={error} />}
        </form>
      </Modal>
      <ContainerEvents className='container mainContainer'>
        <h1 className='title'>Events</h1>
        <div className='container_center'>
          {token && (
            <EventControl>
              <Paragraph>Share your own Events!</Paragraph>
              <Button onClick={startCreateEventHandler}>Create Event</Button>
            </EventControl>
          )}
          <EventList events={events} authUserId={context}></EventList>
        </div>
      </ContainerEvents>
    </>
  )
}

const ContainerEvents = styled.div`
  overflow-y: auto;
`

const Paragraph = styled.p`
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
