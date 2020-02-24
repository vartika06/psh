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
      const dateObject = {
        d: e.target.id,
        m: moment(this.state.date).format("MM"),
        y: moment(this.state.date).format("YYYY")
      };
      //console.log(`${dateObject.d}/${dateObject.m}/${dateObject.y}`);
      //console.log(element);
      element.classList.add("highlight");
      const range = this.state.range;
      range.push(dateObject);
      range.sort(function(a, b) {
        const day1 = parseInt(a.d);
        const day2 = parseInt(b.d);

        const month1 = parseInt(a.m);
        const month2 = parseInt(b.m);

        const year1 = parseInt(a.y);
        const year2 = parseInt(b.y);

        return (
          new Date(year1, month1, day1, 10, 33, 30, 0) -
          new Date(year2, month2, day2, 10, 33, 30, 0)
        );
      }); //sorting the dates
      // console.log(range);
      this.setState({ ...this.state, range });
    }

    //console.log(this.state.range);
    if (this.state.range.length == 2) {
      const unix1 = parseInt(
        (
          new Date(
            `${this.state.range[0].y}.${this.state.range[0].m}.${this.state.range[0].d}`
          ).getTime() / 1000
        ).toFixed(0)
      );
      const unix2 = parseInt(
        (
          new Date(
            `${this.state.range[1].y}.${this.state.range[1].m}.${this.state.range[1].d}`
          ).getTime() / 1000
        ).toFixed(0)
      );
      localStorage.setItem("unix1", unix1);
      localStorage.setItem("unix2", unix2);
      this.props.addRange(this.state);
    }
  };

  handleApply = e => {
    if (this.state.range.length == 2) {
      this.props.applyDates();
      this.props.hideModal();
      const element1 = document.getElementById(this.state.range[0].d);
      const element2 = document.getElementById(this.state.range[1].d);
      element1.classList.remove("highlight");
      element2.classList.remove("highlight");
      this.setState({ ...this.state, range: [] });
    }
  };

  handleCancel = () => {
    if (this.state.range.length == 2) {
      const element1 = document.getElementById(this.state.range[0].d);
      const element2 = document.getElementById(this.state.range[1].d);
      element1.classList.remove("highlight");
      element2.classList.remove("highlight");
      this.setState({ ...this.state, range: [] });
    }

    this.props.hideModal();
  };

  weekdayshort = moment.weekdaysShort();

  render() {
    const days = moment(this.state.date, "YYYY-MM").daysInMonth();
    const year = moment(this.state.date).format("YYYY");
    const month = moment(this.state.date).format("MMMM");
    const dates = [];
    const firstDayOfMonth = moment(this.state.date)
      .startOf("month")
      .format("d");

    let weekdayshortname = this.weekdayshort.map(day => {
      return (
        <div key={day} className="day">
          {day}
        </div>
      );
    });

    let blanks = [];
    for (let j = 0; j < firstDayOfMonth; j++) {
      blanks.push(
        <div key={j} className="blankSpace">
          {" "}
        </div>
      );
    }

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

          <div className="daysRow">{weekdayshortname}</div>

          <div className="contentCalendar">
            {blanks}
            {dates}
          </div>
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
