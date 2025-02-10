import { useEffect, useState } from "react";
import axios from "axios";
import { Customer } from "../../../../db/src/entity/Customer";

const CreateNewEstimate: React.FC = () => {
  const [formData, setFormData] = useState({
    customerId: 0,
    lineItems: [{ name: "", price: 0 }],
    status: "Pending",
  });
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedItems = [...formData.lineItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setFormData({ ...formData, lineItems: updatedItems });
  };

  const addLineItem = () => {
    setFormData({
      ...formData,
      lineItems: [...formData.lineItems, { name: "", price: 0 }],
    });
  };

  const removeLineItem = (index: number) => {
    if (formData.lineItems.length > 1) {
      const updatedItems = formData.lineItems.filter((_, i) => i !== index);
      setFormData({ ...formData, lineItems: updatedItems });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/create-estimate", formData);
      setFormData({
        customerId: 0,
        lineItems: [{ name: "", price: 0 }],
        status: "",
      });
    } catch (error) {
      console.error("Failed to create estimate:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Estimate</h2>
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
          Status:
          <select
            name="customerName"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            required
          >
            <option value={"Pending"}>Pending</option>
            <option value={"Approved"}>Approved</option>
            <option value={"Declined"}>Declined</option>
          </select>
        </label>

        <h3>Line Items:</h3>
        {formData.lineItems.map((item, index) => (
          <div key={index} className="line-item">
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) =>
                handleItemChange(
                  index,
                  "price",
                  parseFloat(e.target.value) || 0
                )
              }
              required
            />
            {formData.lineItems.length > 1 && (
              <button type="button" onClick={() => removeLineItem(index)}>
                Remove
              </button>
            )}
          </div>
        ))}

        <button className="form-button" type="button" onClick={addLineItem}>
          + Add Line Item
        </button>

        <button type="submit">Create Estimate</button>
      </form>
    </div>
  );
};

export default CreateNewEstimate;
