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

interface FormData {
  nome: string;
  origem: string;
}

interface BrandProps {
  id: string;
  nome: string;
  origem: string;
}

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
        await api.put(`/marcas/${brandEditing.id}`, {
          id: brandEditing.id,
          ...formData
        });
        history.location.state = null;
        history.push('/marcas');
        setIsEditing(false);
      }
      else {
        await api.post('/marcas', {
          id: uuid(),
          ...formData
        })
        
        history.push('/marcas');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancel() {
    setIsEditing(false)
    setBrandEditing({} as BrandProps);
    history.location.state = null;
    history.push('/marcas');
  }

  useEffect(() => {
    function updateBrandInfo() {
      const brand = history.location.state as BrandProps;
      if (!!brand) {
        setIsEditing(true);
        setBrandEditing(brand);

        setValue('nome', brand.nome);
        setValue('origem', brand.origem);
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
            name="nome"
            control={control}
            type="text"
          />
          <Input
            title="Origem"
            name="origem"
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