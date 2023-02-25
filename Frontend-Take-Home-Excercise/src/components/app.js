import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Form from "./pages/form";

// App by Alec Whitten


/* App center with links that pull up the pages as requested by user.
This project only has one link however. */

export default class App extends Component {

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Form} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}