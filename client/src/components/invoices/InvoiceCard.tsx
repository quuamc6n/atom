import { Invoice } from "../../../types";

interface InvoiceProps {
  invoice: Invoice;
  onClick: () => void;
}

const InvoiceCard: React.FC<InvoiceProps> = ({ invoice, onClick }) => {
  let total = 0;
  invoice.estimates?.map((estimate) =>
    estimate.lineItems.map((item) => (total += item.price))
  );

  return (
    <div className="card" onClick={onClick}>
      <h1 className="card-id">{`Invoice #${invoice.id}`}</h1>
      <p className="date">{new Date(invoice.date).toDateString()}</p>
      <p>
        <span className="card-category">Customer:</span>{" "}
        {`${invoice.customer.name}`}
      </p>
      <p>
        <span className="card-category">Paid?</span>
        {invoice.isPaid ? (
          <span className="paid">Paid!</span>
        ) : (
          <span className="unpaid">Unpaid!</span>
        )}
      </p>
      <p>
        <span className="card-category">Job</span> #{invoice.job.id}
      </p>
      <p className="total">Total: ${total}</p>
    </div>
  );
};

export default InvoiceCard;
