import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Job } from "./Job";
import { Invoice } from "./Invoice";
import { Estimate } from "./Estimate";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone?: string;

  @OneToMany(() => Job, (job) => job.customer, { onDelete: "CASCADE" })
  jobs?: Job[];

  @OneToMany(() => Invoice, (invoice) => invoice.customer, {
    onDelete: "CASCADE",
  })
  invoices?: Invoice[];

  @ManyToOne(() => User, (user) => user.user, {
    onDelete: "CASCADE",
    nullable: false,
  })
  user!: User;

  @OneToMany(() => Estimate, (estimate) => estimate.customer, {
    onDelete: "CASCADE",
  })
  estimates?: Estimate[];
}
