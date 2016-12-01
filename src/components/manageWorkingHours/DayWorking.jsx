import React from 'react';
class DayWorking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workingTime: ''
    }
    //this.onChange = this.onChange.bind(this)
  }
  componentDidMount() {
    $('.timepickerInput').timepicker({'minTime': '5:00', 'maxTime': '12:00', 'timeFormat': 'h:i', 'step': 10});
  }
  onChangeTime(time) {

    //   console.log('A--'+ time )
    //   console.log('B--'+ this.state.date )

    //   //console.log(aa)
    //     // evt.preventDefault();
    //     // this.props.onUpdateDaySummary( this.state.current_userid, this.state.current_date, this.state.form_entry_time, this.state.form_exit_time, this.state.form_reason ).then(
    //     // (data) => {

    //     // },(error) => {
    //     //     notify( error );
    //     // })
  }

  render() {

    let styles = _.cloneDeep(this.constructor.styles);

    let d = this.props.dayData
    let d_date = d.date
    let d_full_date = d.full_date
    let d_office_working_hours = d.office_working_hours

    return (
      <div data-toggle="modal">

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
              <input type="text" className="timepickerInput" ref="workingtime" value={this.state.workingTime} style={styles.timeInputBox} onBlur={() => this.props.onWorkingHoursChange(this.props.dayData.full_date, this.refs.workingtime.value)}/>
            </span>
          </div>
        </div>

      </div>
    )
  }
}

DayWorking.styles = {
  timeInputBox: {
    'width': '40px'
  }
};

export default DayWorking
