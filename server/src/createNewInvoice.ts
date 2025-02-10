import { Job } from "../../db/src/entity/Job";
import { User } from "../../db/src/entity/User";
import { AppDataSource } from "../../db/src/data-source";
import { Estimate } from "../../db/src/entity/Estimate";
import { checkIdArray } from "./helpers/checkIdArray";
import { Invoice } from "../../db/src/entity/Invoice";
import { In } from "typeorm";
import { Customer } from "../../db/src/entity/Customer";

/* 
StatusType = "Pending" | "Approved" | "Declined"
*/

const createNewInvoice = async (
  customerId: number,
  estimateIds: number[],
  jobId: number,
  isPaid: boolean
) => {
  const customerRepo = AppDataSource.getRepository(Customer);
  const thisCustomer = await customerRepo.findOneBy({ id: customerId });
  if (!thisCustomer) {
    throw new Error(`Customer with ID ${customerId} not found`);
  }
  const userRepo = AppDataSource.getRepository(User);
  const thisVendor = await userRepo.findOneBy({ id: 1 });
  if (!thisVendor) {
    throw new Error(`Vendor with ID 1 not found`);
  }

  const jobRepo = AppDataSource.getRepository(Job);
  const thisJob = await jobRepo.findOneBy({ id: jobId });
  if (!thisJob) {
    throw new Error(`Job ID ${jobId} not found`);
  }

  const estimateRepo = AppDataSource.getRepository(Estimate);
  const theseEstimates = await estimateRepo.find({
    // This is an internal TypeORM error. Current TypeORM ticket open to fix. Alternative solution would be to downgrade to an earlier version of TypeORM
    // @ts-ignore
    where: { id: In(estimateIds) },
  });
  const idsNotFound = checkIdArray(theseEstimates, estimateIds);
  if (idsNotFound.length > 0) {
    console.log(`Estimate IDs not found: ${idsNotFound.join(", ")}`);
  }

  const newInvoice = new Invoice();
  newInvoice.customer = thisCustomer;
  newInvoice.user = thisVendor;
  newInvoice.estimates = theseEstimates;
  newInvoice.job = thisJob;
  newInvoice.isPaid = isPaid;
  newInvoice.date = new Date(Date.now());

  const savedInvoice = await AppDataSource.manager.save(newInvoice);
  if (!savedInvoice) {
    throw new Error("Error saving new job");
  }
  return savedInvoice;
};

export default createNewInvoice;

/*
{
    "customerId": "1",
    "vendorId": "1",
    "estimateIds": [1, 2],
    "jobId": "1",
    "isPaid": true
}
*/
