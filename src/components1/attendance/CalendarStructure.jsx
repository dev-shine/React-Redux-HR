import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import CalendarWeek from './CalendarWeek';

const styles = {
  height100per: {
    'minHeight': '150px'
  }
};

const CalendarStructure = ({userId, week, onShowDaySummary}) => {
  let weekHtml = _.map(week, (dayData, key) => {
    return <CalendarWeek key={key} userId={userId} dayData={dayData} onShowDaySummary={onShowDaySummary} />
  });
  return (
    <div className="fc-row fc-week fc-widget-content" style={styles.height100per}>
      <div className="fc-bg">
        <div className="fc-content-skeleton">
          <table>
            <tbody>
              <tr>
                {weekHtml}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

CalendarStructure.PropTypes = {
  userId: PropTypes.number.isRequired,
  week: PropTypes.array.isRequired,
  onShowDaySummary: PropTypes.func.isRequired
}

export default CalendarStructure;
