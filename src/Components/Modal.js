import styled from 'styled-components'
import Button from '../Components/Forms/Button'
import useOutsideClick from '../Hooks/useOutsideClick'
import { useRef } from 'react'


function Modal(props) {
  const ref = useRef()

  useOutsideClick(ref, () => {
    if (props.show) props.onCancel()
  })

  return (
    props.show && (
      <>
        <BackdropContainer></BackdropContainer>
        <ModalContainer ref={ref}>
          <Header>
            <h1>{props.title}</h1>
          </Header>
          <Content>{props.children}</Content>
          <Actions>
            {props.canCancel && (
              <Button onClick={props.onCancel}>Cancel</Button>
            )}
            {props.canConfirm && (
              <Button onClick={props.onConfirm}>
                {props.confirmTextButton}
              </Button>
            )}
          </Actions>
        </ModalContainer>
      </>
    )
  )
}

const BackdropContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.75);
  z-index: 50;
`

const ModalContainer = styled.div`
  width: 90%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: absolute;
  left: 5%;
  z-index: 100;
  border-radius: 5px;
  overflow: hidden;
  z-index: 51;

  @media (min-width: 768px) {
    width: 30rem;
    left: calc((100% - 30rem) / 2);
  }
  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    border-radius: 0;
  }
`

const Header = styled.header`
  padding: 1rem;
  background: var(--clr-secondary);
  color: white;
  h1: {
    margin: 0;
    font-size: 1.25rem;
  }
`

const Content = styled.section`
  padding: 1rem;
`

const Actions = styled.section`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  gap: 1rem;
`

export default Modal
