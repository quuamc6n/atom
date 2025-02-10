import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Employee } from "../../../../db/src/entity/Employee";

const FullPageEmployeeCard = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee>();

  useEffect(() => {
    const fetchSingleEmployee = async () => {
      const result = await axios.get(`http://localhost:5000employees/${id}`);
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
