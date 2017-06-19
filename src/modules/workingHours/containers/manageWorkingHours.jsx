import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {CONFIG} from 'src/config/index';
import {notify} from 'src/services/index';
import Menu from 'components/generic/Menu';
import Header from 'components/generic/Header';
import WorkingHoursSummary from 'components/workingHours/WorkingHoursSummary';
import * as actionsLogin from 'appRedux/auth/actions/index';
import * as actionsPolicy from 'appRedux/policyDocuments/actions/index';
import * as actionsWorkingHoursSummary from 'appRedux/workingHours/actions/workingHoursSummary';

class ManageWorkingHours extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      'defaultUserDisplay': '',
      'daysummary_userid': '',
      'daysummary_date': ''
    };
    this.onWorkingHoursChange = this.onWorkingHoursChange.bind(this);
  }
  componentWillMount () {
    this.props.onFetchUserPolicyDocument();
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    this.props.onWorkingHoursSummary(year, month);
  }
  componentWillReceiveProps (props) {
    if (props.logged_user.logged_in === -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role === CONFIG.ADMIN || props.logged_user.role === CONFIG.GUEST) {

      } else if (props.logged_user.role === CONFIG.HR) {
        let unread = _.filter(props.policy_documents.policyDocuments, function (o) { return o.read === 0; }) || [];
        if (unread.length > 0) {
          this.props.router.push('/policy_documents');
        }
      } else {
        this.props.router.push('/monthly_attendance');
      }
    }
    if (props.workingHoursSummary.status_message !== '') {
      notify(props.workingHoursSummary.status_message);
    }
  }
  onWorkingHoursChange (date, hours) {
    if (hours === '') {} else {
      this.props.onUpdateDayWorkingHours(date, hours).then((data) => {}, (error) => {
        notify(error);
      });
    }
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main" >
          <Header pageTitle={'Manage Working Hours'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-12">
                  <WorkingHoursSummary workingHoursSummary={this.props.workingHoursSummary} onWorkingHoursChange={this.onWorkingHoursChange} onWorkingHoursSummary={this.props.onWorkingHoursSummary} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend: state.frontend.toJS(),
    logged_user: state.logged_user.toJS(),
    userDaySummary: state.userDaySummary.toJS(),
    workingHoursSummary: state.workingHoursSummary.toJS(),
    policy_documents: state.policyDocuments.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actionsLogin.isAlreadyLogin());
    },
    onWorkingHoursSummary: (year, month) => {
      return dispatch(actionsWorkingHoursSummary.get_working_hours_summary(year, month));
    },
    onUpdateDayWorkingHours: (date, time) => {
      return dispatch(actionsWorkingHoursSummary.update_day_working_hours(date, time));
    },
    onFetchUserPolicyDocument: () => {
      return dispatch(actionsPolicy.fetchUserPolicyDocument());
    }
  };
};

const VisibleManageWorkingHours = connect(mapStateToProps, mapDispatchToProps)(ManageWorkingHours);

const RouterVisibleManageWorkingHours = withRouter(VisibleManageWorkingHours);

export default RouterVisibleManageWorkingHours;
