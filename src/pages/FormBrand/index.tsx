import React, { useEffect, useState } from "react";
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
import { BrandProps } from "../../interfaces/types";
import { FormData } from "./types";

export function FormBrand() {
  const {
    control,
    setValue,
    handleSubmit
  } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [brandEditing, setBrandEditing] = useState<BrandProps>({} as BrandProps);

  const history = useHistory();

  async function handleRegisterBrand(formData: FormData) {
    try {
      if (isEditing) {
        await api.put(`/brands/${brandEditing.id}`, {
          id: brandEditing.id,
          ...formData
        });
        history.location.state = null;
        history.push('/brands');
        setIsEditing(false);
      }
      else {
        await api.post('/brands', {
          id: uuid(),
          ...formData
        })
        
        history.push('/brands');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancel() {
    setIsEditing(false)
    setBrandEditing({} as BrandProps);
    history.location.state = null;
    history.push('/brands');
  }

  useEffect(() => {
    function updateBrandInfo() {
      const brand = history.location.state as BrandProps;
      if (!!brand) {
        setIsEditing(true);
        setBrandEditing(brand);

        setValue('name', brand.name);
        setValue('origin', brand.origin);
      }
    }

    updateBrandInfo();
  })

  return (
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
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  )
}