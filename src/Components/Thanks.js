import React from "react";
import PropTypes from "prop-types";

class Thanks extends React.Component {
  componentDidMount() {
    window.location.href =
      "http://py.lyzer.io/getCSV?companyKey=BERRYLUSH&fromDate=1451606400&toDate=1582121290";
  }
  render() {
    return (
      <div>
        <h1 className="thanksHeading">
          Thanks {localStorage.getItem("company")}
        </h1>
        <p className="thanksContent">
          {" "}
          Your csv will be downloaded in a minute.
        </p>
      </div>
    );
  }
}

Thanks.propTypes = {
  company: PropTypes.string.isRequired
};

export default Thanks;
