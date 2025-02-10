import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Job } from "./Job";
import { User } from "./User";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ type: "date" })
  dob!: Date;

  @OneToMany(() => Job, (job) => job.assignee)
  jobs?: Job[];

  @ManyToOne(() => User, (user) => user.employees, { nullable: false })
  company!: User;

  @Column()
  email!: string;

  @Column()
  phone?: string;
}
