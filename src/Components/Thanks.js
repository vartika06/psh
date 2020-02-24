import React from "react";
import PropTypes from "prop-types";

class Thanks extends React.Component {
  componentDidMount() {
    window.location.href = `http://py.lyzer.io/getCSV?companyKey=${localStorage.getItem(
      "company"
    )}&fromDate=${localStorage.getItem("unix1")}&toDate=${localStorage.getItem(
      "unix2"
    )}`;
  }
  render() {
    // const day1 = parseInt(this.props.info.range[0].d);
    // const day2 = parseInt(this.props.info.range[1].d);

    // const month1 = parseInt(this.props.info.range[0].m);
    // const month2 = parseInt(this.props.info.range[1].m);

    // const year1 = parseInt(this.props.info.range[0].y);
    // const year2 = parseInt(this.props.info.range[1].y);
    console.log(this.props.info);
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
  info: PropTypes.object.isRequired
};

export default Thanks;
