import { Employee } from "../../db/src/entity/Employee";
import { AppDataSource } from "../../db/src/data-source";

const deleteEmployee = async (employeeId: number) => {
  const employeeRepo = AppDataSource.getRepository(Employee);
  const thisEmployee = await employeeRepo.findOneBy({ id: employeeId });
  if (!thisEmployee) {
    throw new Error(`Employee with ID ${employeeId} not found`);
  }

  const { affected } = await AppDataSource.manager.delete(
    Employee,
    thisEmployee
  );
  if (!affected || affected === 0) {
    throw new Error("Error deleting Employee");
  }
  return thisEmployee;
};

export default deleteEmployee;
