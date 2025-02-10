import { Job } from "../../db/src/entity/Job";
import { AppDataSource } from "../../db/src/data-source";
import { Estimate, StatusType } from "../../db/src/entity/Estimate";
import { Customer } from "../../db/src/entity/Customer";

/* 
StatusType = "Pending" | "Approved" | "Declined"
*/

const createNewEstimate = async (
  customerId: number,
  lineItems: { name: string; price: number }[],
  status: StatusType,
  jobId: number
) => {
  const userRepo = AppDataSource.getRepository(Customer);
  const thisCustomer = await userRepo.findOneBy({ id: customerId });
  if (!thisCustomer) {
    throw new Error(`Customer with ID ${customerId} not found`);
  }

  const jobRepo = AppDataSource.getRepository(Job);
  const thisJob = await jobRepo.findOneBy({ id: jobId });
  if (!thisJob) {
    throw new Error(`Job ID ${jobId} not found`);
  }

  const newEstimate = new Estimate();
  newEstimate.customer = thisCustomer;
  newEstimate.date = new Date(Date.now());
  newEstimate.job = thisJob;
  newEstimate.lineItems = lineItems;
  newEstimate.status = status;

  const savedEstimate = await AppDataSource.manager.save(newEstimate);
  if (!savedEstimate) {
    throw new Error("Error saving new job");
  }
  return savedEstimate;
};

export default createNewEstimate;
