import "./ClaimItem.css";
import { useParams } from "react-router-dom";
import { useState } from "react";

function ClaimItem() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.reason
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    alert("🎉 Claim submitted successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      reason: "",
    });
  };

  return (
    <div className="claim-page">
      <div className="claim-box">
        <h1>Claim This Item</h1>

        <p className="item-id">
          <strong>Item ID:</strong> {id}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            name="reason"
            placeholder="Explain why this item belongs to you"
            value={formData.reason}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="submit-claim">
            Submit Claim
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClaimItem;