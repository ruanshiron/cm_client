import React from "react";
import { Redirect } from "react-router";

interface StateProps {}

const HomeOrTutorial: React.FC<StateProps> = () => {
  return <Redirect to="/tabs/dashboard" />;
};

export default HomeOrTutorial;
