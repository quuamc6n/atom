import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Customer } from "../../../../db/src/entity/Customer";

const FullPageCustomerCard = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer>();

  useEffect(() => {
    const fetchSingleCustomer = async () => {
      const result = await axios.get(`http://localhost:5000/customers/${id}`);
      const fetchedCustomer = result.data;
      setCustomer(fetchedCustomer);
    };
    fetchSingleCustomer();
  }, [id]);

  return (
    <div className="card-container-large">
      {!customer ? (
        <p>Customer not found</p>
      ) : (
        <div className="card-large">
          <h1 className="card-id">{`Customer #${customer.id}`}</h1>
          <p>
            <span className="card-category">Name:</span> {`${customer.name}`}
          </p>
          <p>
            <span className="card-category">Email: </span>
            {`${customer.email}`}
          </p>
          {/* <p>{new Date(customer.date).toDateString()}</p> */}
        </div>
      )}
    </div>
  );
};

export default FullPageCustomerCard;
