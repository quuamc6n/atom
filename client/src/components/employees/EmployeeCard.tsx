import { Employee } from "../../../../db/src/entity/Employee";

interface EmployeeCardProps {
  employee: Employee;
  onClick: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <p>
        {employee.firstName} {employee.lastName}
      </p>
      <p>{`employee #${employee.id}`}</p>
      <p>{`Date of birth: ${employee.dob}`}</p>
      <ul>
        {employee.jobs?.map((employee, i) => (
          <li key={i}>{`${employee.customer.name}`}</li>
        ))}
      </ul>
      {/* <p>{new Date(employee.date).toDateString()}</p> */}
    </div>
  );
};

export default EmployeeCard;
