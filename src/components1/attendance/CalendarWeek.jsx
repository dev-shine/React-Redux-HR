import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import Day from 'components/attendance/Day';


const CalendarWeek = ({userId, dayData, onShowDaySummary}) => {
  let dayHtml = ''
  if (dayData.day_type == 'NON_WORKING_DAY') {
    dayHtml = <Day forEmployeeHours={false} classname="fc-day-grid-event fc-h-event fc-event fc-start fc-end yellow fc-draggable" day="Non Working day" dayData={dayData}/>
  } else if (dayData.day_type == 'LEAVE_DAY') {
    dayHtml = <Day forEmployeeHours={false} classname="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable" day="On Leave" dayData={dayData}/>
  } else if (dayData.day_type == 'HALF_DAY') {
    dayHtml = <Day forEmployeeHours={false} classname="fc-day-grid-event fc-h-event fc-event fc-start fc-end red-100 fc-draggable" dayData={dayData}/>
  } else if (dayData.day_type == 'FUTURE_WORKING_DAY') {
    dayHtml = <Day forEmployeeHours={false} classname="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable" dayData={dayData}/>
  } else {
    dayHtml = <Day forEmployeeHours={false} dayData={dayData} showDaySummary={onShowDaySummary} userid={userId}/>
  }
  return (
    <td className="fc-event-container">
      {dayHtml}
    </td>
  )
}

CalendarWeek.PropTypes = {
  userId: PropTypes.number.isRequired,
  dayData: PropTypes.object.isRequired,
  onShowDaySummary: PropTypes.func.isRequired
}


export default CalendarWeek;
