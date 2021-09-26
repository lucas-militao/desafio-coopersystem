import React, { FormEventHandler, useState } from "react";
import { Col, Form, Row, Button, InputGroup, FormControl, ButtonGroup, FormCheckProps } from "react-bootstrap";
import { useForm } from "react-hook-form";

import {
  SearchFormContainer
} from './styles';

interface RadioGroupProps {
  option: 'nome' | 'origem'
}

interface Props {
  filterList(nome: string, origem: string): Promise<void>
}

export function SearchForm({
  filterList
}: Props) {
  const {
    control,
    handleSubmit
  } = useForm();
  const [filterOption, setFilterOption] = useState('nome');

  const isRadioSelected = (value: string): boolean => filterOption === value;

  function handleRadioClick(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterOption(String(e.currentTarget.value));
    console.log(filterOption)
  };

  return(
    <Form>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInput" visuallyHidden>
            Filtro
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="inlineFormInput"
          />
        </Col>

        <Col xs="auto">
          <Form.Check 
            checked={isRadioSelected("nome")}
            onChange={e => handleRadioClick(e)}
            type="radio"
            id="radio-button-origem"
            label="Nome"
            value="nome"
            name="filter"
          />
          <div> </div>
          <Form.Check 
            checked={isRadioSelected("origem")}
            onChange={e => handleRadioClick(e)}
            type="radio"
            id="radio-button-origem"
            label="Origem"
            value="origem"
            name="filter"
          />
        </Col>

        <Col xs="auto">
          <Button className="mb-2">
            Filtrar
          </Button>
        </Col>

        
      </Row>
    </Form>
  );
}