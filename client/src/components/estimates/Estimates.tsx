import { useState, useEffect } from "react";
import { Estimate } from "../../../types";
import EstimateCard from "./EstimateCard";
import axios from "axios";
import { useNavigate } from "react-router";

const Estimates = () => {
  const navigate = useNavigate();
  const [estimates, setEstimates] = useState<Estimate[]>([]);

  useEffect(() => {
    const fetchEstimates = async () => {
      const result = await axios.get(
        "https://b9d6-2001-56a-7d53-8a00-301b-d8fd-39e8-56ac.ngrok-free.app/estimates"
      );
      setEstimates(result.data);
    };
    fetchEstimates();
  }, []);

  const handleEstimatePage = (id: number) => {
    navigate(`./${id}`);
  };

  return (
    <div>
      {" "}
      <h1 className="card-title">My Estimates</h1>
      <div className="card-container">
        {estimates &&
          estimates.map((estimate) => (
            <EstimateCard
              key={estimate.id}
              estimate={estimate}
              onClick={() => handleEstimatePage(estimate.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Estimates;
