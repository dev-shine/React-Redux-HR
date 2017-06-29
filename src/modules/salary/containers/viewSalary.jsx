import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import {notify} from 'src/services/index';
import {CONFIG} from 'src/config/index';
import {isNotUserValid} from 'src/services/generic';
import Menu from 'src/components/generic/Menu';
import Header from 'components/generic/Header';
import LoadingIcon from 'components/generic/LoadingIcon';
import SalaryList from 'modules/salary/components/viewSalary/SalaryList';
import * as actions_login from 'appRedux/auth/actions/index';
import * as actions_salary from 'appRedux/salary/actions/viewSalary';

class ViewSalary extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      empList: []
    };
  }
  componentWillMount () {
    this.props.onFetchUserSalaryDetails();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.logged_user.logged_in, props.policy_documents.policyDocuments);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
    // When Admin Login---

    let emp = [];
    if (props.logged_user.role === CONFIG.ADMIN) {
      if (props.employee.employee.length > 0) {
        _.forEach(props.employee.employee, function (ob, i) {
          emp.push({
            'image':               ob.slack_image,
            'empName':             ob.name,
            'designation':         ob.jobtitle,
            'salary':              ob.salary_detail,
            'holdingAmountDetail': ob.holdin_amt_detail,
            'dateOfJoining':       ob.dateofjoining,
            'noOfDaysSinceJoined': String(ob.no_of_days_join),
            'preSalaryIncDetail':  String(ob.previous_increment),
            'nextSallaryInc':      ob.next_increment_date
          });
        });
        this.setState({empList: emp});
      }
    }

// Hr
    else if (props.logged_user.role === CONFIG.HR) {
      let subList = _.filter(props.employee.employee, (empl) => (empl.previous_increment === ''));
      let emp = [];
      if (subList.length > 0) {
        _.forEach(subList, function (ob, i) {
          emp.push({
            'image':               ob.slack_image,
            'empName':             ob.name,
            'designation':         ob.jobtitle,
            'salary':              ob.salary_detail,
            'holdingAmountDetail': ob.holdin_amt_detail,
            'dateOfJoining':       ob.dateofjoining,
            'noOfDaysSinceJoined': String(ob.no_of_days_join),
            'preSalaryIncDetail':  String(ob.previous_increment),
            'nextSallaryInc':      ob.next_increment_date
          });
        });
        this.setState({empList: emp});
      }
    }
  }

  render () {
    let table = (this.state.empList.length > 0)
      ? <SalaryList {...this.props} empList={this.state.empList} />
      : '';
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'View Salary'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              {table}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {frontend: state.frontend.toJS(), logged_user: state.logged_user.toJS(), usersList: state.usersList.toJS(), employee: state.empSalaryList.toJS()};
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin());
    },
    onFetchUserSalaryDetails: () => {
      return dispatch(actions_salary.fetchUserSalaryDetails());
    }
  };
};

const VisibleViewSalary = connect(mapStateToProps, mapDispatchToProps)(ViewSalary);

const RouterVisibleViewSalary = withRouter(VisibleViewSalary);

export default RouterVisibleViewSalary;
