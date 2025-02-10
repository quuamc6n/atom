export type StatusType = "Pending" | "Approved" | "Declined";

export interface User {
  id: number;
  name: string;
  email: string;
  // Would hash this and never show it on client side in a real app
  password: string;
  estiamtes: Estimate[];
  invoices: Invoice[];
  jobs: Job[];
  employees: Employee[];
  user: Customer[];
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dob: Date;
  jobs: Job[];
  company: User;
  email: string;
  phone: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  jobs: Job[];
  invoices: Invoice[];
  user: User;
  estimates: Estimate[];
}

export interface Job {
  id: number;
  customer: Customer;
  estimates: Estimate[];
  invoices: Invoice[];
  isComplete: boolean;
  date: Date;
  assignee: Employee;
}

export interface Invoice {
  id: number;
  date: Date;
  customer: Customer;
  user: User;
  estimates: Estimate[];
  job: Job;
  isPaid: boolean;
}

export interface Estimate {
  id: number;
  customer: Customer;
  lineItems: { name: string; price: number }[];
  date: Date;
  status: StatusType;
  job: Job;
  invoices: Invoice[];
}
