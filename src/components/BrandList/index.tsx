import React from "react";
import { Table, Button } from "react-bootstrap";

import {
  Container
} from './styles';

import { Props } from "./types";

export function BrandList({
  data,
  deleteItem,
  showItemDetails,
  editItem
}: Props) {

  return(
    <Container>
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Origem</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            data.map((item, index) => {
              return(
                <tr key={item.id}>
                  <td>{index}</td>
                  <td>{item.name}</td>
                  <td>{item.origin}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {showItemDetails(item.id)}}
                    >
                        Detalhes
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {editItem(item.id)}}
                    >
                        Editar
                    </Button>
                  </td>
                  <td>
                    <Button 
                      variant="secondary"
                      onClick={() => {deleteItem(item.id)}}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </Container>
  )
}