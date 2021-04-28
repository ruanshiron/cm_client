import React from "react";
import { Redirect } from "react-router";

const MainRoutes = () => {
  return (
    <>
      <Redirect from="*" to="/tabs" />
    </>
  );
};

export default MainRoutes;
