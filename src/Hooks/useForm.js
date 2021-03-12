import { useState } from 'react'

const types = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido.'
  },
  password: {
    regex: /^(?=.*\d)(?=.*[.?!@#$%^=&*_-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    message:
      'A senha precisa ter o minimo de 8 caracteres, com 1 maiúsculo, 1 minúsculo, 1 digito e 1 caracter especial (.?!@#$%^=&*_-).'
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize apenas números.'
  },
  decimal: {
    regex: /^\d+(\.\d{1,2})?$/,
    message: 'Utilize apenas número com até 2 casas decimais.'
  },
  datetimeLocal: {
    regex: /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/,
    message: 'Informe uma data/hora válida.'
  }
}

const useForm = (type) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)

  const validate = (value) => {
    if (type === false) return true
    if (value.length === 0) {
      setError('Preencha um valor.')
      return false
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message)
      return false
    } else {
      setError(null)
      return true
    }
  }

  const onChange = ({ target }) => {
    if (error) validate(target.value)
    setValue(target.value)
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value)
  }
}

export default useForm
