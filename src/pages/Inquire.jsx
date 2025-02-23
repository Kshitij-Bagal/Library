import React, { useState } from "react";
import "../styles/Inquire.css";

const Inquire = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "Book Availability",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage("Your inquiry has been submitted successfully!");
        setFormData({ name: "", email: "", inquiryType: "Book Availability", message: "" });
      } else {
        alert(result.error || "Failed to submit inquiry.");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="inquire-container">
      <h1>Book Inquiry</h1>
      <div className="inqure-form">
        <p>Have questions about books? Submit your inquiry below.</p>

        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label>
            Inquiry Type:
            <select className="i_select" name="inquiryType" value={formData.inquiryType} onChange={handleChange}>
              <option>Book Availability</option>
              <option>Request a New Book</option>
              <option>Book Recommendations</option>
              <option>Membership & Borrowing</option>
            </select>
          </label>

          <label>
            Message:
            <textarea name="message" value={formData.message} onChange={handleChange} required />
          </label>

          <button type="submit">Submit Inquiry</button>
        </form>

        <div className="contact-info">
          <h2>Other Ways to Reach Us</h2>
          <p>Email: <a href="mailto:support@library.com">support@library.com</a></p>
          <p>Phone: +1 123-456-7890</p>
          <p>Address: 123 Library Street, City, Country</p>
        </div>
      </div>
    </div>
  );
};

export default Inquire;
