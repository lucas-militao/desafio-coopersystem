import React from "react";

import { Props } from "./types";

import { Button } from 'react-bootstrap';

export function ButtonSave({
  isLoading,
  onClick,
  ...rest
}: Props) {

  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      {...rest}
    >
      {isLoading ? 'Loading…' : 'Salvar'}
    </Button>
  );
}