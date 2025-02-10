import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Customer } from "../../../types";
import CustomerCard from "./CustomerCard";

const Customers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const result = await axios.get("http://localhost:5000/customers");
      setCustomers(result.data);
    };
    fetchCustomers();
  }, []);

  const handleCustomerPage = (id: number) => {
    navigate(`./${id}`);
  };

  return (
    <div>
      {" "}
      <h1 className="card-title">My Customers</h1>
      <div className="card-container">
        {customers &&
          customers?.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onClick={() => handleCustomerPage(customer.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Customers;
