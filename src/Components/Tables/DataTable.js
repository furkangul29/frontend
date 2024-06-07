import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import CreateModal from "../Forms/CreateModal";
import ModalForm from "../Modals/Modal";
import axios from "axios";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";

function DataTable() {
  const [employees, setEmployees] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  const toggleCreateModal = () => setShowCreateModal(!showCreateModal);
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
    toggleDeleteModal();
  };

  const handleConfirmDelete = async () => {
    toggleDeleteModal();
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
    }
  };

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((employee) =>
        employee._id === updatedEmployee._id ? updatedEmployee : employee
      )
    );
  };

  return (
    <div className="text-center">
      <h1 className="my-4 text-3xl font-bold">Çalışan Bilgi Yönetim Sistemi</h1>
      <div className="text-right mb-4">
        <Button color="success" onClick={toggleCreateModal}>
          Yeni Çalışan Ekle
        </Button>
      </div>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Telefon</th>
            <th>TC</th>
            <th>Adres</th>
            <th>Görev</th>
            <th>Maaş</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee?._id}>
              <td className="px-6 py-4">{employee?.name}</td>
              <td className="px-6 py-4">{employee?.lastName}</td>
              <td className="px-6 py-4">{employee?.phone}</td>
              <td className="px-6 py-4">{employee?.tc}</td>
              <td className="px-6 py-4">{employee?.address}</td>
              <td className="px-6 py-4">{employee?.position}</td>
              <td className="px-6 py-4">{employee?.salary}</td>
              <td className="px-6 py-4">
                <div className="flex justify-center space-x-4">
                  <ModalForm
                    buttonLabel="Düzenle"
                    item={employee}
                    onSubmit={handleUpdateEmployee}
                  />
                  <Button
                    color="danger"
                    onClick={() => handleDeleteClick(employee?._id)}
                  >
                    Sil
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateModal
        buttonLabel="Yeni Çalışan Ekle"
        isOpen={showCreateModal}
        toggle={toggleCreateModal} // toggle özelliği doğru bir şekilde iletiliyor
        updateState={handleAddEmployee}
      />

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        toggle={toggleDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default DataTable;
