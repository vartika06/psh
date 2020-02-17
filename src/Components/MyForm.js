import React from "react";
import Filter from "./Filter";
import PropTypes from "prop-types";

const MyForm = props => {
  return (
    <div>
      <form className="formStyle">
        <h1 className="formHeading">Download your CSV</h1>
        <div
          className="content"
          style={{
            display: "inline"
          }}
        >
          <div className="field">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              name="company"
              id="company"
              placeholder="Company"
            />
          </div>
          <div className="field" style={{ display: "inline" }}>
            <label htmlFor="from">From</label>
            <input type="text" id="from" name="from" placeholder="DD/MM/YYYY" />
            <label htmlFor="to">To</label>
            <input type="text" id="to" name="to" placeholder="DD/MM/YYYY" />
          </div>
        </div>
        <Filter />
        <input type="submit" value="Submit" style={{ display: "block" }} />
      </form>
    </div>
  );
};

MyForm.propTypes = {};

export default MyForm;
