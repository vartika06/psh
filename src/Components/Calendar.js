import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

class Calendar extends React.Component {
  from = React.createRef();
  to = React.createRef();
  highlight = React.createRef();
  state = {
    date: moment(),
    range: [],
    highlightDates: [],
    betweenDates: [],
    from: "",
    to: "",
    activeBtn: 0
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

  handleUpControl = () => {
    this.setState({
      date: moment(this.state.date, "YYYY-MM--DD").subtract(1, "year")
    });
  };

  handleDownControl = () => {
    this.setState({
      date: moment(this.state.date, "YYYY-MM--DD").add(1, "year")
    });
  };

  handleCancel = () => {
    if (this.state.range.length == 2) {
      this.setState({
        ...this.state,
        range: [],
        highlightDates: [],
        betweenDates: []
      });
    }
    this.props.hideModal();
  };

  generateDate = dateObject => {
    const day = parseInt(dateObject.d);
    const month = parseInt(dateObject.m);
    const year = parseInt(dateObject.y);
    const date = moment(`${month}-${day}-${year}`, "MM-D-YYYY");
    return date;
  };

  generateBetweenDates = (startDate, endDate) => {
    let betweenDates = [];
    let currentDate = moment(startDate).add(1, "day");
    let stopDate = moment(endDate);
    while (currentDate < stopDate) {
      let i = moment(currentDate).format("D");
      let m = moment(currentDate).format("MM");
      let y = moment(currentDate).format("YYYY");
      let d = parseInt(i + m + y);
      betweenDates.push(d);
      currentDate = moment(currentDate).add(1, "days");
    }
    return betweenDates;
  };
  OnDateClick = e => {
    let highlightDates = [...this.state.highlightDates];
    let betweenDates = [...this.state.betweenDates];
    let range = [...this.state.range];
    if (highlightDates.length >= 2) {
      highlightDates = [];
      betweenDates = [];
      range = [];
      this.setState({ ...this.state, range, highlightDates, betweenDates });
    }
    if (highlightDates.length < 2) {
      this.from.current.value = "";
      this.to.current.value = "";
      highlightDates.push(e.target.dataset.id);
      const dateObject = {
        d: e.target.dataset.d,
        m: e.target.dataset.month,
        y: e.target.dataset.year,
        month: e.target.dataset.monthname
      };
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
      });
      this.setState({
        ...this.state,
        range,
        highlightDates,
        betweenDates,
        activeBtn: 0
      });

      if (range.length == 2) {
        let startDate = this.generateDate(range[0]);
        let endDate = this.generateDate(range[1]);
        betweenDates = this.generateBetweenDates(startDate, endDate);
        this.setState({ ...this.state, range, highlightDates, betweenDates });
        this.props.addRange(range);
      }
    }
  };

  generateClass = d => {
    let arr = [...this.state.highlightDates];
    let dateClass = "date";
    //console.log(arr, d);
    for (let j = 0; j < arr.length; j++) {
      if (parseInt(arr[j]) == d) dateClass = "date highlight";
    }
    arr = [...this.state.betweenDates];
    for (let j = 0; j < arr.length; j++) {
      if (parseInt(arr[j]) == d) dateClass = "date highlight-range";
    }

    return dateClass;
  };

  generateBlanks = firstDayOfMonth => {
    let blanks = [];
    for (let j = 0; j < firstDayOfMonth; j++) {
      blanks.push(
        <div key={j} className="blankSpace">
          {" "}
        </div>
      );
    }
    return blanks;
  };

  generateDates = (days, month, year, monthName) => {
    let dates = [];
    for (let i = 1; i <= days; i++) {
      let d = parseInt(i + month + year);
      dates.push(
        <div
          data-id={d}
          data-d={i}
          data-month={month}
          data-year={year}
          data-monthname={monthName}
          key={i}
          className={this.generateClass(d)}
          onClick={this.OnDateClick}
        >
          {i}
        </div>
      );
    }
    return dates;
  };

  applyRange = range => {
    const date1 = range[0];
    const date2 = range[1];
    const from = `${date1.d}-${date1.m}-${date1.y}`;
    const to = `${date2.d}-${date2.m}-${date2.y}`;
    this.from.current.value = from;
    this.to.current.value = to;
  };

  addCustomRange = () => {
    let range = [];
    this.setState({ ...this.state, range, activeBtn: 1 });
    this.from.current.value = "";
    this.to.current.value = "";
    this.from.current.focus();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onApply = () => {
    if (this.state.range.length == 2) {
      this.props.applyDates();
      this.props.hideModal();
    }
  };
  handleApply = e => {
    if (this.state.from && this.state.to) {
      let range = [];
      let arr = this.state.from.split("-");
      let dateObject = {
        d: parseInt(arr[0]),
        m: arr[1],
        y: arr[2],
        month: moment(parseInt(arr[1]), "MM").format("MMM")
      };
      range.push(dateObject);
      let d = parseInt(dateObject.d + dateObject.m + dateObject.y);
      let highlightDates = [d];
      arr = this.state.to.split("-");
      dateObject = {
        d: parseInt(arr[0]),
        m: arr[1],
        y: arr[2],
        month: moment(parseInt(arr[1]), "MM").format("MMM")
      };
      range.push(dateObject);
      d = parseInt(dateObject.d + dateObject.m + dateObject.y);
      highlightDates.push(d);
      let startDate = this.generateDate(range[0]);
      let endDate = this.generateDate(range[1]);
      let betweenDates = this.generateBetweenDates(startDate, endDate);
      this.setState({ ...this.state, range, highlightDates, betweenDates });
      this.props.addRange(range);
    }
    this.onApply();
  };

  addTodayAsRange = () => {
    let range = [];
    this.setState({ ...this.state, range });
    let dateObject = {
      d: moment().format("D"),
      m: moment().format("MM"),
      y: moment().format("YYYY"),
      month: moment().format("MMM")
    };
    range.push(dateObject);
    range.push(dateObject);
    const d = parseInt(dateObject.d + dateObject.m + dateObject.y);
    const highlightDates = [d];
    highlightDates.push(d);
    this.setState({
      ...this.state,
      date: moment(),
      range,
      highlightDates,
      betweenDates: [],
      activeBtn: 2
    });
    this.applyRange(range);
    this.props.addRange(range);
  };

  addYesterdayAsRange = () => {
    let range = [];
    this.setState({ ...this.state, range });
    const dateObject = {
      d: moment()
        .subtract(1, "day")
        .format("D"),
      m: moment()
        .subtract(1, "day")
        .format("MM"),
      y: moment()
        .subtract(1, "day")
        .format("YYYY"),
      month: moment()
        .subtract(1, "day")
        .format("MMM")
    };
    range.push(dateObject);
    range.push(dateObject);
    const d = parseInt(dateObject.d + dateObject.m + dateObject.y);
    const highlightDates = [d];
    highlightDates.push(d);
    this.setState({
      ...this.state,
      date: moment(),
      range,
      highlightDates,
      betweenDates: [],
      activeBtn: 3
    });
    this.applyRange(range);
    this.props.addRange(range);
  };

  addLastSevenAsRange = () => {
    let range = [];
    this.setState({ ...this.state, range });

    let dateObject = {
      d: moment()
        .subtract(7, "day")
        .format("D"),
      m: moment()
        .subtract(7, "day")
        .format("MM"),
      y: moment()
        .subtract(7, "day")
        .format("YYYY"),
      month: moment()
        .subtract(7, "day")
        .format("MMM")
    };
    range.push(dateObject);
    let d = parseInt(dateObject.d + dateObject.m + dateObject.y);
    const highlightDates = [d];
    dateObject = {
      d: moment().format("D"),
      m: moment().format("MM"),
      y: moment().format("YYYY"),
      month: moment().format("MMM")
    };
    range.push(dateObject);
    d = parseInt(dateObject.d + dateObject.m + dateObject.y);
    highlightDates.push(d);
    let startDate = this.generateDate(range[0]);
    let endDate = this.generateDate(range[1]);
    let betweenDates = this.generateBetweenDates(startDate, endDate);
    this.setState({
      ...this.state,
      date: moment(),
      range,
      highlightDates,
      betweenDates,
      activeBtn: 4
    });
    this.applyRange(range);
    this.props.addRange(range);
  };

  addLastThirtyAsRange = () => {
    let range = [];
    this.setState({ ...this.state, range });

    let dateObject = {
      d: moment()
        .subtract(30, "day")
        .format("D"),
      m: moment()
        .subtract(30, "day")
        .format("MM"),
      y: moment()
        .subtract(30, "day")
        .format("YYYY"),
      month: moment()
        .subtract(30, "day")
        .format("MMM")
    };
    range.push(dateObject);
    let d = parseInt(dateObject.d + dateObject.m + dateObject.y);
    const highlightDates = [d];
    dateObject = {
      d: moment().format("D"),
      m: moment().format("MM"),
      y: moment().format("YYYY"),
      month: moment().format("MMM")
    };
    range.push(dateObject);
    d = parseInt(dateObject.d + dateObject.m + dateObject.y);
    highlightDates.push(d);
    let startDate = this.generateDate(range[0]);
    let endDate = this.generateDate(range[1]);
    let betweenDates = this.generateBetweenDates(startDate, endDate);
    this.setState({
      ...this.state,
      date: moment(),
      range,
      highlightDates,
      betweenDates,
      activeBtn: 5
    });
    this.applyRange(range);
    this.props.addRange(range);
  };

  addLastMonthAsRange = () => {
    let range = [];
    this.setState({ ...this.state, range });

    let dateObject = {
      d: moment().format("1"),
      m: moment()
        .subtract(1, "month")
        .format("MM"),
      y: moment()
        .subtract(1, "month")
        .format("YYYY"),
      month: moment()
        .subtract(1, "month")
        .format("MMM")
    };

    range.push(dateObject);
    let d = parseInt(dateObject.d + dateObject.m + dateObject.y);
    const highlightDates = [d];
    dateObject = {
      d: moment()
        .subtract(1, "month")
        .daysInMonth(),
      m: moment()
        .subtract(1, "month")
        .format("MM"),
      y: moment()
        .subtract(1, "month")
        .format("YYYY"),
      month: moment()
        .subtract(1, "month")
        .format("MMM")
    };
    range.push(dateObject);
    d = parseInt(dateObject.d + dateObject.m + dateObject.y);
    highlightDates.push(d);
    let startDate = this.generateDate(range[0]);
    let endDate = this.generateDate(range[1]);
    let betweenDates = this.generateBetweenDates(startDate, endDate);
    this.setState({
      ...this.state,
      date: moment(),
      range,
      highlightDates,
      betweenDates,
      activeBtn: 6
    });
    this.applyRange(range);
    this.props.addRange(range);
  };

  addThisMonthAsRange = () => {
    let range = [];
    this.setState({ ...this.state, range });
    let dateObject = {
      d: moment().format("1"),
      m: moment().format("MM"),
      y: moment().format("YYYY"),
      month: moment().format("MMM")
    };
    range.push(dateObject);
    let d = parseInt(dateObject.d + dateObject.m + dateObject.y);
    const highlightDates = [d];
    dateObject = {
      d: moment().daysInMonth(),
      m: moment().format("MM"),
      y: moment().format("YYYY"),
      month: moment().format("MMM")
    };
    range.push(dateObject);
    d = parseInt(dateObject.d + dateObject.m + dateObject.y);
    highlightDates.push(d);
    let startDate = this.generateDate(range[0]);
    let endDate = this.generateDate(range[1]);
    let betweenDates = this.generateBetweenDates(startDate, endDate);
    this.setState({
      ...this.state,
      date: moment(),
      range,
      highlightDates,
      betweenDates,
      activeBtn: 7
    });
    this.applyRange(range);
    this.props.addRange(range);
  };

  weekdayshort = moment.weekdaysShort();
  render() {
    const { open, rootCloseEvent } = this.props;
    const currentDays = moment(this.state.date, "YYYY-MM").daysInMonth();
    const currentYear = moment(this.state.date).format("YYYY");
    const currentMonth = moment(this.state.date).format("MMMM");
    const currentMonthName = moment(this.state.date).format("MMM");
    const currentMonthNumber = moment(this.state.date).format("MM");
    const currentFirstDayOfMonth = moment(this.state.date)
      .startOf("month")
      .format("d");

    const previousDays = moment(this.state.date, "YYYY-MM")
      .subtract(1, "month")
      .daysInMonth();
    const previousYear = moment(this.state.date)
      .subtract(1, "month")
      .format("YYYY");
    const previousMonth = moment(this.state.date)
      .subtract(1, "month")
      .format("MMMM");
    const previousMonthName = moment(this.state.date)
      .subtract(1, "month")
      .format("MMM");
    const previousMonthNumber = moment(this.state.date)
      .subtract(1, "month")
      .format("MM");
    const previousFirstDayOfMonth = moment(this.state.date)
      .subtract(1, "month")
      .startOf("month")
      .format("d");

    let weekdayshortname = this.weekdayshort.map(day => {
      return (
        <div key={day} className="day">
          {day}
        </div>
      );
    });

    const { hide } = this.state;
    const { activeBtn } = this.state;

    const myClass = this.props.show
      ? "modal display-block"
      : "modal display-none";

    return (
      <div className={myClass}>
        <div className="date-filter">
          <div className={hide ? "calendar hide" : "calendar"}>
            <div className="calendar-year mt-3">
              <i
                className="fa fa-angle-up upControl"
                aria-hidden="true"
                onClick={this.handleUpControl}
              ></i>
              Year {currentYear}
              <i
                className="fa fa-angle-down  downControl"
                aria-hidden="true"
                onClick={this.handleDownControl}
              ></i>
            </div>
            <div className="previous myCalendar">
              <div className="from-date">
                <input
                  id="from"
                  name="from"
                  type="text"
                  ref={this.from}
                  placeholder="DD-MM-YYYY"
                  onChange={this.handleChange}
                />
              </div>

              <div className="monthRow">
                <div className="prevControl" onClick={this.onPrev}>
                  <i
                    className="fa fa-angle-left"
                    aria-hidden="true"
                    style={{ fontSize: "14px" }}
                  ></i>
                </div>
                <div className="previous-month">
                  {previousMonth} {previousYear}
                </div>
              </div>

              <div className="daysRow">{weekdayshortname}</div>

              <div className="contentCalendar">
                {this.generateBlanks(previousFirstDayOfMonth)}
                {this.generateDates(
                  previousDays,
                  previousMonthNumber,
                  previousYear,
                  previousMonthName
                )}
              </div>
            </div>

            <div className="current myCalendar">
              <div className="to-date">
                <input
                  type="text"
                  id="to"
                  name="to"
                  ref={this.to}
                  placeholder="DD-MM-YYYY"
                  onChange={this.handleChange}
                />
              </div>

              <div className="monthRow">
                <div className="current-month">
                  {currentMonth} {currentYear}
                </div>
                <div className="nextControl" onClick={this.onNext}>
                  <i
                    className="fa fa-angle-right"
                    aria-hidden="true"
                    style={{ fontSize: "14px" }}
                  ></i>
                </div>
              </div>

              <div className="daysRow">{weekdayshortname}</div>

              <div className="contentCalendar">
                {this.generateBlanks(currentFirstDayOfMonth)}
                {this.generateDates(
                  currentDays,
                  currentMonthNumber,
                  currentYear,
                  currentMonthName
                )}
              </div>
            </div>

            <div className="options">
              <div>
                {" "}
                <button
                  className={
                    activeBtn && activeBtn == 1
                      ? " optionsBtn custom-range active-button"
                      : " optionsBtn custom-range"
                  }
                  onClick={this.addCustomRange}
                >
                  Custom Range
                </button>
              </div>
              <div>
                {" "}
                <button
                  className={
                    activeBtn && activeBtn == 2
                      ? " optionsBtn today active-button"
                      : " optionsBtn today"
                  }
                  onClick={this.addTodayAsRange}
                >
                  Today
                </button>
              </div>
              <div>
                {" "}
                <button
                  className={
                    activeBtn && activeBtn == 3
                      ? " optionsBtn yesterday active-button"
                      : " optionsBtn yesterday"
                  }
                  onClick={this.addYesterdayAsRange}
                >
                  Yesterday
                </button>
              </div>
              <div>
                {" "}
                <button
                  className={
                    activeBtn && activeBtn == 4
                      ? " optionsBtn last-seven active-button"
                      : " optionsBtn last-seven"
                  }
                  onClick={this.addLastSevenAsRange}
                >
                  Last 7 Days
                </button>
              </div>
              <div>
                <button
                  className={
                    activeBtn && activeBtn == 5
                      ? " optionsBtn last-thirty active-button"
                      : " optionsBtn last-thirty"
                  }
                  onClick={this.addLastThirtyAsRange}
                >
                  Last 30 Days
                </button>
              </div>
              <div>
                {" "}
                <button
                  className={
                    activeBtn && activeBtn == 6
                      ? " optionsBtn last-month active-button"
                      : " optionsBtn last-month"
                  }
                  onClick={this.addLastMonthAsRange}
                >
                  Last Month
                </button>
              </div>
              <div>
                {" "}
                <button
                  className={
                    activeBtn && activeBtn == 7
                      ? " optionsBtn this-month active-button"
                      : " optionsBtn this-month"
                  }
                  onClick={this.addThisMonthAsRange}
                >
                  This Month
                </button>
              </div>
            </div>
            <div className="calendarBtns row">
              <div className="button-cancel col-2 ">
                <button onClick={this.handleCancel}>Cancel</button>
              </div>
              <div className="button-apply col-3">
                <button onClick={this.handleApply}>Apply</button>
              </div>
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
