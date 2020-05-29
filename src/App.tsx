import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import Home from "./pages/Home";
import theme from "./theme";
import Header from "./components/Header";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./store/authStore";
import ClientDetail from "./pages/ClientDetail";

function App() {
  return (
    <Router>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Header />
            <Switch>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route path="/login">
                <Home />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/client/:id">
                <ClientDetail />
              </Route>
            </Switch>
          </AuthProvider>
        </ThemeProvider>
      </StylesProvider>
    </Router>
  );
}

export default App;
