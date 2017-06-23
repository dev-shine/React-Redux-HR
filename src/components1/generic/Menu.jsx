import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {CONFIG} from 'src/config/';
import LoggedUserInfo from 'components/menu/LoggedUserInfo';
import DisplayList from 'components/menu/DisplayList';

class Menu extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      role: props.logged_user.role
    };
    this.click = this.click.bind(this);
  }
  click (a) {
    let id = a;
    if ($('ul #' + id).hasClass('active') && $('ul li').hasClass('active')) {
      $('ul li').removeClass('active');
      $('ul #' + id).removeClass('active');
    } else {
      $('ul li').removeClass('active');
      $('ul #' + id).addClass('active');
    }
  }
  render () {
    let data = [
      {'id': 'linkLogout', 'path': '/logout', 'label': 'Logout', 'access': {'Admin': {'group': 0, 'label': 0, 'priority': 21}, 'HR': 1, 'Guest': 7, 'General': 12}},
      {'id': 'linkHolidays', 'path': '/holidays', 'label': 'Holidays', 'access': {'Admin': {'group': 0, 'label': 0, 'priority': 18}, 'HR': 0, 'Guest': 6, 'General': 3}},
      {'id': 'linkApplyLeave', 'path': '/apply_leave', 'label': 'Apply Leave', 'access': {'Admin': {'group': 4, 'label': 'Manage Leaves', 'priority': 10}, 'HR': 0, 'General': 2}},
      {'id': 'linkMyCalendar', 'path': '/monthly_attendance', 'label': 'My Attendance', 'access': {'General': 1}},
      {'id': 'linkMyLeaves', 'path': '/my_leaves', 'label': 'My Leaves', 'access': {'General': 4}},
      {'id': 'linkMyProfile', 'path': '/my_profile', 'label': 'My Profile', 'access': {'General': 6}},
      {'id': 'linkMyInventory', 'path': '/my_inventory', 'label': 'My Inventory', 'access': {'General': 7}},
      {'id': 'linkSalary', 'path': '/salary', 'label': 'My Salary', 'access': {'General': 5}},
      {'id': 'linkPolicyDocuments', 'path': '/policy_documents', 'label': 'Policy Documents', 'access': {'General': 11}},
      {'id': 'linkUsersList', 'path': '/home', 'label': 'Employees Attendance', 'access': {'Admin': {'group': 1, 'label': 'Attendance', 'priority': 1}, 'Guest': 1}},
      {'id': 'linkUserAttendanceUpload', 'path': '/uploadAttendance', 'label': 'Upload Attendance', 'access': {'Admin': {'group': 1, 'label': 'Attendance', 'priority': 2}}},
      {'id': 'linkLeavesSummary', 'path': '/leaves_summary', 'label': 'Leaves Summary', 'access': {'Admin': {'group': 4, 'label': 'Manage Leaves', 'priority': 9}, 'Guest': 5}},
      {'id': 'linkManageLeaves', 'path': '/manage_leaves', 'label': 'Leaves', 'access': {'Admin': {'group': 4, 'label': 'Manage Leaves', 'priority': 8}, 'Guest': 3}},
      {'id': 'linkManageWorkingHours', 'path': '/manage_working_hours', 'label': 'Office Hours', 'access': {'Admin': {'group': 3, 'label': 'Manage Hours', 'priority': 5}, 'Guest': 2}},
      {'id': 'linkManageUserWorkingHours', 'path': '/manage_user_working_hours', 'label': 'Employee Hours', 'access': {'Admin': {'group': 3, 'label': 'Manage Hours', 'priority': 7}, 'Guest': 4}},
      {'id': 'linkManageSalary', 'path': '/manage_salary', 'label': 'Salaries', 'access': {'Admin': {'group': 5, 'label': 'Manage Salary', 'priority': 11}}},
      {'id': 'linkManageUsers', 'path': '/manage_users', 'label': 'Profile', 'access': {'Admin': {'group': 2, 'label': 'Manage Employees', 'priority': 3}}},
      {'id': 'linkManagePayslips', 'path': '/manage_payslips', 'label': 'Payslips', 'access': {'Admin': {'group': 5, 'label': 'Manage Salary', 'priority': 13}}},
      {'id': 'linkDocuments', 'path': '/documents', 'label': 'My Documents', 'access': {'General': 10}},
      {'id': 'linkViewSalary', 'path': '/view_salary', 'label': 'View Salary', 'access': {'Admin': {'group': 5, 'label': 'Manage Salary', 'priority': 12}}},
      {'id': 'linkDisabledEmployes', 'path': '/disabled_employes', 'label': 'Disable Employee', 'access': {'Admin': {'group': 2, 'label': 'Manage Employees', 'priority': 4}}},
      {'id': 'linkUploadPolicyDocument', 'path': '/upload_policy_documents', 'label': 'Upload Documents', 'access': {'Admin': {'group': 7, 'label': 'Policy Documents', 'priority': 16}}},
      {'id': 'linkUserPolicyDocument', 'path': '/user_policy_documents', 'label': 'User Policy Documents', 'access': {'Admin': {'group': 7, 'label': 'Policy Documents', 'priority': 17}}},
      {'id': 'linkMailTemplates', 'path': '/mail_templates', 'label': 'Mail Templates', 'access': {'Admin': {'group': 6, 'label': 'Templates', 'priority': 14}}},
      {'id': 'linkTemplateVariable', 'path': '/add_variables', 'label': 'Add Variables', 'access': {'Admin': {'group': 6, 'label': 'Templates', 'priority': 15}}},
      {'id': 'linkTeamView', 'path': '/team_view', 'label': 'Team', 'access': {'Admin': {'group': 0, 'label': 0, 'priority': 20}}},
      {'id': 'linkInventorySystem', 'path': '/inventory_system', 'label': 'Inventory', 'access': {'Admin': {'group': 0, 'label': 0, 'priority': 19}, 'General': 8}},
      {'id': 'linkManagePendingHours', 'path': '/manage_user_pending_hours', 'label': 'Pending Hours', 'access': {'Admin': {'group': 3, 'label': 'Manage Hours', 'priority': 6}, 'General': 9}}
    ];
    let linkAttendanceSummary = <Link to='/attendance_summary'>Attendance Summary</Link>;
    let linkLogout = <Link to='/logout'>Logout</Link>;
    let linkHolidays = <Link to='/holidays'>Holidays</Link>;
    let linkApplyLeave = <Link to='/apply_leave'>Apply Leave</Link>;

    // user
    let linkMyCalendar = <Link to='/monthly_attendance'>My Attendance</Link>;
    let linkMyLeaves = <Link to='/my_leaves'>My Leaves</Link>;
    let linkMyProfile = <Link to='/my_profile'>My Profile</Link>;
    let linkMyInventory = <Link to='/my_inventory'>My Inventory</Link>;
    let linkSalary = <Link to='/salary'>My Salary</Link>;
    let linkPolicyDocuments = <Link to='/policy_documents'>Policy Documents</Link>;

    // admin
    let linkUsersList = <Link to='/home'>Employees Attendance</Link>;
    let linkUserAttendanceUpload = <Link to='/uploadAttendance'>Upload Attendance</Link>;
    let linkLeavesSummary = <Link to='/leaves_summary'>Leaves Summary</Link>;
    let linkManageLeaves = <Link to='/manage_leaves'>Leaves</Link>;
    let linkManageWorkingHours = <Link to='/manage_working_hours'>Office Hours</Link>;
    let linkManageUserWorkingHours = <Link to='/manage_user_working_hours'>Employee Hours</Link>;
    let linkManageSalary = <Link to='/manage_salary'>Salaries</Link>;
    let linkManageUsers = <Link to='/manage_users'>Profile</Link>;
    let linkManageClients = <Link to='/manage_clients'>Manage Clients</Link>;
    let linkManagePayslips = <Link to='/manage_payslips'>Payslips</Link>;
    let linkDocuments = <Link to='/documents'>My Documents</Link>;
    let linkViewSalary = <Link to='/view_salary'>View Salary</Link>;
    let linkDisabledEmployes = <Link to='/disabled_employes'>Disable Employee</Link>;
    let linkUploadPolicyDocument = <Link to='/upload_policy_documents'>Upload Documents</Link>;
    let linkUserPolicyDocument = <Link to='/user_policy_documents'>User Policy Documents</Link>;
    let linkMailTemplates = <Link to='/mail_templates'>Mail Templates</Link>;
    let linkTemplateVariable = <Link to='/add_variables'>Add Variables</Link>;
    let linkTeamView = <Link to='/team_view'>Team</Link>;
    let linkInventorySystem = <Link to='/inventory_system'>Inventory</Link>;
    let linkManagePendingHours = <Link to='/manage_user_pending_hours'>Pending Hours</Link>;

    let linksToShow = <DisplayList data={data} user="General" />;
    if (this.props.logged_user.role === CONFIG.ADMIN) {
      linksToShow = <DisplayList data={data} user="Admin" />;

// Hr---
    } else if (this.props.logged_user.role === CONFIG.HR) {
      linksToShow = <ul className="nav">
        <li className="hidden-folded"><span>{linkUsersList}</span></li>
        <li className="hidden-folded"><span>{linkUserAttendanceUpload}</span></li>
        <li id="ManageHour" onClick={() => { let h = 'ManageHour'; this.click(h); }} className="">
          <a>
            <span className="nav-caret text-muted"><i className="fa fa-caret-down"></i></span>
            <i className="nav-label"><b className="label rounded label-sm red">2</b></i>
            <span className="nav-text">Manage Hours</span>
          </a>
          <ul className="nav-sub">
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{linkManageWorkingHours}</span></li>
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{linkManageUserWorkingHours}</span></li>
          </ul>
        </li>
        <li id="ManageLeave" onClick={() => { let l = 'ManageLeave'; this.click(l); }} className="">
          <a>
            <span className="nav-caret text-muted"><i className="fa fa-caret-down"></i></span>
            <i className="nav-label"><b className="label rounded label-sm yellow">3</b></i>
            <span className="nav-text">Manage Leaves</span>
          </a>
          <ul className="nav-sub">
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{linkManageLeaves}</span></li>
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{linkLeavesSummary}</span></li>
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{linkApplyLeave}</span></li>
          </ul>
        </li>
        <li id="ManageSalary"onClick={() => { let s = 'ManageSalary'; this.click(s); }} className="">
          <a><span className="nav-caret text-muted"><i className="fa fa-caret-down"></i></span><span className="nav-text">Manage Salary</span></a>
          <ul className="nav-sub">
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{linkManageSalary}</span></li>
          </ul>
        </li>
        <li id="Templates" onClick={() => { let t = 'Templates'; this.click(t); }} className="">
          <a><span className="nav-caret text-muted"><i className="fa fa-caret-down"></i></span><span className="nav-text">Templates</span></a>
          <ul className="nav-sub">
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{linkMailTemplates}</span></li>
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{linkTemplateVariable}</span></li>
          </ul>
        </li>
        <li className="hidden-folded"><span>{linkHolidays}</span></li>
        <li className="hidden-folded"><span>{linkInventorySystem}</span></li>
        <li className="hidden-folded"><span>{linkManageUsers}</span></li>
        <li className="hidden-folded"><span>{linkDisabledEmployes}</span></li>
        <li className="hidden-folded"><span >{linkPolicyDocuments}</span></li>
        <li className="hidden-folded"><span>{linkLogout}</span></li>
      </ul>;
    } else if (this.props.logged_user.role === CONFIG.GUEST) { linksToShow = <DisplayList data={data} user="Guest" />; }
    return (
      <div id="aside" className="app-aside modal fade nav-dropdown">
        <div className="left navside dark dk">
          <div className="navbar no-radius">
            <a className="navbar-brand"><img src="./favicon.ico" /><span className="hidden-folded inline">HR</span></a>
          </div>
          <div className="hide-scroll">
            <nav className="scroll nav-light">{linksToShow}</nav>
          </div>
          <LoggedUserInfo loggedUser={this.props.logged_user} />
        </div>
      </div>
    );
  }
}

export default Menu;

Menu.PropTypes = {
  logged_user: PropTypes.func.isRequired
};
