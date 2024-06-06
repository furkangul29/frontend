import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import UpdateModal from "../Forms/UpdateModal";

function ModalForm(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );
  const label = props.buttonLabel;

  let button = "";
  let title = "";

  if (label === "Edit") {
    button = (
      <Button
        color="warning"
        onClick={toggle}
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
        onClick={toggle}
        style={{ float: "left", marginRight: "10px" }}
      >
        {label}
      </Button>
    );
    title = "Add New Item";
  }

  const handleSubmit = async (formData) => {
    try {
      if (props.item) {
        await axios.put(
          `http://localhost:5000/api/employee/${props.item.id}`,
          formData
        );
        props.updateState(formData);
      } else {
        await axios.post("http://localhost:5000/api/employee", formData);
        props.addItemToState(formData);
      }
      toggle();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      {button}
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={props.className}
        backdrop={"static"}
        keyboard={false}
      >
        <ModalHeader toggle={toggle} close={closeBtn}>
          {title}
        </ModalHeader>
        <ModalBody>
          <UpdateModal
            onSubmit={handleSubmit}
            toggle={toggle}
            item={props.item}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalForm;
