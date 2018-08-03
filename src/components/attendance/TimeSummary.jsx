import React from "react";
import PropTypes from "prop-types";

const TimeSummary = ({ monthlyAttendance }) => {
  return (
    <div className="row ">
      <div className="col-xs-12 col-md-3 time-summary">
        <div className="box p-a">
          <div className="pull-left m-r" />
          <div className="clear total">
            <h4 className="m-a-0 text-lg _300">
              {monthlyAttendance.monthSummary.actual_working_hours}
              <span className="text-sm"> </span>
            </h4>
            <small className="text-muted"> Total Working Hours</small>
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-3 time-summary">
        <div className="box p-a">
          <div className="pull-left m-r" />
          <div className="clear complete">
            <h4 className="m-a-0 text-lg _300">
              {monthlyAttendance.monthSummary.completed_working_hours}{" "}
              <span className="text-sm" />
            </h4>
            <small className="text-muted">Completed</small>
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-3 time-summary">
        <div className="box p-a">
          <div className="pull-left m-r" />
          <div className="clear pending">
            <h4 className="m-a-0 text-lg _300">
              {monthlyAttendance.monthSummary.pending_working_hours}
              <span className="text-sm" />
            </h4>
            <small className="text-muted">Pending</small>
          </div>
        </div>
      </div>
    </div>
  );
};

TimeSummary.PropTypes = {
  monthlyAttendance: PropTypes.shape({
    monthSummary: PropTypes.object.isRequired
  }).isRequired
};

export default TimeSummary;
