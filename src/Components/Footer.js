import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterContainer>
      <Logo>
        <h1>EasyEvent</h1>
      </Logo>
      <p>EasyEvent - Todos os direitos reservados.</p>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  background: var(--clr-primary-dark);
  padding: 1rem 1rem 0 1rem;
  height: 6rem;
  text-align: center;
  color: var(--clr-lightgray);
  overflow: hidden;
  position: fixed;
  width: 100vw;
  bottom: 0;
  z-index: 40;
  p {
    margin-top: 0.5rem;
    pointer-events: none;
  }
`

const Logo = styled.div`
  margin: 0 1.5rem;
  pointer-events: none;
`

export default Footer
