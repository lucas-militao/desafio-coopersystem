import React, { InputHTMLAttributes } from "react";

import { Control, Controller } from "react-hook-form";

import { 
  Form, 
  FormControl, 
  FormControlProps 
} from "react-bootstrap";

import {
  Container
} from './styles';

interface Props extends FormControlProps{
  control: Control;
  name: string;
  title?: string;
}

export function Input({
  control,
  name,
  title,
  ...rest
}: Props) {

  return(
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Form.Group>
            <Form.Label>{title}</Form.Label>
            <Form.Control
              name={name}
              onChange={onChange}
              value={value}
              autocomplete="off"
              {...rest}
            />
            <FormControl.Feedback>
              
            </FormControl.Feedback>
          </Form.Group>
        )}
      />
    </Container>
  )
}