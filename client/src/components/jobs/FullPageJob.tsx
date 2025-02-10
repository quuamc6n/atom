import { useParams } from "react-router";
import { Job } from "../../../types";
import { useEffect, useState } from "react";
import axios from "axios";

const FullPageJobCard: React.FC<Partial<Job>> = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job>();

  useEffect(() => {
    const fetchSingleJob = async () => {
      const result = await axios.get(
        `https://b9d6-2001-56a-7d53-8a00-301b-d8fd-39e8-56ac.ngrok-free.app/jobs/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const fetchedJob = result.data;
      setJob(fetchedJob);
    };
    fetchSingleJob();
  }, [id]);

  return (
    <div className="card-container-large">
      {!job ? (
        <p>Job not found</p>
      ) : (
        <div className="card-large">
          <p>{job.customer.name}</p>
          <p>{`job #${job.id}`}</p>
          <p>{`Assigned: ${job.assignee?.firstName}`}</p>
          <p>{`Customer: ${job.customer.name}`}</p>
          <ul>
            {job.estimates &&
              job.estimates?.map((estimate, i) => (
                <li key={i}>{`${estimate.customer.name}`}</li>
              ))}
          </ul>
          <ul>
            {job.invoices &&
              job.invoices?.map((invoice, i) => (
                <li
                  key={i}
                >{`${invoice.customer.name}: ${invoice.customer.email}`}</li>
              ))}
          </ul>
          {/* <p>{new Date(job.date).toDateString()}</p> */}
        </div>
      )}
    </div>
  );
};

export default FullPageJobCard;
