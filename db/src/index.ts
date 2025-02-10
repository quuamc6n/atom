import { AppDataSource } from "./data-source";
import { Customer } from "./entity/Customer";
import { Employee } from "./entity/Employee";
import { Estimate } from "./entity/Estimate";
import { Invoice } from "./entity/Invoice";
import { Job } from "./entity/Job";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new data into the database...");
    const user = new User();
    user.name = "Atom Automation";
    user.email = "atom@gmail.com";
    user.password = "test";
    const savedUser = await AppDataSource.manager.save(user);

    const customer = new Customer();
    customer.name = "Nucleus";
    customer.email = "nucleus@gmail.com";
    customer.phone = "5555555555";
    customer.user = savedUser;
    const savedCustomer = await AppDataSource.manager.save(customer);

    const estimate = new Estimate();
    estimate.customer = savedCustomer;
    estimate.lineItems = [
      { name: "salaries", price: 40000 },
      { name: "materials", price: 15000 },
      { name: "misc", price: 3500 },
    ];
    estimate.status = "Pending";
    estimate.date = new Date(Date.now());
    const savedEstimate = await AppDataSource.manager.save(estimate);

    const invoice = new Invoice();
    invoice.user = savedUser;
    invoice.customer = savedCustomer;
    invoice.estimates = [savedEstimate];
    invoice.date = new Date(Date.now());
    invoice.isPaid = false;
    const savedInvoice = await AppDataSource.manager.save(invoice);

    const employee = new Employee();
    employee.company = savedUser;
    employee.dob = new Date(Date.now());
    employee.firstName = "Jack";
    employee.lastName = "Summers";
    employee.company = savedUser;
    employee.dob = new Date("1990-12-25T00:00:00.000Z");
    employee.email = "jackS@gmail.com";
    employee.jobs = [];
    employee.phone = "4034034303";
    const savedEmployee = await AppDataSource.manager.save(employee);

    const job = new Job();
    job.customer = savedCustomer;
    job.estimates = [savedEstimate];
    job.invoices = [savedInvoice];
    job.isComplete = false;
    job.date = new Date(Date.now());
    job.assignee = savedEmployee;
    const savedJob = await AppDataSource.manager.save(job);

    console.log("Loaded data");
  })
  .catch((error) => console.log(error));
