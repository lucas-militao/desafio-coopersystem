import React from "react";

import { Modal, Button } from "react-bootstrap";
import { Props } from "./types";

export function ModalConfirmDelete({
  showModal,
  hideModal,
  deleteItem,
}: Props) {

  return (
    <Modal
      show={showModal}
      onHide={hideModal}
    >
      <Modal.Header>
        <Modal.Title>Remover Item</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Tem certeza que deseja remover este item?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>Cancelar</Button>
        <Button variant="danger" onClick={deleteItem}>Remover</Button>
      </Modal.Footer>
    </Modal>
  );

}