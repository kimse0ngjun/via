import React from "react";
import { ReactComponent as ArrowRight } from '../assets/arrow-right.svg';
import "../styles/SignupBtn.css";

const SignupBtn = () => {
  return (
    <button className="box">
      <div className="signup-btn">
        <div className="overlap-group">
          <div className="overlap">
            <ArrowRight className="vuesax-linear-arrow" />
          </div>
          <div className="text-wrapper">signup</div>
        </div>
      </div>
    </button>
  );
};

export default SignupBtn;
