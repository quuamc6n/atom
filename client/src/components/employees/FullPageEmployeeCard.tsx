import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Employee } from "../../../types";

const FullPageEmployeeCard = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee>();

  useEffect(() => {
    const fetchSingleEmployee = async () => {
      const result = await axios.get(
        `https://b9d6-2001-56a-7d53-8a00-301b-d8fd-39e8-56ac.ngrok-free.app/employees/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const fetchedEmployee = result.data;
      setEmployee(fetchedEmployee);
    };
    fetchSingleEmployee();
  }, [id]);

  return (
    <div className="card-container-large">
      {!employee ? (
        <p>Employee not found</p>
      ) : (
        <div className="card-large">
          <h1 className="card-id">{`Employee #${employee.id}`}</h1>
          <p>
            <span className="card-category">Firstname:</span>{" "}
            {`${employee.firstName}`}
          </p>
          <p>
            <span className="card-category">DOB: </span>
            {`${employee.dob}`}
          </p>
          {/* <p>{new Date(employee.date).toDateString()}</p> */}
        </div>
      )}
    </div>
  );
};

export default FullPageEmployeeCard;
