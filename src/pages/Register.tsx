import React from "react";
import { Container, Box } from "@material-ui/core";
import RegisterForm from "../components/RegisterForm";

const Register: React.FC = () => {
  return (
    <Container>
      <Box
        justifyContent="center"
        alignItems="center"
        height="100%"
        display="flex"
      >
        <RegisterForm onSubmit={(item) => console.log(item)} />
      </Box>
    </Container>
  );
};

export default Register;
