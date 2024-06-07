import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateModal from "../Forms/CreateModal";
import UpdateModal from "../Forms/UpdateModal";

function ModalForm(props) {
  const [modal, setModal] = useState(false);

  // Modal'ı açma fonksiyonu
  const openModal = () => {
    setModal(true);
  };

  // Modal'ı kapatma fonksiyonu
  const closeModal = () => {
    setModal(false);
  };

  const closeBtn = (
    <button className="close" onClick={closeModal}>
      &times;
    </button>
  );

  const label = props.buttonLabel;
  let button = "";
  let title = "";

  if (label === "Düzenle") {
    button = (
      <Button
        color="warning"
        onClick={openModal}
        style={{ float: "left", marginRight: "10px" }}
      >
        {label}
      </Button>
    );
    title = "Edit Item";
  } else {
    button = (
      <Button
        color="success"
        onClick={openModal}
        style={{ float: "right", marginRight: "10px" }}
      >
        {label}
      </Button>
    );
    title = "Add New Item";
  }

  const handleSubmit = async (formData) => {
    try {
      if (props.item) {
        await props.onSubmit(formData);
      } else {
        await props.onSubmit(formData);
      }
      closeModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      {button}
      <Modal
        isOpen={modal}
        toggle={closeModal}
        className={props.className}
        backdrop={"static"}
        keyboard={false}
      >
        <ModalHeader toggle={closeModal} close={closeBtn}>
          {title}
        </ModalHeader>
        <ModalBody>
          {label === "Düzenle" ? (
            <UpdateModal
              onSubmit={handleSubmit}
              toggle={closeModal}
              item={props.item}
            />
          ) : (
            <CreateModal onSubmit={handleSubmit} toggle={closeModal} />
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalForm;
