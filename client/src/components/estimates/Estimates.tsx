import { useState, useEffect } from "react";
import { Estimate } from "../../../../db/src/entity/Estimate";
import EstimateCard from "./EstimateCard";
import axios from "axios";
import { useNavigate } from "react-router";

const Estimates = () => {
  const navigate = useNavigate();
  const [estimates, setEstimates] = useState<Estimate[]>([]);

  useEffect(() => {
    const fetchEstimates = async () => {
      const result = await axios.get(
        "http://localhost:5000estimates"
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
