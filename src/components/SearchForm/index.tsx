import React, { useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { filterOptionsType } from "../../interfaces/types";

import {
  Container
} from './styles';

import { Props } from "./types";

export function SearchForm({
  filterList
}: Props) {
  const [filterOption, setFilterOption] = useState<filterOptionsType>('nome');
  const [filterSearchInput, setFilterSearchInput] = useState('');
  
  return(
    <Container>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={1}>Filtro:</Form.Label>
        <Col sm={8}>
          <Form.Control
            required
            type="text"
            placeholder="Digite sua pesquisa"
            value={filterSearchInput}
            onChange={(e) => setFilterSearchInput(e.currentTarget.value)}
          />
        </Col>
      </Form.Group>

      <Form.Check
        type="radio"
        label="Nome"
        name="filterOption"
        value="nome"
        onChange={e => setFilterOption(e.currentTarget.value as filterOptionsType)}
        defaultChecked
      />
          
      <Form.Check
        type="radio"
        label="Origem"
        name="filterOption"
        value="origem"
        onChange={e => setFilterOption(e.currentTarget.value as filterOptionsType)}
      />
      <br />
      <Button onClick={() => filterList(filterOption, filterSearchInput)}>
        Filtrar
      </Button>
    </Container>
  );
}