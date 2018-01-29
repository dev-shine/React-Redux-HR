import React from 'react';
import PropTypes from 'prop-types';
import DayReference from './DayReference';
import TimeSummary from './TimeSummary';
import CompensationSummary from './compensationSummary';

const MonthSummary = ({monthlyAttendance}) => {
  return (
    <div>
      <TimeSummary monthlyAttendance={monthlyAttendance} />
      {monthlyAttendance.compensationSummary && monthlyAttendance.compensationSummary.seconds_to_be_compensate > 0 ? <CompensationSummary monthlyAttendance={monthlyAttendance} /> : ''}
      <DayReference monthlyAttendance={monthlyAttendance} />
    </div>
  );
};

MonthSummary.PropTypes = {
  monthlyAttendance:   PropTypes.object.isRequired,
  compensationSummary: PropTypes.object.isRequired
};

export default MonthSummary;
