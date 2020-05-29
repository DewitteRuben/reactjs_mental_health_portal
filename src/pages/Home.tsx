import React from "react";
import { Container, Box } from "@material-ui/core";
import LoginForm, { ILoginFormData } from "../components/LoginForm";
import { auth } from "../api/authApi";
import { AuthContext } from "../store/authStore";
import { Redirect } from "react-router-dom";

const Home: React.FC = () => {
  const { state, dispatch } = React.useContext(AuthContext);

  const handleLogin = async (data: ILoginFormData) => {
    const { email, password } = data;
    try {
      const resp = await auth(email, password);
      const { token } = resp;
      dispatch({
        type: "UPDATE",
        payload: { token, authenticated: true, status: "AUTHENTICATED" },
      });
    } catch (error) {}
  };

  if (state.authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Box
        justifyContent="center"
        alignItems="center"
        height="100%"
        display="flex"
      >
        <LoginForm onSubmit={handleLogin} />
      </Box>
    </Container>
  );
};

export default Home;
