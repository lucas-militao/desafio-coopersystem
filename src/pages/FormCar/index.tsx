import React, { useEffect, useState } from "react";
import { uuid } from 'uuidv4';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router";

import { 
  Form,
  Button
} from "react-bootstrap";

import {
  Container,
  InputsContainer,
} from './styles';
import api from "../../services/api";

import { Input } from '../../components/Form/Input';
import { CarProps } from "../../interfaces/types";
import { FormData } from "./types";
import { ButtonSave } from "../../components/Form/ButtonSave";

export function FormCar() {
  const {
    control,
    setValue,
    handleSubmit
  } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [carEditing, setCarEditing] = useState<CarProps>({} as CarProps);
  
  const history = useHistory();

  async function handleRegisterCar(formData: FormData) {
    try {
      setLoading(true);
      if (isEditing) {
        await api.put(`/cars/${carEditing.id}`, {
          id: carEditing.id,
          ...formData
        });
        history.location.state = null;
        history.push('/');
      } 
      else {
        await api.post('/cars', {
          id: uuid(),
          ...formData
        });

        history.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleCancelEditing() {
    setCarEditing({} as CarProps);
    setIsEditing(false);
    history.push('/');
  }

  useEffect(() => {
    function updateCarInfo() {
      const car = history.location.state as CarProps;
      if (!!car) {
        setIsEditing(true);
        setCarEditing(car);

        setValue('name', car.name);
        setValue('km_per_gallon', car.km_per_gallon);
        setValue('cylinders', car.cylinders);
        setValue('horsepower', car.horsepower);
        setValue('weight', car.weight);
        setValue('acceleration', car.acceleration);
        setValue('year', car.year);
        setValue('origin', car.origin);
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
            name="name"
            control={control}
            type="text"
          />
          <Input
            title="Quilômetros por galão"
            name="km_per_gallon"
            control={control}
            type="number"
          />
          <Input
            title="Quantidade de cilindros"
            name="cylinders"
            control={control}
            type="number"
          />
          <Input
            title="Quantidade de cavalos de força"
            name="horsepower"
            control={control}
            type="number"
          />
          <Input
            title="Peso do carro"
            name="weight"
            control={control}
            type="number"
          />
          <Input
            title="Aceleração"
            name="acceleration"
            control={control}
            type="number"
          />
          <Input
            title="Ano do carro"
            name="year"
            control={control}
            type="date"
          />
          <Input
            title="Origem"
            name="origin"
            control={control}
            type="text"
            placeholder="Digite o nome do carro"
          />
        </InputsContainer>
    
        <ButtonSave
          isLoading={isLoading}
          variant="primary"
          style={{ marginRight: 8 }}
          onClick={handleSubmit(handleRegisterCar)}
        />

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