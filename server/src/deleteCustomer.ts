import { Customer } from "../../db/src/entity/Customer";
import { AppDataSource } from "../../db/src/data-source";

const deleteCustomer = async (customerId: number) => {
  const customerRepo = AppDataSource.getRepository(Customer);
  const thisCustomer = await customerRepo.findOneBy({ id: customerId });
  if (!thisCustomer) {
    throw new Error(`Employee with ID ${customerId} not found`);
  }

  const { affected } = await AppDataSource.manager.delete(
    Customer,
    thisCustomer
  );
  if (!affected || affected === 0) {
    throw new Error("Error deleting Customer");
  }
  return thisCustomer;
};

export default deleteCustomer;
