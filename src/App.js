import React from "react";
import MyForm from "./Components/MyForm";
import Thanks from "./Components/Thanks";
import Calendar from "./Components/Calendar";

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
  };

  addRange = calendar => {
    const date = calendar.date;
    const range = calendar.range;
    this.setState({ ...this.state, date, range });
  };

  handleSubmit = () => {
    if (this.state.range.length == 2)
      this.setState({ ...this.state, submitted: true });
  };

  render() {
    return (
      <div className="App">
        {this.state.submitted ? (
          <Thanks company={this.state.company} />
        ) : (
          <MyForm
            addCompany={this.addCompany}
            addRange={this.addRange}
            info={this.state}
            handleSubmit={this.handleSubmit}
          />
        )}

        {console.log(this.state)}
        {/* <Calendar addRange={this.addRange} />
        {console.log(this.state)} */}
      </div>
    );
  }
}

export default App;
