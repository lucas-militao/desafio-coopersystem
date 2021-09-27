import React from "react";
import { Modal } from "react-bootstrap";
import { Props } from "./types";

export function ModalBrandDetails({
  brand,
  showModal,
  hideModal,
}: Props) {


  return(
    <Modal
      show={showModal}
      onHide={hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Detalhes da marca</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h3>{brand.name}</h3>
        <p><strong>Origem:</strong> {brand.origin}</p>
      </Modal.Body>
    </Modal>
  );
}