import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

class Calendar extends React.Component {
  state = {
    date: moment(),
    range: []
  };

  onNext = () => {
    this.setState({
      date: moment(this.state.date, "YYYY-MM--DD").add(1, "month")
    });
  };

  onPrev = () => {
    this.setState({
      date: moment(this.state.date, "YYYY-MM--DD").subtract(1, "month")
    });
  };

  OnDateClick = e => {
    if (this.state.range.length < 2) {
      const element = document.getElementById(e.target.id);
      element.classList.add("highlight");
      const range = this.state.range;
      range.push(e.target.id);
      this.setState({ ...this.state, range });
    }
    if (this.state.range.length == 2) this.props.addRange(this.state);
  };

  handleApply = e => {
    this.props.applyDates();
    this.props.hideModal();
  };

  handleCancel = () => {
    if (this.state.range.length == 2) {
      const element1 = document.getElementById(this.state.range[0]);
      const element2 = document.getElementById(this.state.range[1]);
      element1.classList.remove("highlight");
      element2.classList.remove("highlight");
      this.setState({ ...this.state, range: [] });
    }

    this.props.hideModal();
  };

  render() {
    const days = moment(this.state.date, "YYYY-MM").daysInMonth();
    const year = moment(this.state.date).format("YYYY");
    const month = moment(this.state.date).format("MMMM");
    const dates = [];

    const myClass = this.props.show
      ? "modal display-block"
      : "modal display-none";

    for (let i = 1; i <= days; i++) {
      dates.push(
        <div id={i} key={i} className="date" onClick={this.OnDateClick}>
          {i}
        </div>
      );
    }

    return (
      <div className={myClass}>
        <div className="myCalendar">
          <div className="calendarYear">Calendar {year}</div>
          <div className="monthRow">
            <div className="prevControl" onClick={this.onPrev}>
              Previous
            </div>
            <div className="month">{month}</div>
            <div className="nextControl" onClick={this.onNext}>
              Next
            </div>
          </div>
          <div className="contentCalendar">{dates}</div>
          <div className="calendarBtns">
            <div className="button-cancel">
              <button onClick={this.handleCancel}>Cancel</button>
            </div>
            <div className="button-apply">
              <button onClick={this.handleApply}>Apply</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  addRange: PropTypes.func.isRequired,
  applyDates: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired
};

export default Calendar;
