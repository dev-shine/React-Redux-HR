import React from 'react'
// import {connect} from 'react-redux'
import {Link} from 'react-router'
// import * as _ from 'lodash'
import {CONFIG} from '../../config/index'
import LoggedUserInfo from '../../components/menu/LoggedUserInfo'

// const styles = {
//   headerMain: {
//     background: '#3EA8F5'
//   },
//   textWhite: {
//     color: 'white'
//   }
// }

// module.exports = menu;

class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      role: props.logged_user.role
    }
    this.click = this.click.bind(this)
  }
  click (a) {
    let id = a
    if ($('ul #' + id).hasClass('active') && $('ul li').hasClass('active')) {
      $('ul li').removeClass('active')
      $('ul #' + id).removeClass('active')
    } else {
      $('ul li').removeClass('active')
      $('ul #' + id).addClass('active')
    }
  }
  render () {
    let linkAttendanceSummary = <Link to='/attendance_summary'>Attendance Summary</Link>
    let linkLogout = <Link to='/logout'>Logout</Link>
    let linkHolidays = <Link to='/holidays'>Holidays</Link>
    let linkApplyLeave = <Link to='/apply_leave'>Apply Leave</Link>

    // user
    let linkMyCalendar = <Link to='/monthly_attendance'>My Attendance</Link>
    let linkMyLeaves = <Link to='/my_leaves'>My Leaves</Link>
    let linkMyProfile = <Link to='/my_profile'>My Profile</Link>
    let linkMyInventory = <Link to='/my_inventory'>My Inventory</Link>
    let linkSalary = <Link to='/salary'>My Salary</Link>
    let linkPolicyDocuments = <Link to='/policy_documents'>Policy Documents</Link>

    // admin
    let linkUsersList = <Link to='/home'>Employees Attendance</Link>
    let linkUserAttendanceUpload = <Link to='/uploadAttendance'>Upload Attendance</Link>
    let linkLeavesSummary = <Link to='/leaves_summary'>Leaves Summary</Link>
    let linkManageLeaves = <Link to='/manage_leaves'>Leaves</Link>
    let linkManageWorkingHours = <Link to='/manage_working_hours'>Office Hours</Link>
    let linkManageUserWorkingHours = <Link to='/manage_user_working_hours'>Employee Hours</Link>
    let linkManageSalary = <Link to='/manage_salary'>Salaries</Link>
    let linkManageUsers = <Link to='/manage_users'>Profile</Link>
    let linkManageClients = <Link to='/manage_clients'>Manage Clients</Link>
    let linkManagePayslips = <Link to='/manage_payslips'>Payslips</Link>
    let linkDocuments = <Link to='/documents'>My Documents</Link>
    let linkViewSalary = <Link to='/view_salary'>View Salary</Link>
    let linkDisabledEmployes = <Link to='/disabled_employes'>Disable Employee</Link>
    let linkUploadPolicyDocument = <Link to='/upload_policy_documents'>Upload Documents</Link>
    let linkUserPolicyDocument = <Link to='/user_policy_documents'>User Policy Documents</Link>
    let linkMailTemplates = <Link to='/mail_templates'>Mail Templates</Link>
    let linkTemplateVariable = <Link to='/add_variables'>Add Variables</Link>
    let linkTeamView = <Link to='/team_view'>Team</Link>
    let linkInventorySystem = <Link to='/inventory_system'>Inventory</Link>

    let linksToShow = <ul className="nav">
      <li className="hidden-folded">
        <span >{linkMyCalendar}</span>
      </li>
      <li className="hidden-folded">
        <span >{linkApplyLeave}</span>
      </li>
      <li className="hidden-folded">
        <span >{linkHolidays}</span>
      </li>
      <li className="hidden-folded">
        <span >{linkMyLeaves}</span>
      </li>
      <li className="hidden-folded">
        <span >{linkSalary}</span>
      </li>
      <li className="hidden-folded">
        <span >{linkMyProfile}</span>
      </li>
      <li className="hidden-folded">
        <span >{linkMyInventory}</span>
      </li>
      <li className="hidden-folded">
        <span>{linkInventorySystem}</span>
      </li>
      <li className="hidden-folded">
        <span >{linkDocuments}</span>
      </li>
      <li className="hidden-folded">
        <span >{linkPolicyDocuments}</span>
      </li>
      <li className="hidden-folded">
        <span >{linkLogout}</span>
      </li>
    </ul>
    if (this.props.logged_user.role === CONFIG.ADMIN) {
      linksToShow = <ul className="nav">
        <li id="Attendance" onClick={() => {
          let a = 'Attendance'
          this.click(a)
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
              }}>{linkUsersList}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{linkUserAttendanceUpload}</span>
            </li>
          </ul>
        </li>

        <li id="ManageEmp" onClick={() => {
          let m = 'ManageEmp'
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
              }}>{linkManageUsers}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{linkDisabledEmployes}</span>
            </li>
          </ul>
        </li>

        <li id="ManageHour" onClick={() => {
          let h = 'ManageHour'
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
              }}>{linkManageWorkingHours}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{linkManageUserWorkingHours}</span>
            </li>
          </ul>
        </li>

        <li id="ManageLeave" onClick={() => {
          let l = 'ManageLeave'
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
              }}>{linkManageLeaves}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{linkLeavesSummary}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{linkApplyLeave}</span>
            </li>
          </ul>
        </li>

        <li id="ManageSalary" onClick={() => {
          let s = 'ManageSalary'
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
              }}>{linkManageSalary}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{linkViewSalary}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{linkManagePayslips}</span>
            </li>
          </ul>
        </li>

        <li id="Templates" onClick={() => {
          let t = 'Templates'
          this.click(t)
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
              }}>{linkMailTemplates}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{linkTemplateVariable}</span>
            </li>
          </ul>
        </li>

        <li id="PolicyDocs" onClick={() => {
          let p = 'PolicyDocs'
          this.click(p)
        }} className="">
          <a>
            <span className="nav-caret text-muted">
              <i className="fa fa-caret-down"></i>
            </span>
            <span className="nav-text">Policy Documents</span>
          </a>
          <ul className="nav-sub">
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{linkUploadPolicyDocument}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600,
                'display': 'none'
              }}>{linkUserPolicyDocument}</span>
            </li>
          </ul>
        </li>

        <li className="hidden-folded">
          <span>{linkHolidays}</span>
        </li>
        <li className="hidden-folded">
          <span>{linkInventorySystem}</span>
        </li>

        <li className="hidden-folded">
          <span>{linkTeamView}</span>
        </li>
        <li className="hidden-folded">
          <span>{linkLogout}</span>
        </li>

      </ul>

// Hr---
    } else if (this.props.logged_user.role === CONFIG.HR) {
      linksToShow = <ul className="nav">
        <li className="hidden-folded">
          <span>{linkUsersList}</span>
        </li>
        <li className="hidden-folded">
          <span>{linkUserAttendanceUpload}</span>
        </li>
        <li id="ManageHour" onClick={() => {
          let h = 'ManageHour'
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
              }}>{linkManageWorkingHours}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{linkManageUserWorkingHours}</span>
            </li>
          </ul>
        </li>
        <li id="ManageLeave" onClick={() => {
          let l = 'ManageLeave'
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
              }}>{linkManageLeaves}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{linkLeavesSummary}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{linkApplyLeave}</span>
            </li>
          </ul>
        </li>

        <li id="ManageSalary"
          onClick={() => {
            let s = 'ManageSalary'
            this.click(s)
          }}
          className=""
          >
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
              }}>{linkManageSalary}</span>
            </li>
          </ul>
        </li>

        <li id="Templates" onClick={() => {
          let t = 'Templates'
          this.click(t)
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
              }}>{linkMailTemplates}</span>
            </li>
            <li className="hidden-folded">
              <span style={{
                'fontSize': 11,
                'fontWeight': 600
              }}>{linkTemplateVariable}</span>
            </li>
          </ul>
        </li>
        <li className="hidden-folded">
          <span>{linkHolidays}</span>
        </li>
        <li className="hidden-folded">
          <span>{linkInventorySystem}</span>
        </li>
        <li className="hidden-folded">
          <span>{linkManageUsers}</span>
        </li>
        <li className="hidden-folded">
          <span>
            {linkDisabledEmployes}</span>
        </li>
        <li className="hidden-folded">
          <span >{linkPolicyDocuments}</span>
        </li>
        <li className="hidden-folded">
          <span>{linkLogout}</span>
        </li>

      </ul>
    } else if (this.props.logged_user.role === CONFIG.GUEST) {
      linksToShow = <ul className="nav">
        <li className="hidden-folded">
          <span>{linkUsersList}</span>
        </li>
        <li className="hidden-folded">
          <span>{linkManageWorkingHours}</span>
        </li>
        <li className="hidden-folded">
          <span>{linkManageLeaves}</span>
        </li>
        <li className="hidden-folded">
          <span>{linkManageUserWorkingHours}</span>
        </li>
        <li className="hidden-folded">
          <span>{linkLeavesSummary}</span>
        </li>
        <li className="hidden-folded">
          <span>{linkHolidays}</span>
        </li>
        <li className="hidden-folded">
          <span>{linkLogout}</span>
        </li>

      </ul>
    }
    return (
      <div id="aside" className="app-aside modal fade nav-dropdown">
        <div className="left navside dark dk">
          <div className="navbar no-radius">
            <a className="navbar-brand">
              <img src="./favicon.ico" />
              <span className="hidden-folded inline">HR</span>
            </a>
          </div>
          <div className="hide-scroll">
            <nav className="scroll nav-light">
              {linksToShow}
            </nav>
          </div>

          <LoggedUserInfo {...this.props} />

        </div>

      </div>

    )
  }
}

export default Menu

Menu.propTypes = {
  logged_user: React.PropTypes.isRequired
}
