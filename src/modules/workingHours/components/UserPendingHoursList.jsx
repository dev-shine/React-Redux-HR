import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { CONFIG } from 'src/config/index';
import * as actions_login from 'appRedux/auth/actions/index';
import PendingHourSummary from './PendingHourSummary';
import AddUserPendingHour from './AddUserPendingHour';
import 'react-date-picker/index.css';
var moment = require('moment');

export default class UserPendingHoursList extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      pendingTimeList: {},
      usersList: []
    };
    this.callAddUserPendingHours = this.callAddUserPendingHours.bind(this);
  }

  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role === CONFIG.ADMIN) {
      } else {
        this.props.router.push('/home');
      }
    }
    this.setState({
      pendingTimeList: props.manageUserPendingHours,
      usersList: this.props.manageUserPendingHours.displayData.user_list
    });
  }

  callAddUserPendingHours (userId, pendingHour, date, reason) {
    this.props.onAddUserPendingHours(userId, pendingHour, date, reason);
  }

  render () {
    let addButton = <AddUserPendingHour {...this.props} />;

    var pendingList = this.state.usersList || [];

    let pendingTimeMap = pendingList.map((val, i) => {
      return (
        <tr key={i}>
        <td style={{marginRight: '0%'}}>{i + 1}</td>
        <td>{val.name}</td>
        <td>{val.year_and_month}</td>
        <td><mark> {val.extra_time} {'min'}</mark> </td>
        <td>{val.status}</td>
        <td>{val.date} </td>
        <td> <AddUserPendingHour val={val}
          callAddUserPendingHours={this.callAddUserPendingHours}
          {...this.props} /></td>
      </tr>
      );
    });
    return (
      <div>
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <PendingHourSummary
                  callFetchPendingTime={this.callFetchPendingUserList}
                  manageUserPendingHours={this.props.manageUserPendingHours}
                  onUserPendingHoursData={this.props.onUserPendingHoursData}

                  {...this.props} />
                    <div className="col-xs-12 b-r box">
                      <div className="p-a block">
                        <h6 className="text-center">List Pending Hours</h6>
                            <div>
                              {
                                pendingTimeMap.length > 0
                            ? <table key='' className="table table-striped table-hover">
                                <thead>
                                  <tr>
                                    <th>{'Sr.No'}</th>
                                    <th>User Name</th>
                                    <th>{'Year/Month'}</th>
                                    <th>Pending Time</th>
                                    <th>Status</th>
                                    <th>Last Updated On</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                              {pendingTimeMap}
                                </tbody>
                              </table>
                              : <div className="col-xs-6 col-xs-offset-3">
                              <i className="fa fa-exclamation-triangle fa-2x"
                                style={{marginLeft: '47%', opacity: '0.56'}} aria-hidden="true"></i>
                              <h5 style={{marginLeft: '41%', opacity: '0.56'}}>
                                {'Not Updated !'}
                              </h5>
                            </div>
                          }
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
