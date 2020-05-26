import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import Home from "./pages/Home";
import theme from "./theme";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </ThemeProvider>
      </StylesProvider>
    </Router>
  );
}

export default App;
