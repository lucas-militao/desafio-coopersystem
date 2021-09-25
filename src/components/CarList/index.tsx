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
  removeItem(id: string): Promise<void>;
}

export function CarList({
  data,
  removeItem
}: Props) {

  return(
    <Container>
      <Table striped bordered responsive="md">
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
                  <td>{index}</td>
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