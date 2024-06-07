import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ConfirmDeleteModal = ({ isOpen, toggle, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Onay</ModalHeader>
      <ModalBody>
        Bu Çalışanı sistemden silmek istediğinize emin misiniz?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Hayır
        </Button>
        <Button color="danger" onClick={onConfirm}>
          Evet
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmDeleteModal;
