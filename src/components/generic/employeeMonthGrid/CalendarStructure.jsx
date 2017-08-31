import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import CalendarWeek from './CalendarWeek';

const CalendarStructure = ({userId, week, onShowDaySummary, onWorkingHoursChange}) => {
  let weekHtml = _.map(week, (dayData, key) => {
    return <CalendarWeek key={key} userId={userId} dayData={dayData} onShowDaySummary={onShowDaySummary} onWorkingHoursChange={onWorkingHoursChange} />;
  });
  return (
    <div id="calendar" className="col-xs-12">
      {weekHtml}
    </div>
  );
};

CalendarStructure.PropTypes = {
  userId:           PropTypes.number.isRequired,
  week:             PropTypes.array.isRequired,
  onShowDaySummary: PropTypes.func.isRequired
};

export default CalendarStructure;
