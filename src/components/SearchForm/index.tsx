import React, { useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";

import {
  Container
} from './styles';

type filterOptionsType = 'nome' | 'origem';

interface Props {
  filterList: (filterOption: filterOptionsType, filterSearchInput: string) => Promise<void> 
}

export function SearchForm({
  filterList
}: Props) {
  const [filterOption, setFilterOption] = useState<filterOptionsType>('nome');
  const [filterSearchInput, setFilterSearchInput] = useState('');
  
  return(
    <Container>
        <Row className="align-items-center">
          <Col>
            <Form.Group>
              <Form.Label>Filtro:</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Digite sua pesquisa"
                value={filterSearchInput}
                onChange={(e) => setFilterSearchInput(e.currentTarget.value)}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Check
              type="radio"
              label="Nome"
              name="filterOption"
              value="nome"
              onChange={e => setFilterOption(e.currentTarget.value as filterOptionsType)}
            />
            
            <Form.Check
              type="radio"
              label="Origem"
              name="filterOption"
              value="origem"
              onChange={e => setFilterOption(e.currentTarget.value as filterOptionsType)}
            />
          </Col>

          <Col>
            <Button onClick={() => filterList(filterOption, filterSearchInput)}>
              Filtrar
            </Button>
          </Col>
        </Row>
    </Container>
  );
}