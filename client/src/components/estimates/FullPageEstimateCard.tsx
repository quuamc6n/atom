import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Estimate } from "../../../types";

const FullPageEstimateCard = () => {
  const { id } = useParams();
  const [estimate, setEstimate] = useState<Estimate>();

  let total = 0;
  estimate?.lineItems.map((item) => (total += item.price));

  useEffect(() => {
    const fetchSingleEstimate = async () => {
      const result = await axios.get(
        `https://b9d6-2001-56a-7d53-8a00-301b-d8fd-39e8-56ac.ngrok-free.app/estimates/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const fetchedEstimate = result.data;
      setEstimate(fetchedEstimate);
    };
    fetchSingleEstimate();
  }, [id]);

  return (
    <div className="card-container-large">
      {!estimate ? (
        <p>Estimate not found</p>
      ) : (
        <div className="card-large">
          <h1 className="card-title">Estimate #{estimate.id}</h1>
          <div className="card-title-large">
            <p className="card-category">{estimate.customer.name}</p>
            <p>{new Date(estimate.date).toDateString()}</p>
          </div>
          <p>
            <span className="card-category">Status: </span> {estimate.status}
          </p>
          <p>
            <span className="card-category">Job </span> #{estimate.job.id}
          </p>
          {!estimate.invoices?.length ? (
            ""
          ) : (
            <p>
              <span className="card-category">Invoices </span>
              {estimate.invoices?.map((invoice) => (
                <p>#{invoice.id}</p>
              ))}
            </p>
          )}
          <p className="lineItem-container">
            <span className="card-category lineItem">Line Items: </span>{" "}
            {estimate.lineItems.map((item) => (
              <p>
                <span className="card-category">{item.name}:</span> $
                {item.price}
              </p>
            ))}
          </p>
          <div className="total large">
            <h1>Total: ${total}</h1>
          </div>
        </div>
      )}
      {/* <div className="form-button-large-container">
        <button className="form-button-large">Edit</button>
        <button className="form-button-large">Delete</button>
      </div> */}
    </div>
  );
};

export default FullPageEstimateCard;
