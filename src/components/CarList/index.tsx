import React from "react";
import { Button, Table } from "react-bootstrap";

import {
  Container
} from './style';

interface CarProps {
  id: string;
  nome: string;
  km_por_galao: number;
  cilindros: number;
  cavalos_de_forca: number;
  peso: number;
  aceleracao: number;
  ano: string;
  origem: string;
}

interface Props {
  data: CarProps[];
  removeItem(id: string): Promise<void>;
  editItem(id: string): void;
  showCarDetails(id: string): void;
}

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
                  <td>{item.nome}</td>
                  <td>{item.origem}</td>
                  <td>{new Date(item.ano).getFullYear()}</td>
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