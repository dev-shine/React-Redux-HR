import React from 'react';

const LeavesSummary = ({user}) => {
  let pendingPunchingDays = _.map(user.attendance, (day, key) => {
    let check_class = "b-success"
    if (day.day_type == 'WORKING_DAY') {
      if (day.in_time == '' || day.out_time == '') {
        check_class = "b-danger"
      }
    }
    let show_text = ""
    if (day.day_type == 'HALF_DAY') {
      check_class = "b-warn"
      show_text = day.day_type + ' / ' + "Timings : " + day.in_time + ' - ' + day.out_time + ' / Total Time : ' + day.total_time
    }
    return (
      <div key={key} className={`sl-item ${check_class}`}>
        <div className="sl-icon">
          <i className="fa fa-check"></i>
        </div>
        <div className="sl-content">
          <div className="">{day.display_date}</div>
          <div>{day.day_text}</div>
          <div>{show_text}</div>
        </div>
      </div>
    )
  });
  return (
    <div className="row">
      <div className="col-sm-12 col-md-12">
        <div className="box">
          <div className="box-header">
            <h3>{user.name}</h3>
            <small>{user.jobtitle}</small>
          </div>
          <div className="box-body">
            <div className="streamline b-l m-l">
              {pendingPunchingDays}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeavesSummary;
