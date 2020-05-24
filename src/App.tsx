import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
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
