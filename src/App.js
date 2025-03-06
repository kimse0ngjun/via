import React from "react";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";

const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "20px" }}>메인 컨텐츠 영역</Content>
    </Layout>
  );
};

export default App;
