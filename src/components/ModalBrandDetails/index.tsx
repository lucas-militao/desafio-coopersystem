import React from "react";
import { Modal } from "react-bootstrap";

interface BrandProps {
  nome: string;
  origem: string;
}

interface Props {
  brand: BrandProps;
  showModal: boolean;
  hideModal: () => void;
}

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
        <h3>{brand.nome}</h3>
        <p><strong>Origem:</strong> {brand.origem}</p>
      </Modal.Body>
    </Modal>
  );
}