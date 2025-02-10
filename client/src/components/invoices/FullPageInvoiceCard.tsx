import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Invoice } from "../../../types";

const FullPageInvoiceCard = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice>();

  let total = 0;
  invoice?.estimates?.map((estimate) =>
    estimate.lineItems.map((item) => (total += item.price))
  );

  useEffect(() => {
    const fetchSingleInvoice = async () => {
      const result = await axios.get(
        `https://b9d6-2001-56a-7d53-8a00-301b-d8fd-39e8-56ac.ngrok-free.app/invoices/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const fetchedInvoice = result.data;
      setInvoice(fetchedInvoice);
    };
    fetchSingleInvoice();
  }, [id]);

  return (
    <div className="card-container-large">
      {!invoice ? (
        <p>Invoice not found</p>
      ) : (
        <div className="card-large">
          <h1 className="card-title">Invoice #{invoice.id}</h1>
          <div className="card-title-large">
            <p className="card-category">{invoice.customer.name}</p>
            <p>{new Date(invoice.date).toDateString()}</p>
          </div>
          <p>
            <span className="card-category">Paid?</span>
            {invoice.isPaid ? (
              <span className="paid">Paid!</span>
            ) : (
              <span className="unpaid">Unpaid!</span>
            )}
          </p>
          <ul>
            {" "}
            <p className="lineItem-container">
              <span className="card-category lineItem">Line Items</span>
            </p>
            {invoice.estimates &&
              invoice.estimates.map((estimate) =>
                estimate.lineItems.map((lineItem, id) => (
                  <li key={id}>
                    <span className="card-category">{lineItem.name}:</span> $
                    {lineItem.price}
                  </li>
                ))
              )}
          </ul>
          <h1 className="total large">Total: ${total}</h1>
        </div>
      )}
    </div>
  );
};

/*

*/
export default FullPageInvoiceCard;
