import React from "react";
import Filter from "./Filter";
import PropTypes from "prop-types";

class MyForm extends React.Component {
  state = {
    company: ""
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addCompany(this.state.company);
    this.setState({ company: "" });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <form className="formStyle" onSubmit={this.onSubmit}>
          <h1 className="formHeading">Download your CSV</h1>
          <div className="content">
            <div className="field">
              <label htmlFor="Company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                style={{
                  width: "526px",
                  height: "40px",
                  marginLeft: "135px"
                }}
                onChange={this.onChange}
              />
            </div>

            <div className="field">
              <label htmlFor="from">From</label>
              <input
                type="text"
                id="from"
                name="from"
                placeholder="DD/MM/YYYY"
                style={{
                  width: "151px",
                  height: "39px",
                  marginLeft: "170px"
                }}
              />
              <label htmlFor="to" style={{ marginLeft: "140px" }}>
                {" "}
                To
              </label>
              <input
                type="text"
                id="to"
                name="to"
                placeholder="DD/MM/YYYY"
                style={{ width: "171px", height: "41px", marginLeft: "40px" }}
              />
            </div>
          </div>
          <Filter />
          <input className="submitBtn" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

MyForm.propTypes = {
  addCompany: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired
};

export default MyForm;
