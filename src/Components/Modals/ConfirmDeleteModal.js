import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ConfirmDeleteModal = ({ isOpen, toggle, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
      <ModalBody>Are you sure you want to delete this employee?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          No
        </Button>
        <Button color="danger" onClick={onConfirm}>
          Yes
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmDeleteModal;
