import { Customer } from "../../../types";

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <p>{customer.name}</p>
      <p>{`customer #${customer.id}`}</p>
      <p>{`Email: ${customer.email}`}</p>
      {!customer.phone ? "" : <p>{`Phone: ${customer.phone}`}</p>}
      <ul>
        {customer.jobs?.map((customer, i) => (
          <li key={i}>{`${customer.customer.name}`}</li>
        ))}
      </ul>
      {/* <p>{new Date(customer.date).toDateString()}</p> */}
    </div>
  );
};

export default CustomerCard;
