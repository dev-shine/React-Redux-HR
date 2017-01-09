import React from 'react';
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'
import * as _ from 'lodash'
import {CONFIG} from '../../config/index'
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
    this.click = this.click.bind(this)
  }
  click(a) {
    let id = a;
    if ($("ul #" + id).hasClass("active") && $("ul li").hasClass("active")) {
      $("ul li").removeClass("active")
      $("ul #" + id).removeClass("active")
    } else {
      $("ul li").removeClass("active")
      $("ul #" + id).addClass("active")
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
    let link_user_attendance_upload = <Link to='/uploadAttendance'>Upload Attendance</Link>
    let link_leaves_summary = <Link to='/leaves_summary'>Leaves Summary</Link>
    let link_manage_leaves = <Link to='/manage_leaves'>Leaves</Link>
    let link_manage_working_hours = <Link to='/manage_working_hours'>Office Hours</Link>
    let link_manage_user_working_hours = <Link to='/manage_user_working_hours'>Employee Hours</Link>
    let link_manage_salary = <Link to='/manage_salary'>Salaries</Link>
    let link_manage_users = <Link to='/manage_users'>Profile</Link>
    let link_manage_clients = <Link to='/manage_clients'>Manage Clients</Link>
    let link_manage_payslips = <Link to='/manage_payslips'>Payslips</Link>
    let link_documents = <Link to='/documents'>My Documents</Link>
    let link_view_salary = <Link to='/view_salary'>View Salary</Link>
    let link_disabled_employes = <Link to='/disabled_employes'>Disable Employee</Link>
    let link_mail_templates = <Link to='/mail_templates'>Mail Templates</Link>
    let link_template_variable = <Link to='/add_variables'>Add Variables</Link>
    let link_team_view = <Link to='/team_view'>Team</Link>

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
    if (this.props.logged_user.role == CONFIG.ADMIN) {
      links_to_show = <ul className="nav">
        <li id="Attendance" onClick={() => {
          let a = "Attendance";
          this.click(a);
        }} className="">
          <a>
            <span className="nav-caret text-muted">
              <i className="fa fa-caret-down"></i>
            </span>
            <span className="nav-text">Attendance</span>
          </a>
          <ul className="nav-sub">
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_users_list}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_user_attendance_upload}</span>
            </li>
          </ul>
        </li>
        <li id="ManageEmp" onClick={() => {
          let m = "ManageEmp";
          this.click(m)
        }} className="">
          <a>
            <span className="nav-caret text-muted">
              <i className="fa fa-caret-down"></i>
            </span>
            <span className="nav-text">Manage Employees</span>
          </a>
          <ul className="nav-sub">
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_manage_users}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_disabled_employes}</span>
            </li>
          </ul>
        </li>
        <li id="ManageHour" onClick={() => {
          let h = "ManageHour";
          this.click(h)
        }} className="">
          <a>
            <span className="nav-caret text-muted">
              <i className="fa fa-caret-down"></i>
            </span>
            <span className="nav-text">Manage Hours</span>
          </a>
          <ul className="nav-sub">
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_manage_working_hours}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_manage_user_working_hours}</span>
            </li>
          </ul>
        </li>
        <li id="ManageLeave" onClick={() => {
          let l = "ManageLeave";
          this.click(l)
        }} className="">
          <a>
            <span className="nav-caret text-muted">
              <i className="fa fa-caret-down"></i>
            </span>
            <span className="nav-text">Manage Leaves</span>
          </a>
          <ul className="nav-sub">
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_manage_leaves}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_leaves_summary}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_apply_leave}</span>
            </li>
          </ul>
        </li>
        <li id="ManageSalary" onClick={() => {
          let s = "ManageSalary";
          this.click(s)
        }} className="">
          <a>
            <span className="nav-caret text-muted">
              <i className="fa fa-caret-down"></i>
            </span>
            <span className="nav-text">Manage Salary</span>
          </a>
          <ul className="nav-sub">
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_manage_salary}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_view_salary}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_manage_payslips}</span>
            </li>
          </ul>
        </li>
        <li id="Templates" onClick={() => {
          let t = "Templates";
          this.click(t);
        }} className="">
          <a>
            <span className="nav-caret text-muted">
              <i className="fa fa-caret-down"></i>
            </span>
            <span className="nav-text">Templates</span>
          </a>
          <ul className="nav-sub">
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_mail_templates}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_template_variable}</span>
            </li>
          </ul>
        </li>
        <li className="hidden-folded">
          <span>{link_holidays}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_team_view}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_logout}</span>
        </li>
      </ul>
    } else if (this.props.logged_user.role == CONFIG.HR) {
      links_to_show = <ul className="nav">
        <li className="hidden-folded">
          <span>{link_users_list}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_user_attendance_upload}</span>
        </li>
        <li id="ManageHour" onClick={() => {
          let h = "ManageHour";
          this.click(h)
        }} className="">
          <a>
            <span className="nav-caret text-muted">
              <i className="fa fa-caret-down"></i>
            </span>
            <i className="nav-label">
              <b className="label rounded label-sm red">2</b>
            </i>
            <span className="nav-text">Manage Hours</span>
          </a>
          <ul className="nav-sub">
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_manage_working_hours}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_manage_user_working_hours}</span>
            </li>
          </ul>
        </li>
        <li id="ManageLeave" onClick={() => {
          let l = "ManageLeave";
          this.click(l)
        }} className="">
          <a>
            <span className="nav-caret text-muted">
              <i className="fa fa-caret-down"></i>
            </span>
            <i className="nav-label">
              <b className="label rounded label-sm yellow">3</b>
            </i>
            <span className="nav-text">Manage Leaves</span>
          </a>
          <ul className="nav-sub">
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_manage_leaves}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_leaves_summary}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_apply_leave}</span>
            </li>
          </ul>
        </li>
        <li id="Templates" onClick={() => {
          let t = "Templates";
          this.click(t);
        }} className="">
          <a>
            <span className="nav-caret text-muted">
              <i className="fa fa-caret-down"></i>
            </span>
            <span className="nav-text">Templates</span>
          </a>
          <ul className="nav-sub">
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_mail_templates}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{link_template_variable}</span>
            </li>
          </ul>
        </li>
        <li className="hidden-folded">
          <span>{link_holidays}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_manage_users}</span>
        </li>
        <li className="hidden-folded">
          <span>{link_logout}</span>
        </li>

      </ul>
    } else if (this.props.logged_user.role == CONFIG.GUEST) {
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
              <img src="./favicon.ico"/>
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
