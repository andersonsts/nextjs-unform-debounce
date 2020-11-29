import axios from 'axios';
import { Form } from '@unform/web';
import { useCallback, useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import Input from '../components/Input';
import Router from 'next/router';

// BUG DO CPF RESOLVIDO //

export default function CPF() {
  const formRef = useRef(null)

  const [value, setValue] = useState('');
  const [address, setAddress] = useState({
    city: '',
    uf  : ''
  });
  const [other, setOtherValue] = useState('pedr');

  useEffect(() => {
    const { pathname } = Router

    if(pathname === '/cpf') {
      Router.push('/')
    }
  }, [])

  useEffect(() => {
    if(other === 'pedro') {
      formRef.current.setErrors({
        other: "Sete aqui um erro manual. Caso o usuario digite 'pedro' para other, esse erro sera setado."
      })
    }
  }, [other])

  async function handleValue(valueData) {
    const data = valueData.replace(/[^\d]+/g,'')

    if(data.length === 8) {
      const response = await axios.get(`https://viacep.com.br/ws/${data}/json/`)
    
      if(response.data.erro && response.data.erro === true) {
        console.log('CEP INVÁLIDO!!!');
      } else {
        setAddress({
          city: response.data.localidade,
          uf: response.data.uf
        })
      }
    } 
  }

  const handleSubmit = useCallback((data) => {
    console.log('data received', data)
  }, [])

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <InputMask 
        value={value}
        placeholder="text"
        name="cpf"
        mask="99999-999"
        onChange={event => setValue(event.target.value)}
        onChangeCapture={event => handleValue(event.target.value)}
      />

      <input 
        defaultValue={address.city}
      />
      <input 
        defaultValue={address.uf}
      />

      <Input 
        onChangeCapture={event => {
          setOtherValue(event.target.value)
        }}
        defaultValue={other}
        name="other"
      />

      <button type="submit">
        PROCURAR ENDEREÇO PELO CEP
      </button>
    </Form>
  )
}