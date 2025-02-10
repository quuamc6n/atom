import "reflect-metadata";
import express from "express";
import cors from "cors";
import { Request, Response } from "express";

import { AppDataSource } from "../../db/src/data-source";
import { User } from "../../db/src/entity/User";
import { Estimate } from "../../db/src/entity/Estimate";
import { Job } from "../../db/src/entity/Job";
import { Invoice } from "../../db/src/entity/Invoice";
import { Customer } from "../../db/src/entity/Customer";

import createNewJob from "./createNewJob";
import editJob from "./editJob";
import deleteJob from "./deleteJob";
import createNewUser from "./createNewUser";
import editUser from "./editUser";
import createNewEmployee from "./createNewEmployee";
import deleteEmployee from "./deleteEmployee";
import editEmployee from "./editEmployee";
import createNewEstimate from "./createNewEstimate";
import editEstimate from "./editEstimate";
import deleteEstimate from "./deleteEstimate";
import createNewInvoice from "./createNewInvoice";
import editInvoice from "./editInvoice";
import deleteInvoice from "./deletedInvoice";
import createNewCustomer from "./createNewCustomer";
import editCustomer from "./editCustomer";
import deleteCustomer from "./deleteCustomer";
import { Employee } from "../../db/src/entity/Employee";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    app.get("/users", async (_req: Request, res: Response) => {
      const users = await AppDataSource.manager.find(User);
      res.status(200).send(users);
    });
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));

app.get("/estimates", async (_req: Request, res: Response) => {
  const estimates = await AppDataSource.manager.find(Estimate, {
    relations: ["customer"],
  });
  res.status(200).send(estimates);
});

// Users
app.post("/create-user", async (req: Request, res: Response) => {
  const { name, email, pass } = req.body;
  try {
    const newUser = createNewUser(name, email, pass);
    if (!newUser) {
      res
        .status(400)
        .send({ success: false, error: "Error creating new user" });
    }
    res.status(201).send({ success: true, user: newUser });
  } catch (err) {
    console.log("Failed to create new user: ", err);
    res.status(500).send({ success: false, error: err });
  }
});

app.put("/edit-user", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const editedUser = editUser(name, email);
  } catch (err) {
    console.log("Failed to edit user ", err);
    res.status(500).send({ success: false, error: err });
  }
});

// Employees
app.post("/create-employee", async (req: Request, res: Response) => {
  const { firstName, lastName, dob, companyId, email, phone } = req.body;
  try {
    const newEmployee = await createNewEmployee(
      firstName,
      lastName,
      dob,
      companyId,
      email,
      phone
    );
    if (!newEmployee) {
      res
        .status(400)
        .send({ success: false, error: "Error creating new employee" });
    }
    res.status(201).send({ success: true, employee: newEmployee });
  } catch (err) {
    console.log("Failed to create new employee: ", err);
    res.status(500).send({ success: false, error: err });
  }
});

// Fetch single employee
app.get("/employees/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await AppDataSource.manager.findOne(Employee, {
    where: { id: Number(id) },
  });
  res.status(200).send(employee);
});

app.get("/employees", async (req: Request, res: Response) => {
  try {
    const employees = await AppDataSource.manager.find(Employee);
    if (!employees) {
      res
        .status(500)
        .send({ success: false, error: "Failed to get employees" });
    }
    res.status(200).send(employees);
  } catch (err) {
    console.log("Failed to get employees", err);
    res.status(500).send({ success: false, error: err });
  }
});

app.put("/edit-employee", async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone } = req.body;
  try {
    const editedEmployee = await editEmployee(
      firstName,
      lastName,
      email,
      phone
    );
    if (!editedEmployee) {
      res.status(400).send({ success: false, error: "Error editing employee" });
    }
    res.status(201).send({ success: true, job: editedEmployee });
  } catch (err) {
    console.log("Failed to edit employee");
    res.status(500).send({ success: false, error: err });
  }
});

app.delete(
  "/delete-employee/:employeeId",
  async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    try {
      const deletedEmployee = deleteEmployee(Number(employeeId));
      if (!deletedEmployee) {
        res
          .status(400)
          .send({ success: false, error: "Error deleting employee" });
      }
      res.status(200).send({ success: true, employee: deletedEmployee });
    } catch (err) {
      console.log("Failed to delete employee");
      res.status(500).send({ success: false, error: err });
    }
  }
);

// Customers
app.post("/create-customer", async (req: Request, res: Response) => {
  const { name, email, phone, jobIds, invoiceIds, estimateIds, companyId } =
    req.body;
  try {
    const newCustomer = await createNewCustomer(
      name,
      email,
      phone,
      jobIds,
      invoiceIds,
      estimateIds,
      companyId
    );
    if (!newCustomer) {
      res
        .status(400)
        .send({ success: false, error: "Error creating new customer" });
    }
    res.status(201).send({ success: true, customer: newCustomer });
  } catch (err) {
    console.log("Failed to create new customer: ", err);
    res.status(500).send({ success: false, error: err });
  }
});

// Fetch single customer
app.get("/customers/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = await AppDataSource.manager.findOne(Customer, {
    where: { id: Number(id) },
  });
  res.status(200).send(customer);
});

app.get("/customers", async (req: Request, res: Response) => {
  try {
    const customers = await AppDataSource.manager.find(Customer);
    if (!customers) {
      res
        .status(500)
        .send({ success: false, error: "Failed to get customers" });
    }
    res.status(200).send(customers);
  } catch (err) {
    console.log("Failed to get customers", err);
    res.status(500).send({ success: false, error: err });
  }
});

app.put("/edit-customer", async (req: Request, res: Response) => {
  const { customerId, name, email, phone, jobIds, invoiceIds, estimateIds } =
    req.body;
  try {
    const editedCustomer = await editCustomer(
      customerId,
      name,
      email,
      phone,
      jobIds,
      invoiceIds,
      estimateIds
    );
    if (!editedCustomer) {
      res.status(400).send({ success: false, error: "Error editing customer" });
    }
    res.status(201).send({ success: true, job: editedCustomer });
  } catch (err) {
    console.log("Failed to edit employee");
    res.status(500).send({ success: false, error: err });
  }
});

app.delete(
  "/delete-customer/:customerId",
  async (req: Request, res: Response) => {
    const { customerId } = req.params;
    try {
      const deletedCustomer = deleteCustomer(Number(customerId));
      if (!deletedCustomer) {
        res
          .status(400)
          .send({ success: false, error: "Error deleting customer" });
      }
      res.status(200).send({ success: true, employee: deletedCustomer });
    } catch (err) {
      console.log("Failed to delete customer");
      res.status(500).send({ success: false, error: err });
    }
  }
);

// Jobs
app.get("/jobs", async (_req: Request, res: Response) => {
  const jobs = await AppDataSource.manager.find(Job, {
    relations: [
      "assignee",
      "invoices",
      "invoices.customer",
      "estimates",
      "estimates.customer",
      "customer",
    ],
  });
  res.status(200).send(jobs);
});

// Fetch single job
app.get("/jobs/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const job = await AppDataSource.manager.findOne(Job, {
    where: { id: Number(id) },
    relations: [
      "assignee",
      "invoices",
      "invoices.customer",
      "estimates",
      "estimates.customer",
      "customer",
    ],
  });
  res.status(200).send(job);
});

app.post("/create-job", async (req: Request, res: Response) => {
  const { customerId, assigneeId } = req.body;
  try {
    const newJob = await createNewJob(customerId, assigneeId);
    if (!newJob) {
      res.status(400).send({ success: false, error: "Error creating new job" });
    }
    res.status(201).send({ success: true, job: newJob });
  } catch (err) {
    console.log("Failed to create new job: ", err);
    res.status(500).send({ success: false, error: err });
  }
});

app.put("/edit-job", async (req: Request, res: Response) => {
  const { jobId, customerId, assignedId, estimateIds, invoiceIds, isComplete } =
    req.body;
  try {
    const editedJob = await editJob(
      jobId,
      customerId,
      assignedId,
      estimateIds,
      invoiceIds,
      isComplete
    );
    if (!editedJob) {
      res.status(400).send({ success: false, error: "Error editing job" });
    }
    res.status(201).send({ success: true, job: editedJob });
  } catch (err) {
    console.log("Failed to edit job");
    res.status(500).send({ success: false, error: err });
  }
});

app.delete("/delete-job/:jobId", async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    const deletedJob = await deleteJob(Number(jobId));
    if (!deletedJob) {
      res.status(400).send({ success: false, error: "Error deleting job" });
    }
    res.status(200).send({ success: true, job: deletedJob });
  } catch (err) {
    console.log("Failed to delete job");
    res.status(500).send({ success: false, error: err });
  }
});

// Estimates
app.post("/create-estimate", async (req: Request, res: Response) => {
  const { customerId, lineItems, status, jobId } = req.body;
  try {
    const newEstimate = await createNewEstimate(
      customerId,
      lineItems,
      status,
      jobId
    );
    if (!newEstimate) {
      res
        .status(400)
        .send({ success: false, error: "Error creating new estimate" });
    }
    res.status(201).send({ success: true, estimate: newEstimate });
  } catch (err) {
    console.log("Failed to create new estimate: ", err);
    res.status(500).send({ success: false, error: err });
  }
});

// Fetch single estimate
app.get("/estimates/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const estimate = await AppDataSource.manager.findOne(Estimate, {
    where: { id: Number(id) },
    relations: ["customer", "invoices", "job"],
  });
  res.status(200).send(estimate);
});

app.put("/edit-estimate", async (req: Request, res: Response) => {
  const { estimateId, customerId, lineItems, status, jobId, invoiceIds } =
    req.body;
  try {
    const editedEstimate = await editEstimate(
      estimateId,
      customerId,
      lineItems,
      status,
      jobId,
      invoiceIds
    );
    if (!editedEstimate) {
      res.status(400).send({ success: false, error: "Error editing estimate" });
    }
    res.status(201).send({ success: true, estimate: editedEstimate });
  } catch (err) {
    console.log("Failed to edit estimate");
    res.status(500).send({ success: false, error: err });
  }
});

app.delete(
  "/delete-estimate/:estimateId",
  async (req: Request, res: Response) => {
    const { estimateId } = req.params;
    try {
      const deletedEstimate = await deleteEstimate(Number(estimateId));
      if (!deletedEstimate) {
        res
          .status(400)
          .send({ success: false, error: "Error deleting estimate" });
      }
      res.status(200).send({ success: true, estimate: deletedEstimate });
    } catch (err) {
      console.log("Failed to delete estimate");
      res.status(500).send({ success: false, error: err });
    }
  }
);

// Invoices
app.get("/invoices", async (_req: Request, res: Response) => {
  const invoices = await AppDataSource.manager.find(Invoice, {
    relations: ["estimates", "customer", "job"],
  });
  res.status(200).send(invoices);
});

// Fetch single invoice
app.get("/invoices/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const invoice = await AppDataSource.manager.findOne(Invoice, {
    where: { id: Number(id) },
    relations: ["customer", "job", "user", "estimates"],
  });
  res.status(200).send(invoice);
});

app.post("/create-invoice", async (req: Request, res: Response) => {
  const { customerId, estimateIds, jobId, isPaid } = req.body;
  try {
    const newInvoice = await createNewInvoice(
      customerId,
      estimateIds,
      jobId,
      isPaid
    );
    if (!newInvoice) {
      res
        .status(400)
        .send({ success: false, error: "Error creating new invoice" });
    }
    res.status(201).send({ success: true, invoice: newInvoice });
  } catch (err) {
    console.log("Failed to create new invoice: ", err);
    res.status(500).send({ success: false, error: err });
  }
});

app.put("/edit-invoice", async (req: Request, res: Response) => {
  const { invoiceId, customerId, vendorId, estimateIds, jobId, isPaid } =
    req.body;
  try {
    const editedInvoice = await editInvoice(
      invoiceId,
      customerId,
      vendorId,
      estimateIds,
      jobId,
      isPaid
    );
    if (!editedInvoice) {
      res.status(400).send({ success: false, error: "Error editing invoice" });
    }
    res.status(201).send({ success: true, invoice: editedInvoice });
  } catch (err) {
    console.log("Failed to edit invoice");
    res.status(500).send({ success: false, error: err });
  }
});

app.delete(
  "/delete-invoice/:invoiceId",
  async (req: Request, res: Response) => {
    const { invoiceId } = req.params;
    try {
      const deletedInvoice = await deleteInvoice(Number(invoiceId));
      if (!deletedInvoice) {
        res
          .status(400)
          .send({ success: false, error: "Error deleting invoice" });
      }
      res.status(200).send({ success: true, invoice: deletedInvoice });
    } catch (err) {
      console.log("Failed to delete invoice");
      res.status(500).send({ success: false, error: err });
    }
  }
);
