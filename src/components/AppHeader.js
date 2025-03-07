import React from "react";
import { Layout, Menu, Button } from "antd";
import SignupBtn from "./SignupBtn";
import "../styles/AppHeader.css";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="app-header">
      <div className="logo">VIA.com</div>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]} className="menu">
        <Menu.Item key="1">진로</Menu.Item>
        <Menu.Item key="2">면접</Menu.Item>
        <Menu.Item key="3">관심분야</Menu.Item>
        <Menu.Item key="4">상담기록</Menu.Item>
      </Menu>
      <div className="auth-buttons">
        <Button type="primary" className="auth-button">
          로그인
        </Button>
        <SignupBtn />
      </div>
    </Header>
  );
};

export default AppHeader;
