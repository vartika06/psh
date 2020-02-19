import React from "react";
import Filter from "./Filter";
import PropTypes from "prop-types";

import moment from "moment";

class MyForm extends React.Component {
  state = {
    company: ""
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addCompany(this.state.company);
    //this.setState({ company: "" });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  applyDates = () => {
    const date1 = this.props.info.range[0];
    const date2 = this.props.info.range[1];
    const month = moment(this.props.info.date).format("MM");
    const year = moment(this.props.info.date).format("YYYY");
    const from = `${date1}/${month}/${year}`;
    const to = `${date2}/${month}/${year}`;
    document.getElementById("from").value = from;
    document.getElementById("to").value = to;
  };

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
          <Filter addRange={this.props.addRange} applyDates={this.applyDates} />
          <button className="submitBtn" onClick={this.props.handleSubmit}>
            Submit
          </button>
          {/* <input
            onSubmit={this.props.handleSubmit}
            className="submitBtn"
            type="submit"
            value="Submit"
          /> */}
        </form>
      </div>
    );
  }
}

MyForm.propTypes = {
  addCompany: PropTypes.func.isRequired,
  addRange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired
};

export default MyForm;
