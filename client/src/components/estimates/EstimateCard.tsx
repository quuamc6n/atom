import { Estimate } from "../../../types";

interface EstimateProps {
  estimate: Estimate;
  onClick: () => void;
}

const EstimateCard: React.FC<EstimateProps> = ({ estimate, onClick }) => {
  let total = 0;
  estimate.lineItems.map((item) => (total += item.price));

  return (
    <div className="card" onClick={onClick}>
      <h1 className="card-id">{`Estimate #${estimate.id}`}</h1>
      <p className="date">{new Date(estimate.date).toDateString()}</p>
      <p>
        <span className="card-category">Customer:</span>{" "}
        {`${estimate.customer.name}`}
      </p>
      <p>
        <span className="card-category">Status: </span>
        {`${estimate.status}`}
      </p>
      <ul className="line-items-list">
        <h2 className="card-id">Line Items</h2>
        {estimate.lineItems.map((item, i) => (
          <li key={i}>
            <span className="card-category">{`${item.name}`}</span>:{" "}
            {`$${item.price}`}
          </li>
        ))}
        <p className="total">Total: ${total}</p>
      </ul>
    </div>
  );
};

export default EstimateCard;
