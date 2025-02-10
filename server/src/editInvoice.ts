import { AppDataSource } from "../../db/src/data-source";
import { Job } from "../../db/src/entity/Job";
import { Estimate } from "../../db/src/entity/Estimate";
import { Invoice } from "../../db/src/entity/Invoice";
import { Customer } from "../../db/src/entity/Customer";
import { User } from "../../db/src/entity/User";

import { In } from "typeorm";

import { checkIdArray } from "./helpers/checkIdArray";

const editInvoice = async (
  invoiceId: number,
  customerId: number,
  vendorId: number,
  estimateIds: number[],
  jobId: number,
  isPaid: boolean
) => {
  const invoiceRepo = AppDataSource.getRepository(Invoice);
  const thisInvoice = await invoiceRepo.findOneBy({ id: invoiceId });
  if (!thisInvoice) {
    throw new Error(`Invoice ID ${invoiceId} not found`);
  }

  const vendorRepo = AppDataSource.getRepository(User);
  const thisVendor = await vendorRepo.findOneBy({ id: vendorId });
  if (!thisVendor) {
    throw new Error(`Vendor ID ${vendorId} not found`);
  }

  const estimateRepo = AppDataSource.getRepository(Estimate);
  const theseEstimates = await estimateRepo.find({
    // This is an internal TypeORM error. Current TypeORM ticket open to fix. Alternative solution would be to downgrade to an earlier version of TypeORM
    // @ts-ignore
    where: { id: In(estimateIds) },
  });
  if (theseEstimates.length === 0) {
    console.log(`No estimates found`);
  }
  const estimateIdsNotFound = checkIdArray(theseEstimates, estimateIds);
  if (estimateIdsNotFound.length > 0) {
    console.log(`Estimate IDs not found: ${estimateIdsNotFound.join(", ")}`);
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

  thisInvoice.customer = thisCustomer;
  thisInvoice.user = thisVendor;
  thisInvoice.estimates = theseEstimates;
  thisInvoice.job = thisJob;
  thisInvoice.date = new Date(Date.now());
  thisInvoice.isPaid = isPaid;

  const savedInvoice = await AppDataSource.manager.save(thisInvoice);
  if (!savedInvoice) {
    throw new Error("Error saving new job");
  }
  return savedInvoice;
};

export default editInvoice;
