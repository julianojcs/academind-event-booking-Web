import { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import styled from 'styled-components'
import Input from '../Components/Forms/Input'
import Button from '../Components/Forms/Button'
import useForm from '../Hooks/useForm'
import Error from '../Helper/Error'

function Modal(props) {
  return (
    <ModalContainer>
      <Header>
        <h1>{props.title}</h1>
      </Header>
      <Content>{props.children}</Content>
      <Actions>
        {props.canCancel && <Button onClick={props.onCancel}>Cancel</Button>}
        {props.canConfirm && <Button onClick={props.onConfirm}>Confirm</Button>}
      </Actions>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  width: 90%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: fixed;
  top: 20vh;
  left: 5%;
  z-index: 100;
  border-radius: 5px;
  overflow: hidden;

  @media (min-width: 768px) {
    width: 30rem;
    left: calc((100% - 30rem) / 2);
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
