import * as _ from 'lodash.debounce'
import { useCallback, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';

export default function About() {
  const [user, setUser] = useState({
    name: '',
    cpf: '',
    age: ''
  });

  const callToApi = useCallback(_(value => {
    console.log('userdata para ser enviado a api -> ', value)
  }, 500), [])

  const handleValue = useCallback((event) => {
    const { name, value } = event.target

    setUser(prevState => ({ ...prevState, [name]: name === 'cpf' 
      ? value.replace(/[^0-9]+/g,'') 
      : value 
    }))
  }, [])

  useEffect(() => {
    callToApi(user);
  }, [user])

  return (
    <>
      <label>Name</label>
      <input 
        name="name" 
        value={user.name} 
        onChange={event => handleValue(event)} 
      />

      <label>CPF</label>
      <InputMask 
        name="cpf" 
        maskChar={false} 
        mask="999.999.999-99" 
        value={user.cpf} 
        onChange={event => handleValue(event)} 
      />
    
      <label>Age</label>
      <InputMask
        name="age" 
        maskChar={false}
        mask="999"
        value={user.age} 
        onChange={event => handleValue(event)} 
      />
    </>
  )
}