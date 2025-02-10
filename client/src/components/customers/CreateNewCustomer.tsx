import { useState } from "react";
import axios from "axios";

const CreateNewCustomer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "https://b9d6-2001-56a-7d53-8a00-301b-d8fd-39e8-56ac.ngrok-free.app/create-customer",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          jobIds: [],
          invoiceIds: [],
          estimateIds: [],
          companyId: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      setFormData({ name: "", email: "", phone: "" });
    } catch (err) {
      setError("Failed to create customer");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Customer</h2>
      {error && <p className="error">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone (optional):
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Customer"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewCustomer;
