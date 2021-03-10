import { useState } from 'react'
import Button from '../Components/Forms/Button'
import Modal from '../Components/Modal'
import Backdrop from '../Components/Backdrop'

const EventsPage = () => {

  const [creating, setCreating] = useState(false)

  const startCreateEventHandler = () => {
    setCreating(true)
  }

  const modalConfirmHandler = () => {
    setCreating(false)
  }

  return (
    <>
      { creating && 
        <>
          <Backdrop onCancel={() => setCreating(false)}/>
          <Modal 
            title='Add Event' 
            canCancel 
            canConfirm 
            onCancel={() => setCreating(false)}
            onConfirm={modalConfirmHandler}
          >
            <p>Modal content</p>
          </Modal>
        </>
      }
      <div className='container mainContainer'>
        <h1 className='title'>Events Page</h1>
        <div className='container_center'>
          <Button onClick={startCreateEventHandler}>Create Event</Button>
        </div>
      </div>
    </>
  )
}

export default EventsPage
