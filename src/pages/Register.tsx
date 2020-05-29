import React from "react";
import { Container, Box } from "@material-ui/core";
import RegisterForm, { IRegisterFormData } from "../components/RegisterForm";
import { registerProfessional } from "../api/authApi";

const Register: React.FC = () => {
  const handleOnRegister = async (formData: IRegisterFormData) => {
    const { confirmPassword, ...other } = formData;
    const professional = { ...other };

    try {
      const response = await registerProfessional(professional);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Box
        justifyContent="center"
        alignItems="center"
        height="100%"
        display="flex"
      >
        <RegisterForm onSubmit={handleOnRegister} />
      </Box>
    </Container>
  );
};

export default Register;
