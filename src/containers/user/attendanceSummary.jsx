import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import _ from 'lodash';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import LoadingIcon from 'components/generic/LoadingIcon';
import * as actions_attendanceSummary from 'appRedux/attendance/actions/attendanceSummary';

class AttendanceSummary extends React.Component {
  constructor (props) {
    super(props);
  }
  componentWillMount () {
    let isNotValid = isNotUserValid(this.props.route.path, this.props.logged_user.logged_in, this.props.policy_documents.policyDocuments);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;  // +1 since getMonth starts from 0
    this.props.onAttendanceSummary(year, month);
  }

    // summary working day
  _getDayHtml (d) {
    let d_date = d.date;
    let d_day = d.day;

    let date_div = <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
      <div className="fc-content">
        <span className="fc-time"><h6>{d_date}</h6></span>
        <span className="fc-title"> {d_day}</span>
      </div>
    </a>;

    if (d.admin_alert == 1) {
      d_date = d_date + '*';
      date_div = <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end indigo fc-draggable">
        <div className="fc-content">
          <span className="fc-time"><h6>{d_date}</h6></span>
          <span className="fc-title"> {d_day}</span>
        </div>
      </a>;
    }

    let extraTime = '';
    if (d.extra_time_status == '-') {
      extraTime = <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable">
        <div className="fc-content">
          <span className="fc-time">                                                                                                                                              {d.extra_time}</span>
          <span className="fc-title"></span>
        </div>
      </a>;
    } else if (d.extra_time_status == '+') {
      extraTime = <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end green fc-draggable">
        <div className="fc-content">
          <span className="fc-time">                                                                                                                                              {d.extra_time}</span>
          <span className="fc-title"></span>
        </div>
      </a>;
    }

    return (
      <div>
        {date_div}
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
          <div className="fc-content">
            <span className="fc-title">                                                                                                                                              {d.in_time}</span>
          </div>
        </a>
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
          <div className="fc-content">
            <span className="fc-title">{d.out_time}</span>
          </div>
        </a>
        {extraTime}
      </div>
    );
  }

// summary future-working day
  _getFutureWorkingDayHtml (d) {
    return (
      <div>
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
          <div className="fc-content">
            <span className="fc-time"><h5>{d.date}</h5></span>
            <span className="fc-title"> {d.day}</span>
          </div>
        </a>
      </div>
    );
  }

    // summary non-working day
  _getNonWorkingDayHtml (d) {
    return (
      <div>
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end yellow fc-draggable">
          <div className="fc-content">
            <span className="fc-time"><h5>{d.date}</h5></span>
            <span className="fc-title"> {d.day}</span>
          </div>
        </a>
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end yellow fc-draggable">
          <div className="fc-content">
            <span className="fc-title"> Non working day                                                                                                                                                                                                                                                                                                    </span>
            <span className="fc-title"></span>
          </div>
        </a>
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end yellow fc-draggable">
          <div className="fc-content">
            <span className="fc-time"> {d.day_text} </span>
            <span className="fc-title"></span>
          </div>
        </a>
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end yellow fc-draggable">
          <div className="fc-content">
            <span className="fc-time">&nbsp;</span>
            <span className="fc-title"></span>
          </div>
        </a>
      </div>
    );
  }

    // summary leave day
  _getLeaveDayHtml (d) {
    return (
      <div>
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable">
          <div className="fc-content">
            <span className="fc-time"><h5>{d.date}</h5></span>
            <span className="fc-title"> {d.day}</span>
          </div>
        </a>
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable">
          <div className="fc-content">
            <span className="fc-title"> On Leave </span>
            <span className="fc-title"></span>
          </div>
        </a>
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable">
          <div className="fc-content">
            <span className="fc-title"> {d.day_text} </span>
            <span className="fc-title"></span>
          </div>
        </a>
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable">
          <div className="fc-content">
            <span className="fc-title"> &nbsp; </span>
            <span className="fc-title"></span>
          </div>
        </a>
      </div>
    );
  }

    // summary half day
  _getHalfDayHtml (d) {
    return (
      <div>
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red-100 fc-draggable">
          <div className="fc-content">
            <span className="fc-time"><h5>{d.date}</h5></span>
            <span className="fc-title"> {d.day}</span>
          </div>
        </a>
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red-100 fc-draggable">
          <div className="fc-content">
            <span className="fc-time"> </span>
            <span className="fc-title"> {d.in_time} </span>
          </div>
        </a>
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red-100 fc-draggable">
          <div className="fc-content">
            <span className="fc-time"> </span>
            <span className="fc-title"> {d.out_time}                                                                                                                                                                                                                                                                                                                                                                                                        </span>
          </div>
        </a>
        <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red-100 fc-draggable">
          <div className="fc-content">
            <span className="fc-time">{d.day_text} </span>
            <span className="fc-title">                                                                                                                                                                                                                                                                                                                                                                                                        </span>
          </div>
        </a>
      </div>
    );
  }

  _getWeekHtml (userid, w) {
    return _.map(w, (dayData, key) => {
      let dayHtml = '';

      if (dayData.day_type == 'NON_WORKING_DAY') {
        dayHtml = this._getNonWorkingDayHtml(dayData);
      } else if (dayData.day_type == 'LEAVE_DAY') {
        dayHtml = this._getLeaveDayHtml(dayData);
      } else if (dayData.day_type == 'HALF_DAY') {
        dayHtml = this._getHalfDayHtml(dayData);
      } else if (dayData.day_type == 'FUTURE_WORKING_DAY') {
        dayHtml = this._getFutureWorkingDayHtml(dayData);
      } else {
        dayHtml = this._getDayHtml(dayData);
      }

      let daySummaryUrl = '/user_day_summary/' + userid + '/' + dayData.full_date;

      return (
        <td key={key} className="fc-event-container">
          <Link to={daySummaryUrl}>
            {dayHtml}
          </Link>
        </td>
      );
    });
  }

  _getMonthHtml (styles, userid, m) {
    let weekWise = _.chunk(m, 15);
    return _.map(weekWise, (week, key) => {
      let weekHtml = this._getWeekHtml(userid, week);
      return (
        <div key={key} className="fc-row fc-week fc-widget-content" style={styles.height100per} >
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
      );
    });
  }

  _onChangeMonth (check) {
    if (check == 'previous') {
      this.props.onAttendanceSummary(this.props.attendanceSummary.previousMonth.year, this.props.attendanceSummary.previousMonth.month);
    } else if (check == 'next') {
      this.props.onAttendanceSummary(this.props.attendanceSummary.nextMonth.year, this.props.attendanceSummary.nextMonth.month);
    }
  }

  _allUsersAttendanceHtml (styles, usersAttendance) {
    return _.map(usersAttendance, (userData, key) => {
      let user_id = userData.userid;
      let monthlyAttendance = userData.attendance;

      let monthHtml = this._getMonthHtml(styles, user_id, monthlyAttendance);

      return (
        <table key={key} style={styles.userTable}>
          <tbody className="fc-body">
            <tr>
              <td className="fc-widget-content">
                <div className="fc-day-grid-container" >
                  <div className="fc-day-grid">
                    <div className="row">
                      <div className="col-12">
                        <div className="box p-a">
                          <div className="pull-left m-r">
                            <span className="w-48 rounded  accent">
                              <i className="material-icons"></i>
                            </span>
                          </div>
                          <div className="clear">
                            <h4 className="m-a-0 text-lg">
                              {userData.name}
                              <span className="text-sm"> </span>
                            </h4>
                            <small className="text-muted"> {userData.jobtitle}                                                                                        </small><br /><br />
                            <small className="text-muted"> Total Working Hours - {userData.monthSummary.actual_working_hours}                                                                                        </small><br />
                            <small className="text-muted"> Completed - {userData.monthSummary.completed_working_hours}                                                                                                                                                                                                </small><br />
                            <small className="text-muted"> Pending - {userData.monthSummary.pending_working_hours}                                                                                                                                                                                                </small><br />
                          </div>
                        </div>
                    </div>
              </div>
                      <div className="row">
                          <div className="col-sm-12">
                            <div className="p-y">
                              <div className="inline p-x b-l b-r text-center white">
                                <span className="h4 block m-a-0">{userData.monthSummary.WORKING_DAY}</span>
                                <small className="text-xs text-muted">Working Days</small>
                              </div>
                              <div className="inline p-x b-l b-r text-center yellow">
                                <span className="h4 block m-a-0">{userData.monthSummary.NON_WORKING_DAY}</span>
                                <small className="text-xs text-muted">Non Working Days</small>
                              </div>
                              <div className="inline p-x b-l b-r text-center red">
                                <span className="h4 block m-a-0">{userData.monthSummary.LEAVE_DAY}</span>
                                <small className="text-xs text-muted">Leave Days</small>
                              </div>
                              <div className="inline p-x b-l b-r text-center red-100">
                                <span className="h4 block m-a-0">{userData.monthSummary.HALF_DAY}</span>
                                <small className="text-xs text-muted">Half Days</small>
                              </div>
                              <div className="inline p-x b-l b-r text-center indigo">
                                <span className="h4 block m-a-0">*</span>
                                <small className="text-xs text-muted">Admin Alert</small>
                              </div>

                            </div>

                          </div>

                      </div>

                        {monthHtml}

                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
      );
    });
  }

  render () {
    let styles = _.cloneDeep(this.constructor.styles);

    let allUsersAttendance = this._allUsersAttendanceHtml(styles, this.props.attendanceSummary.usersAttendance);

    // let usersAttendance = this.props.attendanceSummary.usersAttendance;
    // let allUsersAttendance = _.map(usersAttendance, (userData, key) => {
    //   return <AllUsersAttendance key={key} userData={userData} />;
    // });
    return (
      <div >
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <div className="app-header white box-shadow">
            <div className="navbar">
              <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
                <i className="material-icons">&#xe5d2;</i>
              </a>
              <div className="navbar-item pull-left h5" id="pageTitle"> Attendance Summary</div>
            </div>
          </div>
          <div className="app-body" id="view">
            <div className="row">
              <div className="col-12">
                <LoadingIcon showLoading={this.props.frontend.show_loading} />
              </div>
            </div>
            <div className="padding">
              <div className="fullcalendar fc fc-ltr fc-unthemed">
                <div className="fc-toolbar">
                  <div className="fc-left">
                    <button type="button" className="fc-prev-button fc-button fc-state-default fc-corner-left fc-corner-right" onClick={() => this._onChangeMonth('previous')} >
                      <span className="fc-icon fc-icon-left-single-arrow"></span>
                    </button>
                  </div>
                  <div className="fc-right">
                    <button type="button" className="fc-next-button fc-button fc-state-default fc-corner-left fc-corner-right" onClick={() => this._onChangeMonth('next')}>
                      <span className="fc-icon fc-icon-right-single-arrow"></span>
                    </button>
                  </div>
                  <div className="fc-center">
                    <h2> {this.props.attendanceSummary.monthName} 2016</h2>
                  </div>
                  <div className="fc-clear"></div>
                </div>
                <br />
                <div className="fc-view-container" >
                  <div className="fc-view fc-month-view fc-basic-view">
                    {allUsersAttendance}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AttendanceSummary.styles = {
  height100per: {
    'minHeight': '140px'
  },
  userTable: {
    'marginBottom': '60px'
  }
};

function mapStateToProps (state) {
  return {
    frontend:          state.frontend.toJS(),
    logged_user:       state.logged_user.toJS(),
    attendanceSummary: state.attendanceSummary.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAttendanceSummary: (year, month) => {
      return dispatch(actions_attendanceSummary.get_attendance_summary(year, month));
    }
  };
};

const VisibleAttendanceSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendanceSummary);

const RouterVisibleAttendanceSummary = withRouter(VisibleAttendanceSummary);

export default RouterVisibleAttendanceSummary;
// ------------------------
// export const AllUsersAttendance = ({userData}) => {
//   let monthHtml = '';
//   return (
//     <table key={key} style={styles.userTable}>
//       <tbody className="fc-body">
//         <tr>
//           <td className="fc-widget-content">
//             <div className="fc-day-grid-container">
//               <div className="fc-day-grid">
//                 <div className="row">
//                   <div className="col-12">
//                     <div className="box p-a">
//                       <div className="pull-left m-r">
//                         <span className="w-48 rounded  accent">
//                           <i className="material-icons"></i>
//                         </span>
//                       </div>
//                       <div className="clear">
//                         <h4 className="m-a-0 text-lg">
//                           {userData.name}
//                           <span className="text-sm"> </span>
//                         </h4>
//                         <small className="text-muted"> {userData.jobtitle}                                                                                  </small><br /><br />
//                         <small className="text-muted"> Total Working Hours - {userData.monthSummary.actual_working_hours}                                                                                  </small><br />
//                         <small className="text-muted"> Completed - {userData.monthSummary.completed_working_hours}                                </small><br />
//                         <small className="text-muted"> Pending - {userData.monthSummary.pending_working_hours}                                                                                  </small><br />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-sm-12">
//                     <div className="p-y">
//                       <div className="inline p-x b-l b-r text-center white">
//                         <span className="h4 block m-a-0">{userData.monthSummary.WORKING_DAY}</span>
//                         <small className="text-xs text-muted">Working Days</small>
//                       </div>
//                       <div className="inline p-x b-l b-r text-center yellow">
//                         <span className="h4 block m-a-0">{userData.monthSummary.NON_WORKING_DAY}</span>
//                         <small className="text-xs text-muted">Non Working Days</small>
//                       </div>
//                       <div className="inline p-x b-l b-r text-center red">
//                         <span className="h4 block m-a-0">{userData.monthSummary.LEAVE_DAY}</span>
//                         <small className="text-xs text-muted">Leave Days</small>
//                       </div>
//                       <div className="inline p-x b-l b-r text-center red-100">
//                         <span className="h4 block m-a-0">{userData.monthSummary.HALF_DAY}</span>
//                         <small className="text-xs text-muted">Half Days</small>
//                       </div>
//                       <div className="inline p-x b-l b-r text-center indigo">
//                         <span className="h4 block m-a-0">*</span>
//                         <small className="text-xs text-muted">Admin Alert</small>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {monthHtml}
//               </div>
//             </div>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   );
// };
