import React from "react";
import PropTypes from "prop-types";

import Calendar from "./Calendar";

class Filter extends React.Component {
  state = {
    show: false
  };

  showModal = () => this.setState({ show: true });
  hideModal = () => this.setState({ show: false });
  render() {
    return (
      <div>
        <button className="filterBtn" onClick={this.showModal}>
          Select Filter
        </button>
        <Calendar
          applyDates={this.props.applyDates}
          addRange={this.props.addRange}
          show={this.state.show}
          hideModal={this.hideModal}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  addRange: PropTypes.func.isRequired,
  applyDates: PropTypes.func.isRequired
};

export default Filter;
