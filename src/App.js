import React from "react";
import MyForm from "./Components/MyForm";
import Thanks from "./Components/Thanks";
import Calendar from "./Components/Calendar";

import "./App.css";

class App extends React.Component {
  state = {
    company: "",
    submitted: false
  };

  addCompany = name => {
    this.setState({ company: name, submitted: true });
  };
  render() {
    return (
      <div className="App">
        {/* {this.state.submitted ? (
          <Thanks company={this.state.company} />
        ) : (
          <MyForm addCompany={this.addCompany} company={this.state.company} />
        )} */}
        <Calendar />
      </div>
    );
  }
}

export default App;
