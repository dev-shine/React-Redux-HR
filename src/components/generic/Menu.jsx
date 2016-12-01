import React from 'react';
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'
import * as _ from 'lodash'

import * as actions_login from '../../actions/login/index'

import LoggedUserInfo from '../../components/menu/LoggedUserInfo'

const styles = {
  headerMain: {
    background: '#3EA8F5'
  },
  textWhite: {
    color: 'white'
  }
};

//module.exports = menu;

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: props.logged_user.role
    }
  }
  render() {

    let link_attendance_summary = <Link to='/attendance_summary'>Attendance Summary</Link>
    let link_logout = <Link to='/logout'>Logout</Link>
    let link_holidays = <Link to='/holidays'>Holidays</Link>
    let link_apply_leave = <Link to='/apply_leave'>Apply Leave</Link>

    //user
    let link_my_calendar = <Link to='/monthly_attendance'>My Attendance</Link>
    let link_my_leaves = <Link to='/my_leaves'>My Leaves</Link>
    let link_my_profile = <Link to='/my_profile'>My Profile</Link>
    let link_salary = <Link to='/salary'>My Salary</Link>

    //admin
    let link_users_list = <Link to='/home'>Employees Attendance</Link>
    let link_leaves_summary = <Link to='/leaves_summary'>Leaves Summary</Link>
    let link_manage_leaves = <Link to='/manage_leaves'>Manage Leaves</Link>
    let link_manage_working_hours = <Link to='/manage_working_hours'>Manage Office Hours</Link>
    let link_manage_user_working_hours = <Link to='/manage_user_working_hours'>Manage Employee Hours</Link>
    let link_manage_salary = <Link to='/manage_salary'>Manage Salaries</Link>
    let link_manage_users = <Link to='/manage_users'>Manage Employees Profile</Link>
    let link_manage_clients = <Link to='/manage_clients'>Manage Clients</Link>
    let link_manage_payslips = <Link to='/manage_payslips'>Manage Payslips</Link>
    let link_documents = <Link to='/documents'>My Documents</Link>
    let link_manageUserStatus = <Link to='/manage_user_status'>Manage User Status</Link>
    let link_view_salary = <Link to='/view_salary'>View Salary</Link>

    let links_to_show = <ul className="nav">
      <li className="hidden-folded">
        <span >{link_my_calendar}</span>
      </li>
      <li className="hidden-folded">
        <span >{link_apply_leave}</span>
      </li>
      <li className="hidden-folded">
        <span >{link_holidays}</span>
      </li>
      <li className="hidden-folded">
        <span >{link_my_leaves}</span>
      </li>
      <li className="hidden-folded">
        <span >{link_salary}</span>
      </li>
      <li className="hidden-folded">
        <span >{link_my_profile}</span>
      </li>
      <li className="hidden-folded">
        <span >{link_documents}</span>
      </li>
      <li className="hidden-folded">
        <span >{link_logout}</span>
      </li>
    </ul>

    if (this.props.logged_user.role == 'Admin') {
      links_to_show = <ul className="nav">
        <li className="hidden-folded">
          <span>{link_users_list}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manage_working_hours}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manage_leaves}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manage_user_working_hours}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_leaves_summary}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_holidays}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_apply_leave}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manage_salary}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manage_users}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manage_payslips}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manageUserStatus}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_view_salary}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_logout}</span>
        </li>

      </ul>
    } else if (this.props.logged_user.role == 'HR') {
      links_to_show = <ul className="nav">
        <li className="hidden-folded">
          <span>{link_users_list}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manage_working_hours}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manage_leaves}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manage_user_working_hours}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_leaves_summary}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_holidays}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_apply_leave}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manage_users}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manageUserStatus}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_logout}</span>
        </li>

      </ul>
    } else if (this.props.logged_user.role == 'Guest') {
      links_to_show = <ul className="nav">
        <li className="hidden-folded">
          <span>{link_users_list}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manage_working_hours}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manage_leaves}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manage_user_working_hours}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_leaves_summary}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_holidays}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_logout}</span>
        </li>

      </ul>
    }

    return (
      <div id="aside" className="app-aside modal fade nav-dropdown">
        <div className="left navside dark dk">
          <div className="navbar no-radius">
            <a className="navbar-brand">
              <svg viewBox="0 0 48 48" width="24" height="24">
                <path d="M 4 4 L 44 4 L 44 44 Z" fill="#F5F5F5"></path>
                <path d="M 4 4 L 34 4 L 24 24 Z" fill="rgba(0,0,0,0.15)"></path>
                <path d="M 4 4 L 24 4 L 4  44 Z" fill="#f44455"></path>
              </svg>
              <img src="" alt="." className="hide"/>
              <span className="hidden-folded inline">HR</span>
            </a>
          </div>
          <div className="hide-scroll">
            <nav className="scroll nav-light">
              {links_to_show}
            </nav>
          </div>

          <LoggedUserInfo {...this.props}/>

        </div>

      </div>

    )

  }
}

export default Menu
