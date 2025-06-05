// src/components/Layout.js
import React from "react";
import { Box, Toolbar } from "@mui/material";
import AppHeader from "./AppHeader";

const Layout = ({ children }) => {
  return (
    <>
      <AppHeader />
      <Toolbar /> {/* 헤더 높이만큼 여백 자동 확보 */}
      <Box sx={{ p: 2 }}>{children}</Box>
    </>
  );
};

export default Layout;
