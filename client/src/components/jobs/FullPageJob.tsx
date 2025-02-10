import { useParams } from "react-router";
import { Job } from "../../../../db/src/entity/Job";
import { useEffect, useState } from "react";
import axios from "axios";

const FullPageJobCard: React.FC<Partial<Job>> = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job>();

  useEffect(() => {
    const fetchSingleJob = async () => {
      const result = await axios.get(`http://localhost:5000jobs/${id}`);
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
