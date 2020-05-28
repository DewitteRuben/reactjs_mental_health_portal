import React from "react";
import { Container, Box } from "@material-ui/core";
import LoginForm from "../components/LoginForm";

const Home: React.FC = () => {
  return (
    <Container>
      <Box
        justifyContent="center"
        alignItems="center"
        height="100%"
        display="flex"
      >
        <LoginForm />
      </Box>
    </Container>
  );
};

export default Home;
