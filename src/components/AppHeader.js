import React from "react";
import { Layout, Menu } from "antd";
import "./AppHeader.css";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="app-header">
      <div className="logo">VIA.com</div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} className="menu">
        <Menu.Item key="1">진로</Menu.Item>
        <Menu.Item key="2">면접</Menu.Item>
        <Menu.Item key="3">관심분야</Menu.Item>
        <Menu.Item key="4">상담기록</Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
