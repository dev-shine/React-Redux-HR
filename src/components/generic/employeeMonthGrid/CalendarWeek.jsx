import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';

const CalendarWeek = ({userId, dayData, onShowDaySummary, onWorkingHoursChange}) => {
  let dayHtml = '';
  if (userId) {
    dayHtml = <Day forEmployeeHours={false} dayData={dayData} showDaySummary={onShowDaySummary} userid={userId} />;
  } else {
    dayHtml = <Day forEmployeeHours dayData={dayData} onWorkingHoursChange={onWorkingHoursChange} />;
  }
  return (
    <td className="fc-event-container">
      {dayHtml}
    </td>
  );
};

CalendarWeek.PropTypes = {
  dayData: PropTypes.object.isRequired,
  userId: PropTypes.number,
  onShowDaySummary: PropTypes.func,
  onWorkingHoursChange: PropTypes.func
};

export default CalendarWeek;
