import React from "react";
import { Button, Table } from "react-bootstrap";
import { Props } from "./types";

import {
  Container
} from './style';

export function CarList({
  data,
  removeItem,
  editItem,
  showCarDetails
}: Props) {

  return(
    <Container>
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Origem</th>
            <th>Ano</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {  
            data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.origin}</td>
                  <td>{new Date(item.year).getFullYear()}</td>
                  <td>
                    <Button 
                      variant="primary"
                      onClick={() => {showCarDetails(item.id)}}
                    >
                      Detalhes
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => editItem(item.id)}
                    >
                        Editar
                    </Button>
                  </td>
                  <td>
                    <Button 
                      variant="secondary"
                      onClick={() => removeItem(item.id)}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Container>
  )
}