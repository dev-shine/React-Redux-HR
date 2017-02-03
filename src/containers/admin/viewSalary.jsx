import React from 'react';
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'
import {CONFIG} from '../../config/index'
import Menu from '../../components/generic/Menu'
import Header from '../../components/generic/header'

import LoadingIcon from '../../components/generic/LoadingIcon'
import SalaryList from '../../components/attendance/SalaryList'
import * as actions_login from '../../actions/login/index'
import * as actions_salary from '../../actions/salary/index'

class ViewSalary extends React.Component {
  constructor(props) {
    super(props);
    this.props.onIsAlreadyLogin()
    this.state = {
      empList: []
    }
  }
  componentWillMount() {
    this.props.onFetchUserSalaryDetails()
  }
  componentWillReceiveProps(props) {

    //window.scrollTo(0, 0);

    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role == CONFIG.ADMIN)
      {

      } else {
        this.props.router.push('/home');
      }
    }

    //When Admin Login---

    let emp = []
    if (props.logged_user.role == CONFIG.ADMIN) {
      if (props.employee.employee.length > 0) {
        _.forEach(props.employee.employee, function(ob, i) {
          emp.push({
            "image": ob.slack_image,
            "empName": ob.name,
            "designation": ob.jobtitle,
            "salary": ob.salary_detail,
            "holdingAmountDetail": ob.holdin_amt_detail,
            "dateOfJoining": ob.dateofjoining,
            "noOfDaysSinceJoined": String(ob.no_of_days_join),
            "preSalaryIncDetail": String(ob.previous_increment),
            "nextSallaryInc": ob.next_increment_date
          })
        })
        this.setState({empList: emp})
      }
    }

// Hr
    else if (props.logged_user.role == CONFIG.HR) {
      let subList = _.filter(props.employee.employee, (empl) => (empl.previous_increment == ""));
      console.log(subList);
      let emp = []
      if (subList.length > 0) {
        _.forEach(subList, function(ob, i) {
          emp.push({
            "image": ob.slack_image,
            "empName": ob.name,
            "designation": ob.jobtitle,
            "salary": ob.salary_detail,
            "holdingAmountDetail": ob.holdin_amt_detail,
            "dateOfJoining": ob.dateofjoining,
            "noOfDaysSinceJoined": String(ob.no_of_days_join),
            "preSalaryIncDetail": String(ob.previous_increment),
            "nextSallaryInc": ob.next_increment_date
          })
        })
        this.setState({empList: emp})
      }
    }
  }

  componentDidUpdate() {}
  render() {
    console.log(this.props);
    let table = (this.state.empList.length > 0)
      ? <SalaryList {...this.props} empList={this.state.empList}/>
      : ""
    return (
      <div>
        <Menu {...this.props }/>
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={"View Salary"} {...this.props}/>
          <div className="app-body" id="view">
            <div className="padding">
              {table}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {frontend: state.frontend.toJS(), logged_user: state.logged_user.toJS(), usersList: state.usersList.toJS(), employee: state.empSalaryList.toJS()}
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin())
    },
    onFetchUserSalaryDetails: () => {
      return dispatch(actions_salary.fetchUserSalaryDetails())
    }
  }
}

const VisibleViewSalary = connect(mapStateToProps, mapDispatchToProps)(ViewSalary)

const RouterVisibleViewSalary = withRouter(VisibleViewSalary)

export default RouterVisibleViewSalary
