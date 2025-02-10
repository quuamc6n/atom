import { useEffect, useState } from "react";
import axios from "axios";
import { Estimate } from "../../../types";
import { Job } from "../../../types";
import { Customer } from "../../../types";

interface InvoiceFormData {
  customerId: number;
  estimateIds: number[] | [];
  jobId: number | null;
  isPaid: boolean;
}

const CreateNewInvoice: React.FC = () => {
  const [formData, setFormData] = useState<InvoiceFormData>({
    customerId: 0,
    estimateIds: [],
    jobId: null,
    isPaid: false,
  });

  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const estimatesRes = await axios.get(
          "https://b9d6-2001-56a-7d53-8a00-301b-d8fd-39e8-56ac.ngrok-free.app/estimates?status=Approved"
        );
        setEstimates(estimatesRes.data);

        const jobsRes = await axios.get(
          "https://b9d6-2001-56a-7d53-8a00-301b-d8fd-39e8-56ac.ngrok-free.app/jobs?isPaid=false"
        );
        setJobs(jobsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://b9d6-2001-56a-7d53-8a00-301b-d8fd-39e8-56ac.ngrok-free.app/customers"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, estimateIds: [formData.estimateIds] };
    try {
      await axios.post(
        "https://b9d6-2001-56a-7d53-8a00-301b-d8fd-39e8-56ac.ngrok-free.app/create-invoice",
        payload
      );
      setFormData({
        customerId: 0,
        estimateIds: [],
        jobId: null,
        isPaid: false,
      });
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create New Invoice</h2>
      {loading ? (
        <p>Loading invoice data...</p>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Customer:
            <select
              name="customerId"
              value={formData.customerId}
              onChange={(e) =>
                setFormData({ ...formData, customerId: Number(e.target.value) })
              }
              required
            >
              <option value="">Select Customer</option>
              {customers.map((customer, i) => (
                <option key={i} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Estimate:
            <select
              value={formData.estimateIds[0]}
              onChange={(e) =>
                handleChange("estimateIds", Number(e.target.value))
              }
              required
            >
              <option value="">Select an Estimate</option>
              {estimates.map((estimate) => (
                <option key={estimate.id} value={estimate.id}>
                  {estimate.customer.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Job:
            <select
              value={formData.jobId || ""}
              onChange={(e) => handleChange("jobId", Number(e.target.value))}
              required
            >
              <option value="">Select a Job</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  Job #{job.id}
                </option>
              ))}
            </select>
          </label>

          <div>
            <label>Is Paid:</label>
            <label>
              <input
                type="radio"
                name="isPaid"
                value="true"
                checked={formData.isPaid === true}
                onChange={() => handleChange("isPaid", true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isPaid"
                value="false"
                checked={formData.isPaid === false}
                onChange={() => handleChange("isPaid", false)}
              />
              No
            </label>
          </div>

          <button className="form-button" type="submit">
            Create Invoice
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateNewInvoice;
