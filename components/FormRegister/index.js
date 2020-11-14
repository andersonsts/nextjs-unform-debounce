import { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import * as _ from 'lodash.debounce';
import * as Yup from 'yup';

import Input from '../Input';
import Select from '../Select';
import { 
  ButtonSubmit,
  Container,
  FormItemContainer,
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

      // if(data.name === 'anderson') {
      //   formRef.current.setErrors({
      //     name: 'O nome Anderson não pode...'
      //   })
      //   return;
      // }

      handleValueData(data)
    } catch (err) {
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
    setUserInfo(prevState => ({ 
      ...prevState, 
      [event.target.name]: event.target.value 
    }))
  }, 500), [])

  return (
    <Container>
      <Title>UNFORM</Title>

      {initialData.techs 
      ? <> <Form onSubmit={handleSubmit} ref={formRef} initialData={initialData}>
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

            <FormItemContainer>
              <label>Techs</label>
              <Select 
                name="techs"
                options={options}
              />
            </FormItemContainer>

            <ButtonSubmit type="submit">REGISTER</ButtonSubmit>
           </Form>

          <button 
            type="button" 
            onClick={() => formRef.current.setErrors({ name: 'Erro manual no name' })}
          >
            CLIQUE PARA SETAR UM ERRO MANUAL 
          </button>

          <button 
            type="button" 
            onClick={() => formRef.current.setErrors({ })}
          >
            CLIQUE PARA LIMPAR OS ERROS MANUALMENTE 
          </button>
        </>
      : <h1>Carregando o unform...</h1>}  
    </Container>
  )
}