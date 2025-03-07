// src/components/AppHeader.js
import React from "react";
import { Layout } from "antd";  // Layout import
import { Link } from "react-router-dom";  // Link 사용
import { ReactComponent as ArrowRight } from "../assets/arrow-right.svg";  // ArrowRight SVG를 React 컴포넌트로 가져오기
import VIACom from "../assets/logo.png";  // VIA-com 이미지 경로
import line2 from "../assets/line-2.svg";  // line2 이미지 경로
import vector1 from "../assets/vector-1.svg";  // vector1 이미지 경로
import vector2 from "../assets/vector-2.svg";  // vector2 이미지 경로
import vector3 from "../assets/vector-3.svg";  // vector3 이미지 경로
import vector4 from "../assets/vector-4.svg";  // vector4 이미지 경로

import "../styles/AppHeader.css";  // 헤더 스타일시트

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Layout>
      {/* 헤더 내부 구조 */}
      <Header className="header">
        <div className="box">
          <div className="overlap">
            {/* 로그인 버튼 클릭 시 LoginPage로 이동 */}
            <Link to="/login">
              <button className="login-btn">
                <div className="text-wrapper">login</div>
              </button>
            </Link>

            {/* 회원가입 버튼 클릭 시 SignupPage로 이동 */}
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

            {/* Line, VIA Logo */}
            <img className="line" alt="Line" src={line2} />
            
            {/* VIA Logo 클릭 시 루트 페이지로 이동 */}
            <Link to="/">
              <img className="VIA-com" alt="VIA Logo" src={VIACom} />
            </Link>

            {/* 네비게이션 바 */}
            <div className="navbar">
              <div className="text-wrapper-2">진로</div>
              <div className="text-wrapper-3">면접</div>
              <img className="vector" alt="Vector" src={vector1} />
              <div className="text-wrapper-4">관심분야</div>
              <img className="img" alt="Vector" src={vector3} />
              <div className="text-wrapper-5">상담기록</div>
              <img className="vector-2" alt="Vector" src={vector4} />
              <img className="vector-3" alt="Vector" src={vector2} />
            </div>
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default AppHeader;
