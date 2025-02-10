import { AppDataSource } from "../../db/src/data-source";
import { Employee } from "../../db/src/entity/Employee";

const editEmployee = async (
  firstName: string,
  lastName: string,
  email: string,
  phone: string
) => {
  const employeeRepo = AppDataSource.getRepository(Employee);
  const thisEmployee = await employeeRepo.findOneBy({ email: email });
  if (!thisEmployee) {
    throw new Error("Employee not found");
  }

  thisEmployee.firstName = firstName;
  thisEmployee.lastName = lastName;
  thisEmployee.phone = phone;

  const savedEmployee = await AppDataSource.manager.save(thisEmployee);
  if (!savedEmployee) {
    throw new Error("Error saving new employee");
  }
  return savedEmployee;
};

export default editEmployee;
