import { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import * as _ from 'lodash.debounce';
import * as Yup from 'yup';

import Input from '../Input';
import Select from '../Select';
import { 
  ButtonSubmit,
  Container,
  FormItemContainer,
  Loading,
  Title
} from '../../styles/components/FormRegister/styles';

export default function FormRegister({ handleValueData, initialData }) {
  const formRef = useRef(null);
  const [, setUserInfo] = useState({ name: '', email: '', techs: '' })
  const options = [ 
    { label: 'NodeJS',  value: 'nodejs'  },
    { label: 'ReactJS', value: 'reactjs' }, 
    { label: 'RN',      value: 'rn'      }
  ] 
  
  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current.setErrors({})
  
      const schema = Yup.object().shape({
        name: Yup.string().min(6).required('Nome é obrigatório.'),
        email: Yup.string().email().required('E-mail é obrigatório.'),
      });
  
      await schema.validate(data, {
        abortEarly: false,
      });

      handleValueData(data)
    } catch (err) {
      console.log(err);
      const validationErrors = {};
  
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
  
        formRef.current.setErrors(validationErrors);
      } else {
        console.log('errr', err);
      }
    }
  }, [])

  const handleEvent = useCallback(_(event => {
    setUserInfo(prevState => ({ ...prevState, [event.target.name]: event.target.value }))
  }, 500), [])
  
  // useEffect(() => console.log('inital', initialData), [initialData])

  useEffect(() => {
    if(initialData) {
      formRef.current.setData({ 
        techs: initialData.techs,
        name: initialData.name,
        email: initialData.email 
      })
    }
  }, [])

  return (
    <Container>
      <Title>UNFORM</Title>

      <Form onSubmit={handleSubmit} ref={formRef}>
        <FormItemContainer>
          <label>Nome</label>
          <Input 
            placeholder="Name" 
            name="name" 
            onChange={event => handleEvent(event)} 
          />
        </FormItemContainer>

        <FormItemContainer>
          <label>Email</label>
          <Input 
            placeholder="Email" 
            name="email" 
            type="email" 
            onChange={event => handleEvent(event)}
          />
        </FormItemContainer>

        {initialData.techs && 
        <FormItemContainer>
          <label>Techs</label>
          <Select 
            name="techs"
            options={options} 
            onChange={optionselected => setUserInfo(prevState => 
              ({ ...prevState, techs: optionselected.value }))
            }
          />
        </FormItemContainer>
        } 

        <ButtonSubmit type="submit">REGISTER</ButtonSubmit>
      </Form>
    </Container>
  )
}