import React from "react";
import { Form } from "react-bootstrap";

import {
  Container,
  InputsContainer,
  Input
} from './styles';

export function RegisterCar() {

  return(
    <Container>
      <Form>
        <InputsContainer>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Digite o nome do carro"
            />
          </Form.Group>
        </InputsContainer>
      </Form>
    </Container>
  );
}