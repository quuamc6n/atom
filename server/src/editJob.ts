import { AppDataSource } from "../../db/src/data-source";
import { Job } from "../../db/src/entity/Job";
import { User } from "../../db/src/entity/User";
import { Estimate } from "../../db/src/entity/Estimate";
import { Invoice } from "../../db/src/entity/Invoice";
import { Employee } from "../../db/src/entity/Employee";
import { In } from "typeorm";
import { Customer } from "../../db/src/entity/Customer";

const editJob = async (
  jobId: number,
  customerId: number,
  assigneeId: number,
  estimateIds: number[],
  invoiceIds: number[],
  isComplete: boolean
) => {
  const jobRepo = AppDataSource.getRepository(Job);
  const thisJob = await jobRepo.findOneBy({ id: jobId });
  if (!thisJob) {
    throw new Error(`Job with ID ${jobId} not found`);
  }

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

  const estimateRepo = AppDataSource.getRepository(Estimate);
  const theseEstimates = await estimateRepo.find({
    // This is an internal TypeORM error. Current TypeORM ticket open to fix. Alternative solution would be to downgrade to an earlier version of TypeORM
    // @ts-ignore
    where: {
      id: In(estimateIds),
    },
  });
  if (!theseEstimates) {
    throw new Error(`Estimate with ID ${estimateIds} not found`);
  }
  const invoiceRepo = AppDataSource.getRepository(Invoice);
  const theseInvoices = await invoiceRepo.find({
    // This is an internal TypeORM error. Current TypeORM ticket open to fix. Alternative solution would be to downgrade to an earlier version of TypeORM
    // @ts-ignore
    where: {
      id: In(invoiceIds),
    },
  });
  if (!theseInvoices) {
    throw new Error(`Invoice with ID ${invoiceIds} not found`);
  }

  thisJob.customer = thisCustomer;
  thisJob.assignee = thisAssignee;
  thisJob.estimates = theseEstimates;
  thisJob.invoices = theseInvoices;
  thisJob.isComplete = isComplete;
  const savedJob = await AppDataSource.manager.save(thisJob);
  if (!savedJob) {
    throw new Error("Error saving new job");
  }
  return savedJob;
};

export default editJob;
