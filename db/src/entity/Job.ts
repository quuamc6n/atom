import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Invoice } from "./Invoice";
import { Estimate } from "./Estimate";
import { Employee } from "./Employee";
import { Customer } from "./Customer";

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Customer, (customer) => customer.jobs, {
    onDelete: "CASCADE",
  })
  customer!: Customer;

  @OneToMany(() => Estimate, (estimate) => estimate.job, {
    onDelete: "CASCADE",
  })
  estimates?: Estimate[];

  @OneToMany(() => Invoice, (invoice) => invoice.job, { onDelete: "CASCADE" })
  invoices?: Invoice[];

  @Column({ default: false })
  isComplete!: boolean;

  @Column({ type: "date" })
  date!: Date;

  @ManyToOne(() => Employee, (employee) => employee.jobs, {
    nullable: true,
    onDelete: "SET NULL",
  })
  assignee?: Employee;
}
