import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <CssBaseline />
      <StylesProvider injectFirst>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </StylesProvider>
    </Router>
  );
}

export default App;
