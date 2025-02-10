import { useState, useEffect } from "react";
import axios from "axios";
import { Job } from "../../../../db/src/entity/Job";
import { useNavigate } from "react-router";
import JobsCard from "./JobsCard";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setjobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const result = await axios.get("http://localhost:5000jobs");
      setjobs(result.data);
    };
    fetchJobs();
  }, []);

  const handleJobPage = (id: number) => {
    navigate(`./${id}`);
  };

  return (
    <div>
      {" "}
      <h1 className="card-title">My Jobs</h1>
      <div className="card-container">
        {jobs &&
          jobs?.map((job) => (
            <JobsCard
              key={job.id}
              job={job}
              onClick={() => handleJobPage(job.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Jobs;
