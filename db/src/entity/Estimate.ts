import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { Job } from "./Job";
import { Invoice } from "./Invoice";
import { Customer } from "./Customer";

@Entity()
export class Estimate {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Customer, (customer) => customer.estimates, {
    onDelete: "CASCADE",
  })
  customer!: Customer;

  @Column("json")
  lineItems!: { name: string; price: number }[];

  @Column({ type: "date" })
  date!: Date;

  @Column({ type: "varchar", length: 20, default: "Pending" })
  status!: StatusType;

  @ManyToOne(() => Job, (job) => job.estimates, { onDelete: "CASCADE" })
  job!: Job;

  @ManyToMany(() => Invoice, (invoice) => invoice.estimates, {
    onDelete: "CASCADE",
  })
  invoices?: Invoice[];
}

export type StatusType = "Pending" | "Approved" | "Declined";
