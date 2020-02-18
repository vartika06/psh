import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

class Calendar extends React.Component {
  state = {
    date: moment()
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

  render() {
    const days = moment(this.state.date, "YYYY-MM").daysInMonth();
    const year = moment(this.state.date).format("YYYY");
    const month = moment(this.state.date).format("MMMM");
    const dates = [];

    for (let i = 1; i <= days; i++) {
      dates.push(
        <div key={i} className="date">
          {i}
        </div>
      );
    }

    return (
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
            <button>Cancel</button>
          </div>
          <div className="button-apply">
            <button>Apply</button>
          </div>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {};

export default Calendar;
