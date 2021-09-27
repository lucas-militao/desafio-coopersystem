import React from "react";
import { Modal } from "react-bootstrap";
import { Props } from "./types";

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
        <h3>{car.name}</h3>
        <p><strong>Quilômetros por galão:</strong> {car.km_per_gallon}</p>
        <p><strong>Cilindros:</strong> {car.cylinders}</p>
        <p><strong>Cavalos de força:</strong> {car.horsepower}</p>
        <p><strong>Peso:</strong> {car.weight}</p>
        <p><strong>Aceleração:</strong> {car.acceleration}</p>
        <p><strong>Ano do automóvel:</strong> {new Date(car.year).getFullYear() + 1}</p>
        <p><strong>Origem:</strong> {car.origin}</p>
      </Modal.Body>
    </Modal>
  );
}