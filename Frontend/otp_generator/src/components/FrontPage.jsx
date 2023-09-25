import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FrontPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  var phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    return phoneNumberPattern.test(phoneNumber);
  };
  return (
    <div>
      <div className="logo">
        <img
          className="clientImage"
          src={require("../static/AK_logo.png")}
          alt=""
        />
        <p className="welcome">Welcome Back</p>
        <p className="line">Please Sign into your account</p>
        <div className="input-container">
          <label className="placeholder">Enter Contact Number</label>
          <PhoneInput
            className="number"
            id="id"
            name="otp"
            country={"in"}
            value={phoneNumber}
            onChange={handleChange}
            inputProps={{
              required: true,
            }}
          />

          {!valid && (
            <div style={{ color: "red" }}>
              Please enter a valid phone number.
            </div>
          )}
        </div>
        <div className="info-container">
          <div className="info">We will send you a one time SMS message.</div>
          <div className="info">Charges may apply.</div>
          <Link
            onClick={() => {
              setValid(false);
            }}
            to={{
              pathname:
                phoneNumberPattern.test(phoneNumber) && phoneNumber.length >= 12
                  ? `/otp`
                  : `/`,
              state: { phoneNumber: phoneNumber },
            }}
            className="signin"
          >
            Sign in with OTP
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
