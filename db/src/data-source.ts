import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Job } from "./entity/Job";
import { Estimate } from "./entity/Estimate";
import { Invoice } from "./entity/Invoice";
import { Customer } from "./entity/Customer";
import { Employee } from "./entity/Employee";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "sebastiendion",
  password: "rootroot",
  database: "nclone",
  synchronize: true,
  logging: false,
  entities: [User, Job, Estimate, Invoice, Customer, Employee],
  migrations: [],
  subscribers: [],
});
