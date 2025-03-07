// src/components/AppHeader.js
import React from "react";
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";  // Link 사용
import SignupBtn from "./SignupBtn";
import logo from "../assets/logo.png";  // 로고 이미지 경로

import "../styles/AppHeader.css";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="app-header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="VIA Logo" />
        </Link>
      </div>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]} className="menu">
        <Menu.Item key="1">진로</Menu.Item>
        <Menu.Item key="2">면접</Menu.Item>
        <Menu.Item key="3">관심분야</Menu.Item>
        <Menu.Item key="4">상담기록</Menu.Item>
      </Menu>
      <div className="auth-buttons">
        <Link to="/login">  {/* 로그인 버튼 클릭 시 LoginPage로 이동 */}
          <Button type="primary" className="auth-button">
            로그인
          </Button>
        </Link>
        <SignupBtn />
      </div>
    </Header>
  );
};

export default AppHeader;
