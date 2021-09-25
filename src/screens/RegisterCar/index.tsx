import React, { useState } from "react";

import { uuid } from 'uuidv4';
import { useForm } from 'react-hook-form';

import { Input } from '../../components/Form/Input';

import { 
  Form,
  Button
} from "react-bootstrap";

import {
  Container,
  InputsContainer,
} from './styles';
import api from "../../services/api";

interface FormData {
  nome: string;
  km_por_galao: number;
  cilindros: number;
  cavalor_de_forca: number;
  peso: number;
  aceleracao: number;
  ano: string;
  origem: string;
}

export function RegisterCar() {
   const {
     control,
     handleSubmit
   } = useForm();

  async function handleRegisterCar(formData: FormData) {
    try {
      await api.post('/carros', {
        id: uuid(),
        ...formData
      });
    } catch (error) {
      console.log(error);
    }
  }

  return(
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
            title="Quilômetros por galão"
            name="km_por_galao"
            control={control}
            type="number"
          />
          <Input
            title="Quantidade de cilindros"
            name="cilindros"
            control={control}
            type="number"
          />
          <Input
            title="Quantidade de cavalos de força"
            name="cavalos_de_forca"
            control={control}
            type="number"
          />
          <Input
            title="Peso do carro"
            name="peso"
            control={control}
            type="number"
          />
          <Input
            title="Aceleração"
            name="aceleracao"
            control={control}
            type="number"
          />
          <Input
            title="Ano do carro"
            name="ano"
            control={control}
            type="date"
          />
          <Input
            title="Origem"
            name="origem"
            control={control}
            type="text"
            placeholder="Digite o nome do carro"
          />
        </InputsContainer>
    
        <Button 
          variant="primary"
          onClick={handleSubmit(handleRegisterCar)}
        >
          Salvar
        </Button>
      </Form>
    </Container>
  );
}