import { User } from "../../db/src/entity/User";
import { AppDataSource } from "../../db/src/data-source";
import { Employee } from "../../db/src/entity/Employee";

const createNewEmployee = async (
  firstName: string,
  lastName: string,
  dob: Date,
  companyId: number,
  email: string,
  phone: string
) => {
  const userRepo = AppDataSource.getRepository(User);
  const thisCompany = await userRepo.findOne({
    where: { id: companyId },
    relations: ["employees"],
  });
  if (!thisCompany) {
    throw new Error(`No company found`);
  }

  const employeeRepo = AppDataSource.getRepository(Employee);
  const existingEmployee = await employeeRepo.findOne({
    where: { email: email, company: { id: companyId } },
  });
  if (existingEmployee) {
    throw new Error("Employee with this email already exists");
  }

  const newEmployee = new Employee();
  newEmployee.firstName = firstName;
  newEmployee.lastName = lastName;
  newEmployee.dob = dob;
  newEmployee.company = thisCompany;
  newEmployee.jobs = [];
  newEmployee.email = email;
  newEmployee.phone = phone;

  const savedEmployee = await AppDataSource.manager.save(newEmployee);
  if (!savedEmployee) {
    throw new Error("Error creating new user");
  }
  return savedEmployee;
};

export default createNewEmployee;
