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
        toast.success("Employee successfully updated!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      props.toggle(); // Modalı kapat
      window.location.reload(); // Sayfayı yenile
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
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "10px" }}>
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name:</Label>
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
            <Label for="phone">Phone:</Label>
            <Input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address:</Label>
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
            <Label for="position">Position:</Label>
            <Input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="salary">Salary:</Label>
            <Input
              type="text"
              name="salary"
              value={form.salary}
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UpdateModal;
