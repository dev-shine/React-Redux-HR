import React from 'react';



class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workingTime: ''
    }
  }
  componentDidMount() {
    $('.timepicker').timepicker({'minTime': '5:00', 'maxTime': '12:00', 'timeFormat': 'h:i', 'step': 10});
  }

  componentWillReceiveProps(){
    $('.timepicker').timepicker({'minTime': '5:00', 'maxTime': '12:00', 'timeFormat': 'h:i', 'step': 10});
  }

  render() {
    let styles = _.cloneDeep(this.constructor.styles);

    let d = this.props.dayData
    let d_date = d.date;
    let d_full_date = d.full_date
    let d_office_working_hours = d.office_working_hours
    let main = '';
    let inOutTime = '';
    let date_div = <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
      <div className="fc-content">
        <span className="fc-time">
          <h5>{d_date}</h5>
        </span>
        <span className="fc-title">
          {d.day}</span>
      </div>
    </div>;

    let work_time_div = <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable center">
      <div className="fc-content">
        {d.total_time}
        - Total Work Time

      </div>
    </div>

    if (d.admin_alert == 1) {
      d_date = d_date + ' * '
      date_div = <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end indigo fc-draggable">
        <div className="fc-content">
          <span className="fc-time">
            <h5>{d_date}</h5>
          </span>
          <span className="fc-title">
            {d.day}</span>
        </div>
      </div>;

      work_time_div = <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable center">
        <div className="fc-content">
          {d.admin_alert_message}

        </div>
      </div>
    }

    let extraTime = ''
    if (d.extra_time_status == '-') {
      extraTime = <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable">
        <div className="fc-content">
          <span className="fc-time">
            {d.extra_time}</span>
          <span className="fc-title"></span>
        </div>
      </div>

    } else if (d.extra_time_status == '+') {
      extraTime = <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end green fc-draggable">
        <div className="fc-content">
          <span className="fc-time">
            {d.extra_time}</span>
          <span className="fc-title"></span>
        </div>
      </div>

    }
    if (d.day_type == "HALF_DAY" && this.props.forEmployeeHours == false) {
      inOutTime = <span className="fc-title">{d.in_time}
        - {d.out_time}</span>
    }
    if (d.day_type == "WORKING_DAY" && this.props.forEmployeeHours == false) {
      main = <div data-toggle="modal" data-target="#modalUserDaySummary" onClick={() => this.props.showDaySummary(this.props.userid, this.props.dayData.full_date)}>
        {date_div}

        <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
          <div className="fc-content">
            <span className="fc-time">
              {d.in_time}
              - {d.out_time}
            </span>
            <span className="fc-title">
              Work Time
            </span>
          </div>
        </div>

        {work_time_div}
        {extraTime}

      </div>
    } else if (this.props.forEmployeeHours == false) {
      main = <div>
        <div className={this.props.class}>
          <div className="fc-content">
            <span className="fc-time">
              <h5>{d.date}</h5>
            </span>
            <span className="fc-title">
              {d.day}</span>
          </div>
        </div>

        <div className={this.props.class}>
          <div className="fc-content">
            <span className="fc-time">
              {this.props.day}
            </span>
            <div>{inOutTime}</div>
          </div>
        </div>

        <div className={this.props.class}>
          <div className="fc-content">
            <span className="fc-time">
              {d.day_text}
            </span>
            <span className="fc-title"></span>
          </div>
        </div>

      </div>
    } else if (d.day_type == "WORKING_DAY" && this.props.forEmployeeHours == true) {
      main = <div data-toggle="modal">

        <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
          <div className="fc-content">
            <span className="fc-time">
              <h5>{d_date}</h5>
            </span>
            <span className="fc-title">
              {d.day}</span>
          </div>
        </div>

        <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
          <div className="fc-content">
            <span className="fc-time">
              <h6>Hours : {d_office_working_hours}</h6>
            </span>
            <span className="fc-title"></span>
          </div>
        </div>

        <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
          <div className="fc-content">
            <span className="fc-title">
              Change to &nbsp;:&nbsp;
            </span>
            <span className="fc-time">
              <input type="text" className="timepicker" ref="workingtime" value={this.state.workingTime} style={styles.timeInputBox} onBlur={() => this.props.onWorkingHoursChange(this.props.dayData.full_date, this.refs.workingtime.value)}/>
            </span>
          </div>
        </div>

      </div>
    } else if (d.day_type == "NON_WORKING_DAY" && this.props.forEmployeeHours == true) {
      main = <div>
        <div className={this.props.class}>
          <div className="fc-content">
            <span className="fc-time">
              <h5>{d.date}</h5>
            </span>
            <span className="fc-title">
              {d.day}</span>
          </div>
        </div>

        <div className={this.props.class}>
          <div className="fc-content">
            <span className="fc-time">
              {this.props.day}
            </span>
            <div>{inOutTime}</div>
          </div>
        </div>

        <div className={this.props.class}>
          <div className="fc-content">
            <span className="fc-time">
              {d.day_text}
            </span>
            <span className="fc-title"></span>
          </div>
        </div>

        <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
          <div className="fc-content">
            <span className="fc-title">
              Change to &nbsp;:&nbsp;
            </span>
            <span className="fc-time">
              <input type="text" className="timepicker" ref="workingtime" value={this.state.workingTime} style={styles.timeInputBox} onBlur={() => this.props.onWorkingHoursChange(this.props.dayData.full_date, this.refs.workingtime.value)}/>
            </span>
          </div>
        </div>
      </div>
    }
    return (
      <div>
        {main}
      </div>
    )
  }
}
Day.styles = {
  timeInputBox: {
    'width': '40px'
  }
};

export default Day
