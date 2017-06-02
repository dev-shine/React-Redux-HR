import React from 'react';
import PropTypes from 'prop-types';
import DaySection from './DaySection';


const styles = {
  timeInputBox: {
    'width': '40px'
  }
};

const Day = ({dayData, classname, forEmployeeHours, day, userid, showDaySummary, onWorkingHoursChange}) => {
  $('.timepicker').timepicker({'minTime': '5:00', 'maxTime': '12:00', 'timeFormat': 'h:i', 'step': 10});
  let d = dayData;
  let d_date = d.date;
  let d_full_date = d.full_date
  let d_office_working_hours = d.office_working_hours
  let main = '';
  let inOutTime = '';
  let _class = "fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable ";

  let date_div = <DaySection classname={_class + "white"} block="type1" d={d} time={<h5>{d.date}</h5>} title={d.day} />
  let work_time_div = <DaySection classname={_class + "white center"} block="type2" d={d} dataToDisplay={d.total_time + ' - Total Work Time'} />

  if (d.admin_alert == 1) {
    d_date = d_date + ' * '
    date_div = <DaySection classname={_class + "indigo"} block="type1" d={d} time={<h5>{d_date}</h5>} title={d.day} />
    work_time_div = <DaySection classname={_class + "white center"} block="type2" d={d} dataToDisplay={d.admin_alert_message} />
  }

  let extraTime = ''
  if (d.extra_time_status == '-') {
    extraTime = <DaySection classname={_class + "red"} block="type1" d={d} time={d.extra_time} title='' />
  } else if (d.extra_time_status == '+') {
    extraTime = <DaySection classname={_class + "green"} block="type1" d={d} time={d.extra_time} title='' />
  }
  if (d.day_type == "HALF_DAY" && forEmployeeHours == false) {
    inOutTime = <span className="fc-title">{d.in_time} - {d.out_time}</span>
  }
  if (d.day_type == "WORKING_DAY" && forEmployeeHours == false) {
    main = <div data-toggle="modal" data-target="#modalUserDaySummary" onClick={() => showDaySummary(userid, dayData.full_date)}>
      {date_div}
      <DaySection classname={_class + "white"} block="type1" d={d} time={d.in_time+' - '+d.out_time} title='' />
      {work_time_div}
      {extraTime}
    </div>
  } else if (d.day_type == "NON_WORKING_DAY" && forEmployeeHours == false) {
    main = <div>
      <DaySection classname={classname} block="type1" d={d} time={<h5>{d.date}</h5>} title={d.day} />
      <DaySection classname={classname} block="type1" d={d} time={day} title={inOutTime} />
      <DaySection classname={classname} block="type1" d={d} time={d.day_text} title='' />
    </div>
  }  else if (d.day_type == "FUTURE_WORKING_DAY" && forEmployeeHours == false) {
    main = <div>
      <DaySection classname={classname} block="type1" d={d} time={<h5>{d.date}</h5>} title={d.day} />
      <DaySection classname={classname} block="type1" d={d} time={day} title={inOutTime} />
      <DaySection classname={classname} block="type1" d={d} time={d.day_text} title='' />
      {work_time_div}
    </div>
  }else if (forEmployeeHours == false) {
    main = <div>
      <DaySection classname={classname} block="type1" d={d} time={<h5>{d.date}</h5>} title={d.day} />
      <DaySection classname={classname} block="type1" d={d} time={day} title={inOutTime} />
      <DaySection classname={classname} block="type1" d={d} time={d.day_text} title='' />
     </div>
  } else if (d.day_type == "WORKING_DAY" && forEmployeeHours == true) {
    main = <div data-toggle="modal">
      <DaySection classname={_class + 'white'} block="type1" d={d} time={<h5>{d.date}</h5>} title={d.day} />
      <DaySection classname={_class+'white'} block="type1" d={d} time={<h6>Hours : {d_office_working_hours}</h6>} title='' />

      <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
        <div className="fc-content">
          <span className="fc-title">
            Change to &nbsp;:&nbsp;
          </span>
          <span className="fc-time">
            <input type="text" className="timepicker" ref="workingtime" style={styles.timeInputBox} onBlur={() => onWorkingHoursChange(dayData.full_date, this.refs.workingtime.value)}/>
          </span>
        </div>
      </div>

    </div>
  } else if (d.day_type == "NON_WORKING_DAY" && forEmployeeHours == true) {
    main = <div>
      <DaySection classname={classname} block="type1" d={d} time={<h5>{d.date}</h5>} title={d.day} />
      <DaySection classname={classname} block="type1" d={d} time={day} title={inOutTime} />
      <DaySection classname={classname} block="type1" d={d} time={d.day_text} title='' />

      <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
        <div className="fc-content">
          <span className="fc-title">
            Change to &nbsp;:&nbsp;
          </span>
          <span className="fc-time">
            <input type="text" className="timepicker" ref="workingtime" style={styles.timeInputBox} onBlur={() => onWorkingHoursChange(dayData.full_date, this.refs.workingtime.value)}/>
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

Day.PropTypes = {
  classname: PropTypes.string,
  forEmployeeHours: PropTypes.bool,
  day: PropTypes.string,
  userid: PropTypes.number,
  showDaySummary: PropTypes.func,
  onWorkingHoursChange: PropTypes.func,
  dayData: PropTypes.shape({
    date: PropTypes.number.isRequired,
    day: PropTypes.string.isRequired,
    day_type: PropTypes.string.isRequired,
    full_date: PropTypes.string.isRequired,
    admin_alert: PropTypes.number,
    admin_alert_message: PropTypes.string,
    day_text: PropTypes.string,
    extra_time: PropTypes.string,
    in_time: PropTypes.string,
    out_time: PropTypes.string,
    total_time: PropTypes.string,
    office_working_hours: PropTypes.string,
    text: PropTypes.string,
  }).isRequired
}


export default Day
