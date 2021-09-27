import React, { useEffect, useState } from "react";

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
import { useHistory } from "react-router";
import { CarProps } from "../../interfaces/types";

interface FormData {
  nome: string;
  km_por_galao: number;
  cilindros: number;
  cavalos_de_forca: number;
  peso: number;
  aceleracao: number;
  ano: string;
  origem: string;
}

export function FormCar() {
  const {
    control,
    setValue,
    handleSubmit
  } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [carEditing, setCarEditing] = useState<CarProps>({} as CarProps);
  
  const history = useHistory();

  async function handleRegisterCar(formData: FormData) {
    try {
      if (isEditing) {
        await api.put(`/carros/${carEditing.id}`, {
          id: carEditing.id,
          ...formData
        });
        history.location.state = null;
        history.push('/');
      } 
      else {
        await api.post('/carros', {
          id: uuid(),
          ...formData
        });

        history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancelEditing() {
    setCarEditing({} as CarProps);
    setIsEditing(false);
    history.push('/carros');
  }

  useEffect(() => {
    function updateCarInfo() {
      const car = history.location.state as CarProps;
      if (!!car) {
        setIsEditing(true);
        setCarEditing(car);

        setValue('nome', car.nome);
        setValue('km_por_galao', car.km_por_galao);
        setValue('cilindros', car.cilindros);
        setValue('cavalos_de_forca', car.cavalos_de_forca);
        setValue('peso', car.peso);
        setValue('aceleracao', car.aceleracao);
        setValue('ano', car.ano);
        setValue('origem', car.origem);
      }
    }

    updateCarInfo();
  })

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
          style={{ marginRight: 8 }}
        >
          Salvar
        </Button>

        <Button 
          variant="secondary"
          onClick={handleCancelEditing}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
}