import React from "react";

import { Controller } from "react-hook-form";

import { 
  Form, 
  FormControl 
} from "react-bootstrap";

import {
  Container
} from './styles';
import { Props } from "./types";

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