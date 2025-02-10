import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Estimate } from "./Estimate";
import { User } from "./User";
import { Job } from "./Job";
import { Customer } from "./Customer";

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  date!: Date;

  @ManyToOne(() => Customer, (customer) => customer.invoices, {
    onDelete: "CASCADE",
  })
  customer!: Customer;

  @ManyToOne(() => User, (user) => user.invoices, { onDelete: "CASCADE" })
  user!: User;

  @ManyToMany(() => Estimate, (estimate) => estimate.invoices, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  estimates?: Estimate[];

  @ManyToOne(() => Job, (job) => job.invoices, { onDelete: "CASCADE" })
  job!: Job;

  @Column({ default: false })
  isPaid!: boolean;
}
