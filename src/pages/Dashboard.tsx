import React from "react";
import { Container } from "@material-ui/core";
import { AuthContext } from "../store/authStore";
import { Redirect } from "react-router";

const Dashboard: React.FC = () => {
  const { state } = React.useContext(AuthContext);

  if (!state.authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <p>Dashboard</p>
    </Container>
  );
};

export default Dashboard;
