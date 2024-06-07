import React, { useState, useEffect } from "react";
import { Button, Input, FormGroup, Label } from "reactstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateModal(props) {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    phone: "",
    address: "",
    position: "",
    salary: "",
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
      const response = await axios.put(
        `http://localhost:5000/api/update-employee/${props.item._id}`,
        form
      );
      if (props.updateState) {
        props.updateState(response.data.updatedEmployee);
        toast.success("Çalışan Başarı İle Güncellendi", {});
      }
      props.toggle();
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while updating the employee.");
    }
  };

  useEffect(() => {
    if (props.item) {
      const { name, lastName, phone, address, position, salary } = props.item;
      setForm({ name, lastName, phone, address, position, salary });
    }
  }, [props.item]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <form onSubmit={handleSubmit}>
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
        <ToastContainer position="top-right" autoClose={4000} theme="colored" />
      </div>
    </div>
  );
}

export default UpdateModal;
