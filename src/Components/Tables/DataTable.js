import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../Modals/Modal";
import axios from "axios";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";

function DataTable() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/getAll-employee"
      );
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);
    if (employeeToDelete) {
      try {
        await axios.delete(
          `http://localhost:5000/api/delete-employee/${employeeToDelete}`
        );
        setEmployees(
          employees.filter((employee) => employee._id !== employeeToDelete)
        );
        setEmployeeToDelete(null);
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    } else {
      console.error("Employee ID is null or undefined");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmployeeToDelete(null);
  };

  return (
    <div className="text-center">
      {" "}
      {/* Div eklendi ve className ile ortalamak için gerekli stil uygulandı */}
      <h1 className="my-4 text-3xl font-bold">
        Çalışan Bilgi Yönetim Sistemi
      </h1>{" "}
      {/* Başlık eklendi */}
      <Table responsive hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>TC</th>
            <th>Address</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td className="px-6 py-4">{employee.name}</td>
              <td className="px-6 py-4">{employee.lastName}</td>
              <td className="px-6 py-4">{employee.phone}</td>
              <td className="px-6 py-4">{employee.tc}</td>
              <td className="px-6 py-4">{employee.address}</td>
              <td className="px-6 py-4">{employee.position}</td>
              <td className="px-6 py-4">{employee.salary}</td>
              <td className="px-6 py-4">
                <div className="flex justify-center space-x-4">
                  <ModalForm
                    buttonLabel="Edit"
                    item={employee}
                    fetchEmployees={fetchEmployees}
                  />
                  <Button
                    color="danger"
                    onClick={() => handleDeleteClick(employee._id)}
                  >
                    Del
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmDeleteModal
        isOpen={showModal}
        toggle={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default DataTable;
