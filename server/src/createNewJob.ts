import { Job } from "../../db/src/entity/Job";
import { AppDataSource } from "../../db/src/data-source";
import { Employee } from "../../db/src/entity/Employee";
import { Customer } from "../../db/src/entity/Customer";

const createNewJob = async (customerId: number, assigneeId: number) => {
  const userRepo = AppDataSource.getRepository(Customer);
  const thisCustomer = await userRepo.findOneBy({ id: customerId });
  if (!thisCustomer) {
    throw new Error(`Customer with ID ${customerId} not found`);
  }

  const employeeRepo = AppDataSource.getRepository(Employee);
  const thisAssignee = await employeeRepo.findOneBy({ id: assigneeId });
  if (!thisAssignee) {
    throw new Error(`Assignee with ID ${assigneeId} not found`);
  }

  const newJob = new Job();
  newJob.date = new Date(Date.now());
  newJob.customer = thisCustomer;
  newJob.assignee = thisAssignee;
  newJob.isComplete = false;
  const savedJob = await AppDataSource.manager.save(newJob);
  if (!savedJob) {
    throw new Error("Error saving new job");
  }
  return savedJob;
};

export default createNewJob;
