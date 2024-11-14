import React from "react";

import { Outlet } from "react-router-dom";
import HeaderSection from "./header/HeaderSection";

const Layout = () => {
  return (
    <div>
      <HeaderSection />
      <Outlet />
    </div>
  );
};

export default Layout;
