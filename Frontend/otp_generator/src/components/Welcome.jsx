import React from "react";

function Welcome() {
  return (
    <div className="welcome">
      <div className="logoStyle">
        <img src={require("../static/Artboard 1.png")} alt="" />
      </div>
      <div className="tagline">Welcome to AdmitKard</div>
      <div className="intro-container">
        <div className="intro1">In order to provide you with</div>
        <div className="intro1">a custom experience,</div>
        <div className="intro2">we need to ask you a few questions.</div>
      </div>
      <button className="start">Get Started</button>
      <div className="lastline">*This will only take 5 min.</div>
    </div>
  );
}

export default Welcome;
