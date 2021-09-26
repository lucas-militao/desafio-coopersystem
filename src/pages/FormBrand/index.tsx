import React from "react";
import { uuid } from 'uuidv4';

import { useForm } from "react-hook-form";

import { Form, Button } from "react-bootstrap";
import { Input } from "../../components/Form/Input";
import api from "../../services/api";

import {
  Container,
  InputsContainer,
} from './styles';
import { useHistory } from "react-router";

interface FormData {
  nome: string;
  origem: string;
}

export function FormBrand() {
  const {
    control,
    handleSubmit
  } = useForm();

  const history = useHistory();

  async function handleRegisterBrand(formData: FormData) {
    try {
      await api.post('/marcas', {
        id: uuid(),
        ...formData
      })
      
      history.push('/marcas');
    } catch (error) {
      
    }
  }

  return (
    <Container>
      <Form>
        <InputsContainer>
          <Input
            title="Nome"
            name="nome"
            control={control}
            type="text"
          />
          <Input
            title="Origem"
            name="origin"
            control={control}
            type="text"
          />
        </InputsContainer>
    
        <Button 
          variant="primary"
          style={{ marginRight: 8 }}
          onClick={handleSubmit(handleRegisterBrand)}
        >
          Salvar
        </Button>

        <Button 
          variant="secondary"
        >
          Cancel
        </Button>
      </Form>
    </Container>
  )
}