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
              style={{ marginLeft: "100px", width: "526px", height: "40px" }}
            />
          </div>
          <div className="field" style={{ display: "inline" }}>
            <label htmlFor="from">From</label>
            <input
              type="text"
              id="from"
              name="from"
              placeholder="DD/MM/YYYY"
              style={{
                width: "151px",
                height: "39px",
                marginLeft: "135px"
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
        <input
          className="submitBtn"
          type="submit"
          value="Submit"
          style={{ display: "block" }}
        />
      </form>
    </div>
  );
};

MyForm.propTypes = {};

export default MyForm;
