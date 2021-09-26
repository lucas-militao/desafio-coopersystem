import React from "react";
import { Modal } from "react-bootstrap";

import {
  Container
} from './styles';

interface CarProps {
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
  car: CarProps;
  showModal: boolean;
  hideModal: () => void;
}

export function ModalCarDetails({
  car,
  showModal = false,
  hideModal
}: Props) {

  return(
    <Modal
      show={showModal}
      onHide={hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Detalhes do automóvel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>{car.nome}</h3>
        <p><strong>Quilômetros por galão:</strong> ${car.km_por_galao}</p>
        <p><strong>Cilindros:</strong> ${car.cilindros}</p>
        <p><strong>Cavalos de força:</strong> ${car.cavalos_de_forca}</p>
        <p><strong>Peso:</strong> ${car.peso}</p>
        <p><strong>Aceleração:</strong> ${car.aceleracao}</p>
        <p><strong>Ano do automóvel:</strong> ${car.ano}</p>
        <p><strong>Origem:</strong> ${car.origem}</p>
      </Modal.Body>
    </Modal>
  );
}