import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useCallback, useEffect, useRef, useState } from 'react';
import Input from '../components/Input';

export default function Register() {
  const initialData = {
    email: 'anderson@gmail.com'
  }

  const formRef = useRef(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
  })

  useEffect(() => console.log('user data ->', userInfo), [userInfo]);
  
  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().min(6).required(),
        email: Yup.string().email().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log('VALIDATION PASS. DATA ->', data);
    } catch (err) {
      console.log(err);
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      } else {
        // other message errors...
        console.log('errr', err);
      }
    }
  }, [])
  
  
  return (
    <div style={{ background: '#7159c1', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ color: '#eee' }}>UNFORM</h1>

      <Form onSubmit={handleSubmit} ref={formRef} initialData={initialData}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '18px', color: 'white' }}>Nome</label>
          <Input 
            placeholder="Name" 
            name="name" 
            onChange={event => setUserInfo(prevState => ({ ...prevState, [event.target.name]: event.target.value}))} 
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', margin: '20px 0px' }}>
          <label style={{ fontSize: '18px', color: 'white' }}>Email</label>
          <Input 
            placeholder="Email" 
            name="email" 
            type="email" 
            onChange={event => setUserInfo(prevState => ({ ...prevState, [event.target.name]: event.target.value }))} 
          />
        </div>

        <button type="submit">REGISTER</button>
      </Form>
    </div>
  ) 
}