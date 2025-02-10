import { AppDataSource } from "../../db/src/data-source";
import { Job } from "../../db/src/entity/Job";
import { Estimate, StatusType } from "../../db/src/entity/Estimate";
import { Invoice } from "../../db/src/entity/Invoice";
import { Customer } from "../../db/src/entity/Customer";

import { In } from "typeorm";

import { checkIdArray } from "./helpers/checkIdArray";

// StatusType = "Pending" | "Approved" | "Declined"

const editEstimate = async (
  estimateId: number,
  customerId: number,
  lineItems: { name: string; price: number }[],
  status: StatusType,
  jobId: number,
  invoiceIds: number[]
) => {
  const estimateRepo = AppDataSource.getRepository(Estimate);
  const thisEstimate = await estimateRepo.findOneBy({ id: estimateId });
  if (!thisEstimate) {
    throw new Error(`Estimate with ID ${estimateId} not found`);
  }

  const jobRepo = AppDataSource.getRepository(Job);
  const thisJob = await jobRepo.findOneBy({ id: jobId });
  if (!thisJob) {
    throw new Error(`Job with ID ${jobId} not found`);
  }

  const customerRepo = AppDataSource.getRepository(Customer);
  const thisCustomer = await customerRepo.findOneBy({ id: customerId });
  if (!thisCustomer) {
    throw new Error(`Customer with ID ${customerId} not found`);
  }

  const invoiceRepo = AppDataSource.getRepository(Invoice);
  const theseInvoices = await invoiceRepo.find({
    // This is an internal TypeORM error. Current TypeORM ticket open to fix. Alternative solution would be to downgrade to an earlier version of TypeORM
    // @ts-ignore
    where: { id: In(invoiceIds) },
  });
  if (theseInvoices.length === 0) {
    console.log(`No invoices found`);
  }

  const idsNotFound = checkIdArray(theseInvoices, invoiceIds);
  if (idsNotFound.length > 0) {
    throw new Error(`Ids not found: ${idsNotFound.join(", ")}`);
  }

  thisEstimate.customer = thisCustomer;
  thisEstimate.lineItems = lineItems;
  thisEstimate.status = status;
  thisEstimate.job = thisJob;
  thisEstimate.invoices = theseInvoices;

  const savedEstimate = await AppDataSource.manager.save(thisEstimate);
  if (!savedEstimate) {
    throw new Error("Error saving new job");
  }
  return savedEstimate;
};

export default editEstimate;
