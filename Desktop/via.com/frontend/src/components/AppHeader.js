import React, { useState } from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import VIACom from "../assets/via_logo.svg";
import line2 from "../assets/line-2.svg";

import "../styles/AppHeader.css";

const { Header } = Layout;

const AppHeader = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Layout>
      <Header className="header">
        <div className="box">
          <Link to="/login" className="login-btn">
            <div className="overlap-group">로그인</div>
          </Link>

          <Link to="/signup" className="signup-btn">
            <div className="overlap-group">
              
              <div className="div">회원가입</div>
            </div>
          </Link>

          <img className="line" alt="Line" src={line2} />

          <Link to="/">
            <img className="VIA-com" alt="VIA Logo" src={VIACom} />
          </Link>

          <div className="navbar">
            {["진로", "면접", "관심분야", "상담기록"].map((label, index) => (
              <div
                key={index}
                className={`nav-item ${activeIndex === index ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="nav-text">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default AppHeader;
