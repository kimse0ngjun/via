import React, { useState, useEffect, useContext } from "react";
import { Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import VIACom from "../assets/via_logo.svg";
import line2 from "../assets/line-2.svg";

import "../styles/AppHeader.css";
import { AuthContext } from '../contexts/AuthContext'; // AuthContext import

const { Header } = Layout;

const AppHeader = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext); // Context에서 isLoggedIn 상태와 logout 함수 가져오기

  const handleNavigationClick = (index, label) => {
    setActiveIndex(null);
    if (label === "진로") {
      navigate("/career");
    } else if (label === "면접") {
      navigate("/interview");
    } else if (label === "관심분야") {
      navigate("/interests");
    } else if (label === "상담기록") {
      navigate("/counseling-history");
    }
  };

  return (
    <Layout>
      <Header className="header">
        <div className="box">
          {isLoggedIn ? (
            <button onClick={logout} className="logout-btn">
              <div className="overlap-group">로그아웃</div>
            </button>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                <div className="overlap-group">로그인</div>
              </Link>

              <Link to="/signup" className="signup-btn">
                <div className="overlap-group">
                  <div className="div">회원가입</div>
                </div>
              </Link>
            </>
          )}

          <img className="line" alt="Line" src={line2} />

          <Link to="/">
            <img className="VIA-com" alt="VIA Logo" src={VIACom} />
          </Link>

          <div className="navbar">
            {["진로", "면접", "관심분야", "상담기록"].map((label, index) => (
              <Link
                key={index}
                to={`/${label.toLowerCase().replace(" ", "-")}`}
                className={`nav-item ${activeIndex === index ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => handleNavigationClick(index, label)}
              >
                <div className="nav-text">{label}</div>
              </Link>
            ))}
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default AppHeader;