import styled from 'styled-components'

const Input = ({ label, type, name, value, onChange, error, onBlur }) => {
  return (
    <Wrapper>
      <Label htmlFor={name}>
        {label}
      </Label>
      <InputStyled
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <Error>{error}</Error>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 1rem;
`

const InputStyled = styled.input`
  border: 1px solid var(--clr-lightgray);
  display: block;
  width: 100%;
  font-size: 1rem;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background: var(--clr-lightgray);
  transition: 0.2s;
  &:hover, 
  &:focus {
    outline: none;
    border-color: var(--clr-secondary);
    background: white;
    box-shadow: 0 0 0 3px var(--clr-secondary-light);
  }
  &::selection,
  &::-moz-selection {
    background-color: var(--clr-secondary);
    color: var(--clr-secondary-light);
  }
`

const Label = styled.label`
  display: block;
  font-size: 1rem;
  line-height: 1;
  padding-bottom: 0.5rem;
`

const Error = styled.p`
  color: #f31;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`

export default Input
