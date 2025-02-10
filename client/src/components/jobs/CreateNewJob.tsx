import { useState, useEffect } from "react";
import axios from "axios";
import { Employee } from "../../../types";
import { Customer } from "../../../types";

const CreateNewJob = () => {
  const [formData, setFormData] = useState({
    customerId: 0,
    assigneeId: 0,
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/create-job", formData);
      setFormData({
        customerId: 0,
        assigneeId: 0,
      });
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };
  return (
    <div className="form-container">
      <h2 className="form-title">Create New Job</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Customer:
          <select
            name="customerId"
            value={formData.customerId}
            onChange={(e) =>
              setFormData({ ...formData, customerId: Number(e.target.value) })
            }
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer, i) => (
              <option key={i} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Assignee:
          <select
            name="assigneeId"
            value={formData.assigneeId}
            onChange={(e) =>
              setFormData({ ...formData, assigneeId: Number(e.target.value) })
            }
            required
          >
            <option value="">Select Assignee</option>
            {employees.map((employee, i) => (
              <option key={i} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateNewJob;
