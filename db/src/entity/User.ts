import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Estimate } from "./Estimate";
import { Invoice } from "./Invoice";
import { Employee } from "./Employee";
import { Customer } from "./Customer";
import { Job } from "./Job";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Estimate, (estimate) => estimate.customer, { cascade: true })
  estimates?: Estimate[];

  @OneToMany(() => Invoice, (invoice) => invoice.customer, { cascade: true })
  invoices?: Invoice[];

  @OneToMany(() => Job, (job) => job.customer, { cascade: true })
  jobs?: Job[];

  @OneToMany(() => Employee, (employee) => employee.company)
  employees?: Employee[];

  @OneToMany(() => Customer, (customer) => customer.user)
  user?: Customer[];
}
