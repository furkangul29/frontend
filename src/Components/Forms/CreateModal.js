import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateModal(props) {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    phone: "",
    address: "",
    position: "",
    salary: "",
    tc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/create-employee",
        form
      );
      if (props.updateState) {
        props.updateState(response.data.updatedEmployee);
        toast.success("Çalışan Sisteme Başarı İle Eklendi", {});
      }
      props.toggle();
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while creating the employee.");
    }
  };

  useEffect(() => {
    if (props.item) {
      const { name, lastName, phone, address, position, salary, tc } =
        props.item;
      setForm({ name, lastName, phone, address, position, salary, tc });
    }
  }, [props.item]);

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Yeni Çalışan Ekle</ModalHeader>
      <ModalBody>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "1000px",
          }}
        >
          <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
            <div style={{ marginBottom: "10px" }}>
              <FormGroup>
                <Label for="name">Ad:</Label>
                <Input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Soyad:</Label>
                <Input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <FormGroup>
                <Label for="phone">Telefon:</Label>
                <Input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="tc">TC:</Label>
                <Input
                  type="text"
                  name="tc"
                  value={form.tc}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="address">Adres:</Label>
                <Input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <FormGroup>
                <Label for="position">Görev:</Label>
                <Input
                  type="text"
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="salary">Maaş:</Label>
                <Input
                  type="text"
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button type="submit">Kaydet</Button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </ModalBody>
    </Modal>
  );
}

export default CreateModal;
