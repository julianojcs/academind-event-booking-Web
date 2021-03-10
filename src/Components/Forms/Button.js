import styled from 'styled-components'

const Button = ({ children, ...props }) => {
  return (
    <ButtonStyled {...props}>
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  font-size: 1rem;
  font-family: var(--type-first);
  cursor: pointer;
  border: none;
  border-radius: 0.4rem;
  background: var(--clr-secondary);
  color: var(--clr-lightgray);
  min-width: 8rem;
  padding: 0.8rem 1.2rem;
  box-sizing: border-box;
  transition: 0.1s;
  &:hover, 
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--clr-secondary-light), 0 0 0 4px var(--clr-secondary-dark);
  }
  &:disabled {
    opacity: 0.5;
    cursor: wait;
  }
`

export default Button;
