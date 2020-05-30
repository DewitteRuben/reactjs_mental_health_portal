import React from "react";
import { Container, Box } from "@material-ui/core";
import LoginForm, { ILoginFormData } from "../components/LoginForm";
import { Redirect } from "react-router-dom";
import { IRootState } from "../redux/store";
import { selectAuthenticated } from "../redux/selectors/authSelectors";
import { connect } from "react-redux";
import { fetchAuthUser } from "../redux/actions/authActions";
import { ThunkDispatch } from "redux-thunk";

interface IHomeProps {
  authenticated: boolean;
  fetchAuth: (email: string, password: string) => void;
}

const Home: React.FC<IHomeProps> = ({ authenticated, fetchAuth }) => {
  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  const handleLogin = async (formData: ILoginFormData) => {
    const { email, password } = formData;
    fetchAuth(email, password);
  };

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

const mapStateToProps = (state: IRootState) => ({
  authenticated: selectAuthenticated(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchAuth: (email: string, password: string) =>
    dispatch(fetchAuthUser(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
