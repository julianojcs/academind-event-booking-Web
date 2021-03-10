import styled from 'styled-components'

function Backdrop({ onCancel }) {
  return <BackdropContainer onClick={onCancel}></BackdropContainer>
}

const BackdropContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.75);
`

export default Backdrop
