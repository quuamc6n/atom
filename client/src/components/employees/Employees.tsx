import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Employee } from "../../../types";
import EmployeeCard from "./EmployeeCard";

const Employees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const result = await axios.get(
        "https://b9d6-2001-56a-7d53-8a00-301b-d8fd-39e8-56ac.ngrok-free.app/employees"
      );
      setEmployees(result.data);
    };
    fetchEmployees();
  }, []);

  const handleEmployeePage = (id: number) => {
    navigate(`./${id}`);
  };

  return (
    <div>
      {" "}
      <h1 className="card-title">My Employees</h1>
      <div className="card-container">
        {employees &&
          employees?.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onClick={() => handleEmployeePage(employee.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Employees;
