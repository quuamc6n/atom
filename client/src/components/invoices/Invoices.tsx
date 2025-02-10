import { useState, useEffect } from "react";
import axios from "axios";
import { Invoice } from "../../../types";
import InvoiceCard from "./InvoiceCard";
import { useNavigate } from "react-router";

const Invoices = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const result = await axios.get("http://localhost:5000/invoices");
      setInvoices(result.data);
    };
    fetchInvoices();
  }, []);

  const handleInvoicePage = (id: number) => {
    navigate(`./${id}`);
  };
  return (
    <div>
      {" "}
      <h1 className="card-title">My Invoices</h1>
      <div className="card-container">
        {invoices &&
          invoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onClick={() => handleInvoicePage(invoice.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Invoices;
