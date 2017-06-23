import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {CONFIG} from 'src/config/';
import LoggedUserInfo from 'components/menu/LoggedUserInfo';
import DisplayMenuList from 'components/menu/DisplayMenuList';

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
      {'id': 'lMyCalendar', 'path': '/monthly_attendance', 'label': 'My Attendance', 'access': {'Employee': 1}},
      {'id': 'lUsersList', 'path': '/home', 'label': 'Employees Attendance', 'access': {'Admin': {'group': 1, 'label': 'Attendance', 'priority': 1}, 'HR': {'group': -1, 'priority': 1}, 'Guest': 1}},
      {'id': 'lUserAttendanceUpload', 'path': '/uploadAttendance', 'label': 'Upload Attendance', 'access': {'Admin': {'group': 1, 'label': 'Attendance', 'priority': 2}, 'HR': {'group': 0, 'priority': 2}}},
      {'id': 'lManageUsers', 'path': '/manage_users', 'label': 'Profile', 'access': {'Admin': {'group': 2, 'label': 'Manage Employees', 'priority': 3}}},
      {'id': 'lDisabledEmployes', 'path': '/disabled_employes', 'label': 'Disable Employee', 'access': {'Admin': {'group': 2, 'label': 'Manage Employees', 'priority': 4}}},
      {'id': 'lManageWorkingHours', 'path': '/manage_working_hours', 'label': 'Office Hours', 'access': {'Admin': {'group': 3, 'label': 'Manage Hours', 'priority': 5}, 'HR': {'group': 1, 'priority': 3}, 'Guest': 2}},
      {'id': 'lManagePendingHours', 'path': '/manage_user_pending_hours', 'label': 'Pending Hours', 'access': {'Admin': {'group': 3, 'label': 'Manage Hours', 'priority': 6}, 'Employee': 9}},
      {'id': 'lManageUserWorkingHours', 'path': '/manage_user_working_hours', 'label': 'Employee Hours', 'access': {'Admin': {'group': 3, 'label': 'Manage Hours', 'priority': 7}, 'HR': {'group': 1, 'priority': 4}, 'Guest': 4}},
      {'id': 'lManageLeaves', 'path': '/manage_leaves', 'label': 'Leaves', 'access': {'Admin': {'group': 4, 'label': 'Manage Leaves', 'priority': 8}, 'HR': {'group': 2, 'priority': 5}, 'Guest': 3}},
      {'id': 'lLeavesSummary', 'path': '/leaves_summary', 'label': 'Leaves Summary', 'access': {'Admin': {'group': 4, 'label': 'Manage Leaves', 'priority': 9}, 'HR': {'group': 2, 'priority': 6}, 'Guest': 5}},
      {'id': 'lApplyLeave', 'path': '/apply_leave', 'label': 'Apply Leave', 'access': {'Admin': {'group': 4, 'label': 'Manage Leaves', 'priority': 10}, 'HR': {'group': 2, 'priority': 7}, 'Employee': 2}},
      {'id': 'lManageSalary', 'path': '/manage_salary', 'label': 'Salaries', 'access': {'Admin': {'group': 5, 'label': 'Manage Salary', 'priority': 11}, 'HR': {'group': 3, 'priority': 8}}},
      {'id': 'lViewSalary', 'path': '/view_salary', 'label': 'View Salary', 'access': {'Admin': {'group': 5, 'label': 'Manage Salary', 'priority': 12}}},
      {'id': 'lManagePayslips', 'path': '/manage_payslips', 'label': 'Payslips', 'access': {'Admin': {'group': 5, 'label': 'Manage Salary', 'priority': 13}}},
      {'id': 'lMailTemplates', 'path': '/mail_templates', 'label': 'Mail Templates', 'access': {'Admin': {'group': 6, 'label': 'Templates', 'priority': 14}, 'HR': {'group': 4, 'priority': 9}}},
      {'id': 'lTemplateVariable', 'path': '/add_variables', 'label': 'Add Variables', 'access': {'Admin': {'group': 6, 'label': 'Templates', 'priority': 15}, 'HR': {'group': 4, 'priority': 10}}},
      {'id': 'lUploadPolicyDocs', 'path': '/upload_policy_documents', 'label': 'Upload Documents', 'access': {'Admin': {'group': 7, 'label': 'Policy Documents', 'priority': 16}}},
      {'id': 'lMyLeaves', 'path': '/my_leaves', 'label': 'My Leaves', 'access': {'Employee': 4}},
      {'id': 'lSalary', 'path': '/salary', 'label': 'My Salary', 'access': {'Employee': 5}},
      {'id': 'lMyProfile', 'path': '/my_profile', 'label': 'My Profile', 'access': {'Employee': 6}},
      {'id': 'lMyInventory', 'path': '/my_inventory', 'label': 'My Inventory', 'access': {'Employee': 7}},
      {'id': 'lDocs', 'path': '/documents', 'label': 'My Documents', 'access': {'Employee': 10}},
      {'id': 'lPolicyDocs', 'path': '/policy_documents', 'label': 'Policy Documents', 'access': {'Employee': 11}},
      {'id': 'lHolidays', 'path': '/holidays', 'label': 'Holidays', 'access': {'Admin': {'group': 8, 'priority': 18}, 'Guest': 6, 'Employee': 3}},
      {'id': 'lInventorySystem', 'path': '/inventory_system', 'label': 'Inventory', 'access': {'Admin': {'group': 8, 'priority': 19}, 'Employee': 8}},
      {'id': 'lTeamView', 'path': '/team_view', 'label': 'Team', 'access': {'Admin': {'group': 8, 'priority': 20}}},
      {'id': 'lLogout', 'path': '/logout', 'label': 'Logout', 'access': {'Admin': {'group': 8, 'priority': 21}, 'HR': {'group': 8, 'priority': 1}, 'Guest': 7, 'Employee': 12}}
    ];
    let lUsersList = <Link to='/home'>Employees Attendance</Link>;
    let lUserAttendanceUpload = <Link to='/uploadAttendance'>Upload Attendance</Link>;

    let lManageWorkingHours = <Link to='/manage_working_hours'>Office Hours</Link>;
    let lManageUserWorkingHours = <Link to='/manage_user_working_hours'>Employee Hours</Link>;

    let lManageLeaves = <Link to='/manage_leaves'>Leaves</Link>;
    let lLeavesSummary = <Link to='/leaves_summary'>Leaves Summary</Link>;
    let lApplyLeave = <Link to='/apply_leave'>Apply Leave</Link>;

    let lManageSalary = <Link to='/manage_salary'>Salaries</Link>;

    let lMailTemplates = <Link to='/mail_templates'>Mail Templates</Link>;
    let lTemplateVariable = <Link to='/add_variables'>Add Variables</Link>;

    let lHolidays = <Link to='/holidays'>Holidays</Link>;
    let lInventorySystem = <Link to='/inventory_system'>Inventory</Link>;
    let lManageUsers = <Link to='/manage_users'>Profile</Link>;
    let lDisabledEmployes = <Link to='/disabled_employes'>Disable Employee</Link>;
    let lPolicyDocuments = <Link to='/policy_documents'>Policy Documents</Link>;
    let lLogout = <Link to='/logout'>Logout</Link>;

    let linksToShow = <DisplayMenuList data={data} user="Employee" />;
    if (this.props.logged_user.role === CONFIG.ADMIN) {
      linksToShow = <DisplayMenuList data={data} user="Admin" click={(id) => this.click(id)} />;
    } else if (this.props.logged_user.role === CONFIG.HR) {
      linksToShow = <ul className="nav">
        <li className="hidden-folded"><span>{lUsersList}</span></li>
        <li className="hidden-folded"><span>{lUserAttendanceUpload}</span></li>
        <li id="ManageHour" onClick={() => { let h = 'ManageHour'; this.click(h); }} className="">
          <a>
            <span className="nav-caret text-muted"><i className="fa fa-caret-down"></i></span>
            <i className="nav-label"><b className="label rounded label-sm red">2</b></i>
            <span className="nav-text">Manage Hours</span>
          </a>
          <ul className="nav-sub">
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{lManageWorkingHours}</span></li>
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{lManageUserWorkingHours}</span></li>
          </ul>
        </li>
        <li id="ManageLeave" onClick={() => { let l = 'ManageLeave'; this.click(l); }} className="">
          <a>
            <span className="nav-caret text-muted"><i className="fa fa-caret-down"></i></span>
            <i className="nav-label"><b className="label rounded label-sm yellow">3</b></i>
            <span className="nav-text">Manage Leaves</span>
          </a>
          <ul className="nav-sub">
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{lManageLeaves}</span></li>
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{lLeavesSummary}</span></li>
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{lApplyLeave}</span></li>
          </ul>
        </li>
        <li id="ManageSalary"onClick={() => { let s = 'ManageSalary'; this.click(s); }} className="">
          <a><span className="nav-caret text-muted"><i className="fa fa-caret-down"></i></span><span className="nav-text">Manage Salary</span></a>
          <ul className="nav-sub">
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{lManageSalary}</span></li>
          </ul>
        </li>
        <li id="Templates" onClick={() => { let t = 'Templates'; this.click(t); }} className="">
          <a><span className="nav-caret text-muted"><i className="fa fa-caret-down"></i></span><span className="nav-text">Templates</span></a>
          <ul className="nav-sub">
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{lMailTemplates}</span></li>
            <li className="hidden-folded"><span style={{'fontSize': 11, 'fontWeight': 600}}>{lTemplateVariable}</span></li>
          </ul>
        </li>
        <li className="hidden-folded"><span>{lHolidays}</span></li>
        <li className="hidden-folded"><span>{lInventorySystem}</span></li>
        <li className="hidden-folded"><span>{lManageUsers}</span></li>
        <li className="hidden-folded"><span>{lDisabledEmployes}</span></li>
        <li className="hidden-folded"><span >{lPolicyDocuments}</span></li>
        <li className="hidden-folded"><span>{lLogout}</span></li>
      </ul>;
    } else if (this.props.logged_user.role === CONFIG.GUEST) { linksToShow = <DisplayMenuList data={data} user="Guest" />; }
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
