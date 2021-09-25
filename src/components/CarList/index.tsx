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
  cavalor_de_forca: number;
  peso: number;
  aceleracao: number;
  ano: string;
  origem: string;
}

interface Props {
  data: CarProps[];
}

export function CarList({
  data
}: Props) {

  return(
    <Container>
      <Table striped bordered responsive="md">
        <thead>
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Origem</th>
            <th>Ano</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {  
            data.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.origem}</td>
                  <td>{new Date(item.ano).getFullYear()}</td>
                  <td>
                    <Button
                      variant="primary">
                        Editar
                    </Button>
                  </td>
                  <td>
                    <Button 
                      variant="primary">
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