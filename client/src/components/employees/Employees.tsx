import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Employee } from "../../../../db/src/entity/Employee";
import EmployeeCard from "./EmployeeCard";

const Employees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const result = await axios.get("http://localhost:5000employees");
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
