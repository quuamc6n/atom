import { Job } from "../../../../db/src/entity/Job";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const JobsCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
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
  );
};

export default JobsCard;
