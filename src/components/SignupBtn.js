import React from "react";
import { ReactComponent as ArrowRight } from '../assets/arrow-right.svg';
import { useNavigate } from 'react-router-dom';  // useNavigate 추가
import "../styles/SignupBtn.css";

const SignupBtn = () => {
  const navigate = useNavigate();  // navigate 함수 사용

  const handleClick = () => {
    navigate("/signup");  // 클릭 시 /signup 경로로 이동
  };

  return (
    <button className="box" onClick={handleClick}>
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
