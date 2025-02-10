import { AppDataSource } from "../../db/src/data-source";
import { Customer } from "../../db/src/entity/Customer";
import { In } from "typeorm";
import { Job } from "../../db/src/entity/Job";
import { checkIdArray } from "./helpers/checkIdArray";
import { Invoice } from "../../db/src/entity/Invoice";
import { Estimate } from "../../db/src/entity/Estimate";
import { User } from "../../db/src/entity/User";

const createNewCustomer = async (
  name: string,
  email: string,
  phone: string | undefined,
  jobIds: number[],
  invoiceIds: number[],
  estimateIds: number[],
  companyId: number
) => {
  const customerRepo = AppDataSource.getRepository(Customer);
  const thisCustomer = await customerRepo.findOne({
    where: { email: email, user: { id: companyId } },
    relations: ["user"],
  });
  if (thisCustomer) {
    // Would cause issues with production app. Would want to check against multiple point
    // such as phone and name. Keeping it simple for time for now.
    throw new Error(`Customer with this email already exists in the company`);
  }

  const userRepo = AppDataSource.getRepository(User);
  const thisCompany = await userRepo.findOne({
    where: { id: companyId },
  });
  if (!thisCompany) {
    throw new Error(`No company found`);
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

  const newCustomer = new Customer();
  newCustomer.name = name;
  newCustomer.email = email;
  newCustomer.phone = phone;
  newCustomer.jobs = theseJobs;
  newCustomer.invoices = theseInvoices;
  newCustomer.estimates = theseEstimates;
  newCustomer.user = thisCompany;

  const savedCustomer = await AppDataSource.manager.save(newCustomer);
  if (!savedCustomer) {
    throw new Error("Error creating new user");
  }
  return savedCustomer;
};

export default createNewCustomer;
