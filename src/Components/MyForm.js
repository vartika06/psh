import React from "react";
import Filter from "./Filter";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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

  handleSubmitBtn = () => {
    if (this.props.info.submitted) {
      localStorage.setItem("company", this.props.info.company);
      window.open("/thanks", "_blank");
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  applyDates = () => {
    const date1 = this.props.info.range[0];
    const date2 = this.props.info.range[1];
    //const month = moment(this.props.info.date).format("MM");
    //const year = moment(this.props.info.date).format("YYYY");
    const from = `${date1.d}/${date1.m}/${date1.y}`;
    const to = `${date2.d}/${date2.m}/${date2.y}`;
    document.getElementById("from").value = from;
    document.getElementById("to").value = to;
  };

  render() {
    return (
      <form className="formStyle" onSubmit={this.onSubmit}>
        <h1 className="formHeading row">Download your CSV</h1>
        <div className="field row">
          <div className="col-lg-12 form-group">
            <label htmlFor="Company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              className="form-control"
              onChange={this.onChange}
              style={{ width: "75%", height: "30px" }}
            />
          </div>
        </div>
        <div className="field row">
          <div className="col-lg-5 col-sm-12 col-xs-12 form-group">
            <label htmlFor="from">From</label>
            <input
              type="text"
              id="from"
              name="from"
              className="form-control"
              placeholder="DD/MM/YYYY"
              style={{ width: "75%", height: "30px" }}
            />
          </div>
          <div className="col-lg-5 col-sm-12 toField form-group">
            <label htmlFor="to"> To</label>
            <input
              type="text"
              id="to"
              name="to"
              className="form-control"
              placeholder="DD/MM/YYYY"
              style={{ width: "75%", height: "30px" }}
            />
          </div>
          <Filter
            className="form-control"
            addRange={this.props.addRange}
            applyDates={this.applyDates}
          />
        </div>
        <div className="row">
          <button className="submitBtn" onClick={this.handleSubmitBtn}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}

MyForm.propTypes = {
  addCompany: PropTypes.func.isRequired,
  addRange: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired
};

export default MyForm;
