import { AppDataSource } from "../../db/src/data-source";
import { Customer } from "../../db/src/entity/Customer";
import { Estimate } from "../../db/src/entity/Estimate";
import { Invoice } from "../../db/src/entity/Invoice";
import { Job } from "../../db/src/entity/Job";
import { checkIdArray } from "./helpers/checkIdArray";

import { In } from "typeorm";

const editCustomer = async (
  customerId: number,
  name: string,
  email: string,
  phone: string,
  jobIds: number[],
  invoiceIds: number[],
  estimateIds: number[]
) => {
  const customerRepo = AppDataSource.getRepository(Customer);
  const thisCustomer = await customerRepo.findOneBy({ id: customerId });
  if (!thisCustomer) {
    throw new Error("Customer not found");
  }

  const jobRepo = AppDataSource.getRepository(Job);
  // This is an internal TypeORM error. Current TypeORM ticket open to fix. Alternative solution would be to downgrade to an earlier version of TypeORM
  // @ts-ignore
  const theseJobs = await jobRepo.find({ where: { id: In(jobIds) } });
  if (theseJobs.length === 0) {
    console.log(`No jobs found`);
  }
  const jobIdsNotFound = checkIdArray(theseJobs, jobIds);
  if (jobIdsNotFound.length > 0) {
    console.log(`Job IDs not found: ${jobIdsNotFound.join(", ")}`);
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

  const invoiceIdsNotFound = checkIdArray(theseInvoices, invoiceIds);
  if (invoiceIdsNotFound.length > 0) {
    console.log(`Invoice IDs not found: ${invoiceIdsNotFound.join(", ")}`);
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

  thisCustomer.name = name;
  thisCustomer.email = email;
  thisCustomer.phone = phone;
  thisCustomer.jobs = theseJobs;
  thisCustomer.invoices = theseInvoices;
  thisCustomer.estimates = theseEstimates;

  const savedCustomer = await AppDataSource.manager.save(thisCustomer);
  if (!savedCustomer) {
    throw new Error("Error saving new customer");
  }
  return savedCustomer;
};

export default editCustomer;
