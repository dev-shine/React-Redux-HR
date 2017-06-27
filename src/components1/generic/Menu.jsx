import React from 'react';
import PropTypes from 'prop-types';
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
      {'id': 'lUsersList', 'path': '/home', 'label': 'Employees Attendance', 'plabel': 'Attendance', 'access': {'Admin': {'group': 1, 'priority': 1}, 'HR': {'group': 0, 'priority': 1}, 'Guest': 1}},
      {'id': 'lUserAttendanceUpload', 'path': '/uploadAttendance', 'label': 'Upload Attendance', 'plabel': 'Attendance', 'access': {'Admin': {'group': 1, 'priority': 2}, 'HR': {'group': 0, 'priority': 2}}},
      {'id': 'lManageUsers', 'path': '/manage_users', 'label': 'Profile', 'plabel': 'Manage Employees', 'access': {'Admin': {'group': 2, 'priority': 3}, 'HR': {'group': 5, 'priority': 13}}},
      {'id': 'lDisabledEmployes', 'path': '/disabled_employes', 'label': 'Disable Employee', 'plabel': 'Manage Employees', 'access': {'Admin': {'group': 2, 'priority': 4}, 'HR': {'group': 5, 'priority': 14}}},
      {'id': 'lManageWorkingHours', 'path': '/manage_working_hours', 'label': 'Office Hours', 'plabel': 'Manage Hours', 'access': {'Admin': {'group': 3, 'priority': 5}, 'HR': {'group': 1, 'priority': 3}, 'Guest': 2}},
      {'id': 'lManagePendingHours', 'path': '/manage_user_pending_hours', 'label': 'Pending Hours', 'plabel': 'Manage Hours', 'access': {'Admin': {'group': 3, 'priority': 6}, 'Employee': 9}},
      {'id': 'lManageUserWorkingHours', 'path': '/manage_user_working_hours', 'label': 'Employee Hours', 'plabel': 'Manage Hours', 'access': {'Admin': {'group': 3, 'priority': 7}, 'HR': {'group': 1, 'priority': 4}, 'Guest': 4}},
      {'id': 'lManageLeaves', 'path': '/manage_leaves', 'label': 'Leaves', 'plabel': 'Manage Leaves', 'access': {'Admin': {'group': 4, 'priority': 8}, 'HR': {'group': 2, 'priority': 5}, 'Guest': 3}},
      {'id': 'lLeavesSummary', 'path': '/leaves_summary', 'label': 'Leaves Summary', 'plabel': 'Manage Leaves', 'access': {'Admin': {'group': 4, 'priority': 9}, 'HR': {'group': 2, 'priority': 6}, 'Guest': 5}},
      {'id': 'lApplyLeave', 'path': '/apply_leave', 'label': 'Apply Leave', 'plabel': 'Manage Leaves', 'access': {'Admin': {'group': 4, 'priority': 10}, 'HR': {'group': 2, 'priority': 7}, 'Employee': 2}},
      {'id': 'lManageSalary', 'path': '/manage_salary', 'label': 'Salaries', 'plabel': 'Manage Salary', 'access': {'Admin': {'group': 5, 'priority': 11}, 'HR': {'group': 3, 'priority': 8}}},
      {'id': 'lViewSalary', 'path': '/view_salary', 'label': 'View Salary', 'plabel': 'Manage Salary', 'access': {'Admin': {'group': 5, 'priority': 12}}},
      {'id': 'lManagePayslips', 'path': '/manage_payslips', 'label': 'Payslips', 'plabel': 'Manage Salary', 'access': {'Admin': {'group': 5, 'priority': 13}}},
      {'id': 'lMailTemplates', 'path': '/mail_templates', 'label': 'Mail Templates', 'plabel': 'Templates', 'access': {'Admin': {'group': 6, 'priority': 14}, 'HR': {'group': 4, 'priority': 9}}},
      {'id': 'lTemplateVariable', 'path': '/add_variables', 'label': 'Add Variables', 'plabel': 'Templates', 'access': {'Admin': {'group': 6, 'priority': 15}, 'HR': {'group': 4, 'priority': 10}}},
      {'id': 'lUploadPolicyDocs', 'path': '/upload_policy_documents', 'label': 'Upload Documents', 'plabel': 'Policy Documents', 'access': {'Admin': {'group': 7, 'priority': 16}}},
      {'id': 'lMyLeaves', 'path': '/my_leaves', 'label': 'My Leaves', 'access': {'Employee': 4}},
      {'id': 'lSalary', 'path': '/salary', 'label': 'My Salary', 'access': {'Employee': 5}},
      {'id': 'lMyProfile', 'path': '/my_profile', 'label': 'My Profile', 'access': {'Employee': 6}},
      {'id': 'lMyInventory', 'path': '/my_inventory', 'label': 'My Inventory', 'access': {'Employee': 7}},
      {'id': 'lDocs', 'path': '/documents', 'label': 'My Documents', 'access': {'Employee': 10}},
      {'id': 'lPolicyDocs', 'path': '/policy_documents', 'label': 'Policy Documents', 'access': {'HR': {'group': 5, 'priority': 15}, 'Employee': 11}},
      {'id': 'lHolidays', 'path': '/holidays', 'label': 'Holidays', 'access': {'Admin': {'group': 8, 'priority': 18}, 'HR': {'group': 5, 'priority': 11}, 'Guest': 6, 'Employee': 3}},
      {'id': 'lInventorySystem', 'path': '/inventory_system', 'label': 'Inventory', 'access': {'Admin': {'group': 8, 'priority': 19}, 'HR': {'group': 5, 'priority': 12}, 'Employee': 8}},
      {'id': 'lTeamView', 'path': '/team_view', 'label': 'Team', 'access': {'Admin': {'group': 8, 'priority': 20}}},
      {'id': 'lLogout', 'path': '/logout', 'label': 'Logout', 'access': {'Admin': {'group': 8, 'priority': 21}, 'HR': {'group': 5, 'priority': 16}, 'Guest': 7, 'Employee': 12}}
    ];

    return (
      <div id="aside" className="app-aside modal fade nav-dropdown">
        <div className="left navside dark dk">
          <div className="navbar no-radius">
            <a className="navbar-brand"><img src="./favicon.ico" /><span className="hidden-folded inline">HR</span></a>
          </div>
          <div className="hide-scroll">
            <nav className="scroll nav-light"><DisplayMenuList user={this.props.logged_user.role} click={(id) => this.click(id)} /></nav>
          </div>
          <LoggedUserInfo loggedUser={this.props.logged_user} />
        </div>
      </div>
    );
  }
}

export default Menu;

Menu.PropTypes = {
  logged_user: PropTypes.shape({
    role: PropTypes.string.isRequired
  }).isRequired
};
