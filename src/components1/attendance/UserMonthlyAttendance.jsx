import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import UserDetails from 'components/generic/UserDetails';
import CalendarStructure from './CalendarStructure';
import MonthSummary from './MonthSummary';

const UserMonthlyAttendance = ({monthlyAttendance, monthToggle, onShowDaySummary}) => {
  const _onChangeMonth = (check) => {
    if (check === 'previous') {
      monthToggle(monthlyAttendance.userid, monthlyAttendance.previousMonth.year, monthlyAttendance.previousMonth.month);
    } else if (check === 'next') {
      monthToggle(monthlyAttendance.userid, monthlyAttendance.nextMonth.year, monthlyAttendance.nextMonth.month);
    }
  };
  let weekWise = _.chunk(monthlyAttendance.attendance, 7);
  let calendarStructure = _.map(weekWise, (week, key) => {
    return <CalendarStructure key={key} userId={monthlyAttendance.userid} week={week} onShowDaySummary={onShowDaySummary} />;
  });
  return (
    <div >
      <div id="content" className="app-content box-shadow-z0" role="main">
        <div className="app-body" id="view">
          <div>
            <div className="fullcalendar fc fc-ltr fc-unthemed">
              <div className="fc-toolbar">
                <div className="fc-left">
                  <button type="button" className="fc-prev-button fc-button fc-state-default fc-corner-left fc-corner-right" onClick={() => _onChangeMonth('previous')}>
                    <span className="fc-icon fc-icon-left-single-arrow"></span>
                  </button>
                </div>
                <div className="fc-right">
                  <button type="button" className="fc-next-button fc-button fc-state-default fc-corner-left fc-corner-right" onClick={() => _onChangeMonth('next')}>
                    <span className="fc-icon fc-icon-right-single-arrow"></span>
                  </button>
                </div>
                <div className="fc-center">
                  <h2>
                    {monthlyAttendance.monthName}
                    {monthlyAttendance.year}</h2>
                </div>
                <div className="fc-clear"></div>
              </div>
              <br />
              <UserDetails monthlyAttendance={monthlyAttendance} />
              <MonthSummary monthlyAttendance={monthlyAttendance} />
              <div className="fc-view-container">
                <div className="fc-view fc-month-view fc-basic-view">
                  <table>
                    <tbody className="fc-body">
                      <tr>
                        <td className="fc-widget-content">
                          <div className="fc-day-grid-container">
                            <div className="fc-day-grid">
                              {calendarStructure}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserMonthlyAttendance.PropTypes = {
  monthlyAttendance: PropTypes.shape({
    userid: PropTypes.number.isRequired,
    previousMonth: PropTypes.object.isRequired,
    nextMonth: PropTypes.object.isRequired,
    attendance: PropTypes.object.isRequired,
    monthName: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired
  }).isRequired
};

export default UserMonthlyAttendance;
