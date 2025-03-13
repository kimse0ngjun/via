import React, { useState } from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRight } from "../assets/arrow-right.svg";
import VIACom from "../assets/logo.png";
import line2 from "../assets/line-2.svg";

import "../styles/AppHeader.css";

const { Header } = Layout;

const AppHeader = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Layout>
      <Header className="header">
        <div className="box">
          <div className="overlap">
            <Link to="/login">
              <button className="login-btn">
                <div className="text-wrapper">login</div>
              </button>
            </Link>

            <Link to="/signup">
              <div className="signup-btn">
                <div className="overlap-group">
                  <div className="vuesax-linear-arrow-wrapper">
                    <ArrowRight className="vuesax-linear-arrow" />
                  </div>
                  <div className="div">signup</div>
                </div>
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
        </div>
      </Header>
    </Layout>
  );
};

export default AppHeader;
