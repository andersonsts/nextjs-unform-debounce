import { useCallback, useEffect, useState } from 'react';
import * as _ from 'lodash.debounce'; 
import axios from 'axios'; 

import FormRegister from '../components/FormRegister';
import { Loading } from '../styles/components/FormRegister/styles';

export default function Register() {
  const [dataUser, setDataUser] = useState({ name: '', email: '', techs: '' })
  const handleValueData = useCallback((data) => {
    console.log('data received', data)
  }, [])

  useEffect(() => {
    async function loadUser() {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const name     = response.data[0].name
      const email    = response.data[0].email

      const dataValue = { name, email, techs: 'rn' }

      setDataUser({ ...dataValue })
    }

    loadUser();
  }, [])

  return (
    <>
      {dataUser 
      ? <FormRegister handleValueData={handleValueData} initialData={dataUser} /> 
      : <Loading />}
    </>
  )
}