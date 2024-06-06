import React, { useEffect, useState } from "react";
import axios from "axios";
import "flowbite";
import EditModal from "./EditModal"; // EditModal bileşenini içe aktarın

function Home() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getAll-employee"
        );
        if (Array.isArray(response.data)) {
          setEmployees(response.data);
        } else if (Array.isArray(response.data.data)) {
          setEmployees(response.data.data);
        } else {
          console.error("API response is not an array");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = async (employee) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:5000/api/employee/${employee._id}`
        );
        setEmployees(employees.filter((e) => e._id !== employee._id));
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleSubmitModal = async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/update-employee/${selectedEmployee._id}`,
        formData
      );
      setEmployees(
        employees.map((employee) =>
          employee._id === selectedEmployee._id ? response.data : employee
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              TC
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Salary
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr
              key={employee._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{employee.name}</td>
              <td className="px-6 py-4">{employee.lastName}</td>
              <td className="px-6 py-4">{employee.phone}</td>
              <td className="px-6 py-4">{employee.tc}</td>
              <td className="px-6 py-4">{employee.address}</td>
              <td className="px-6 py-4">{employee.position}</td>
              <td className="px-6 py-4">{employee.salary}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(employee)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee)}
                  className="text-red-600 hover:text-red-900 ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          employee={selectedEmployee}
          onSubmit={handleSubmitModal}
        />
      )}
    </div>
  );
}

export default Home;
