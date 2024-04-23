import React, { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./contactForm.css";
import { GlobalContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const { isModalOpen, detailsPopup } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
    setErrors({ ...errors, phoneNumber: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    }
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email Address is required";
    }

      // Validate form fields
      // ... existing validation logic

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      try {
        await axios.post("https://sheetdb.io/api/v1/psgmix87nfzzi", formData);
        alert("Form submitted successfully!");
        setFormData({
          // ... reset form data
        });
        // Navigate to `/vgrowU-info` after successful submission
        navigate("/vgrowU-info");
      } catch (error) {
        console.error("Error:", error);
      }
  };

  return (
    <>
      <div
        className={
          isModalOpen ? "form_container_open" : "form_container_closed"
        }
      >
        <div className="overlay" onClick={detailsPopup}></div>
        <div className="form-container">
          <ion-icon
            name="close-outline"
            className="form_close_btn"
            onClick={detailsPopup}
          ></ion-icon>
          <h2 className="form_heading">
            Enter your info to get instant access to our DEVELOPMENT Video
          </h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className={`form-group ${errors.fullName && "has-error"}`}>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="input-field"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <span className="error-message">{errors.fullName}</span>
              )}
            </div>
            <div className={`form-group ${errors.phoneNumber && "has-error"}`}>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <PhoneInput
                country={"us"}
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                className="input-field-phone"
              />
              {errors.phoneNumber && (
                <span className="error-message">{errors.phoneNumber}</span>
              )}
            </div>
            <div className={`form-group ${errors.emailAddress && "has-error"}`}>
              <label htmlFor="emailAddress">Email Address:</label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className="input-field"
              />
              {errors.emailAddress && (
                <span className="error-message">{errors.emailAddress}</span>
              )}
            </div>
            <button
              type="submit"
              className="submit-button"
            >
              WATCH NOW FOR FREE
            </button>
            <p className="info_secure">YOUR INFORMATION IS 100% SECURE</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
