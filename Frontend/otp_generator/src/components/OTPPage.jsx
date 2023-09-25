import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SnackBar from "./SnackBar";
import axios from "axios";

function OTPPage() {
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || "";

  const [showSnackBar, setShowSnackBar] = useState(true);
  const [otp, setOtp] = useState("");
  const [inputValues, setInputValues] = useState(["", "", "", ""]);
  const [url, setUrl] = useState("/otp");
  const [isIncorrectOTP, setIsIncorrectOTP] = useState(false); // Track incorrect OTP

  const msg = isIncorrectOTP
    ? "Incorrect OTP"
    : `OTP received on +${phoneNumber} : ${otp}`;

  const handleError = () => {
    const otpEntered = inputValues.join("");
    if (Number(otp) !== Number(otpEntered)) {
      setIsIncorrectOTP(true);
      setShowSnackBar(true);
      setTimeout(() => {
        setShowSnackBar(false);
      }, 3000);
    } else {
      setIsIncorrectOTP(false); // Reset if OTP is correct
      if (url === "/otp") {
        setUrl("/welcome");
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setShowSnackBar(false);
    }, 5000);
  }, []);
  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  useEffect(() => {
    let callOTPapi = async () => {
      try {
        const response = await axios.get("http://localhost:8000/");
        const otpValue = response.data.otp;
        setOtp(otpValue);
      } catch (err) {
        console.error(`Error fetching OTP : ${err}`);
      }
    };
    callOTPapi();
  }, []);

  return (
    <div className="OTPPage">
      {showSnackBar && <SnackBar msg={msg} />}
      <div className="logo2">
        <img
          src={require("../static/undraw_confirmed_81ex.png")}
          alt="otp_logo"
        />
      </div>
      <div className="pls-verify">Please verify Mobile number</div>
      <div className="otpsent">An OTP is sent to +{phoneNumber}</div>
      <Link to="/" className="chng-num">
        Change Phone Number
      </Link>
      <div className="otp-boxes">
        {inputValues.map((value, index) => (
          <input
            key={index}
            type="text"
            className="otpBox"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <div className="resend-container">
        <div className="otp-sent">Didn't receive the code?</div>
        <Link
          to="/otp"
          onClick={() => window.location.reload()}
          className="chng-num"
        >
          Resend
        </Link>
      </div>
      <Link
        to={{
          pathname:
            Number(otp) === Number(inputValues.join("")) ? `/welcome` : `/otp`,
        }}
        className="verify"
        onClick={(e) => {
          if (Number(otp) !== Number(inputValues.join(""))) {
            e.preventDefault(); // Prevent navigation
            handleError();
          } else {
            handleError(); // Call handleError if the condition is met
          }
        }}
      >
        Verify
      </Link>
    </div>
  );
}

export default OTPPage;
