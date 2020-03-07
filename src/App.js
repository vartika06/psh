import React from "react";
import MyForm from "./Components/MyForm";
import Thanks from "./Components/Thanks";
import Calendar from "./Components/Calendar";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import moment from "moment";

class App extends React.Component {
  state = {
    company: "",
    date: moment(),
    range: [],
    submitted: false
  };

  addCompany = name => {
    this.setState({ company: name });
    localStorage.setItem("company", name);
  };

  addRange = range => {
    this.setState({ ...this.state, range, submitted: true });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Switch>
              <Route exact path="/">
                <MyForm
                  addCompany={this.addCompany}
                  addRange={this.addRange}
                  info={this.state}
                />{" "}
                {console.log(this.state)}
              </Route>
              <Route path="/thanks">
                <Thanks info={this.state} />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
