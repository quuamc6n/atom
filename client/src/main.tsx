import "./App.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Estimates from "./components/estimates/Estimates.tsx";
import Invoices from "./components/invoices/Invoices.tsx";
import Jobs from "./components/jobs/Jobs.tsx";
import Navbar from "./components/Navbar.tsx";
import FullPageJobCard from "./components/jobs/FullPageJob.tsx";
import FullPageEstimateCard from "./components/estimates/FullPageEstimateCard.tsx";
import FullPageInvoiceCard from "./components/invoices/FullPageInvoiceCard.tsx";
import App from "./App.tsx";
import CreateNewCustomer from "./components/customers/CreateNewCustomer.tsx";
import CreateNewEstimate from "./components/estimates/CreateNewEstimate.tsx";
import CreateNewInvoice from "./components/invoices/CreateNewInvoice.tsx";
import CreateNewJob from "./components/jobs/CreateNewJob.tsx";
import CreateNewEmployee from "./components/employees/CreateNewEmployee.tsx";
import Employees from "./components/employees/Employees.tsx";
import FullPageEmployeeCard from "./components/employees/FullPageEmployeeCard.tsx";
import Customers from "./components/customers/Customers.tsx";
import FullPageCustomerCard from "./components/customers/FullPageCustomerCard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<FullPageJobCard />} />
        <Route path="/estimates" element={<Estimates />} />
        <Route path="/estimates/:id" element={<FullPageEstimateCard />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoices/:id" element={<FullPageInvoiceCard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<FullPageEmployeeCard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<FullPageCustomerCard />} />

        <Route path="/create-job" element={<CreateNewJob />} />
        <Route path="/create-estimate" element={<CreateNewEstimate />} />
        <Route path="/create-invoice" element={<CreateNewInvoice />} />
        <Route path="/create-customer" element={<CreateNewCustomer />} />
        <Route path="/create-employee" element={<CreateNewEmployee />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
