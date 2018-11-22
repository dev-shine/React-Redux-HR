import {combineReducers} from 'redux';

import {frontend} from '../redux/generic/reducers/frontend';
import logged_user from '../redux/auth/reducers/logged_user';
import {monthlyAttendance} from '../redux/attendance/reducers/monthlyAttendance';
import {userDaySummary} from '../redux/attendance/reducers/userDaySummary';
import {usersList} from '../redux/generic/reducers/usersList';
import {workingHoursSummary} from '../redux/workingHours/reducers/workingHoursSummary';
import holidaysList from '../redux/holidays/reducers/holidaysList';
import {applyLeave} from '../redux/leave/reducers/applyLeave';
import {listLeaves} from '../redux/leave/reducers/listLeaves';
import {manageLeave} from '../redux/leave/reducers/manageLeave';
import {leavesSummary} from '../redux/leave/reducers/leavesSummary';
import {userLeaves} from '../redux/leave/reducers/userLeaves';
import {manageUserWorkingHours} from '../redux/workingHours/reducers/manageUserWorkingHours';
import {manageUserPendingHours} from '../redux/workingHours/reducers/manageUserPendingHour';
import {salary} from '../redux/salary/reducers/salary';
import {manageSalary} from '../redux/salary/reducers/manageSalary';
import {myProfile} from '../redux/myProfile/reducers/myProfile';
import {myDocument} from '../redux/myDocuments/reducers/myDocument';
import {manageUsers} from '../redux/manageUsers/reducers/manageUsers';
import {manageRoles} from '../redux/manageRoles/reducers/manageRoles';
import {managePayslips} from '../redux/salary/reducers/managePayslips';
import {empSalaryList} from '../redux/salary/reducers/empSalaryDetails';
import policyDocuments from '../redux/policyDocuments/reducers/policyDocuments';
import {template} from '../redux/templates/reducers/template';
import teamList from '../redux/team/reducers/teamList';
import teamStats from '../redux/manageUsers/reducers/dashboard';
import {manageDevice} from '../redux/inventory/reducers/inventory';
import attendanceReq from '../redux/attendance/reducers/attendanceReq';
import empDaySummary from '../redux/attendance/reducers/empDaySummary';
import {uploadImage} from '../redux/uploadImageComp/reducers/uploadImageComp'
import healthstats from '../redux/healthStats/reducers/healthStats';
import settings from '../redux/settings/reducers';

export default combineReducers({
  frontend,
  logged_user,
  monthlyAttendance,
  userDaySummary,
  usersList,
  workingHoursSummary,
  holidaysList,
  applyLeave,
  listLeaves,
  manageLeave,
  userLeaves,
  manageUserWorkingHours,
  manageUserPendingHours,
  leavesSummary,
  salary,
  manageSalary,
  myProfile,
  myDocument,
  manageUsers,
  manageRoles,
  managePayslips,
  empSalaryList,
  policyDocuments,
  template,
  teamList,
  teamStats,
  manageDevice,
  attendanceReq,
  empDaySummary,
  uploadImage,
  healthstats,
  settings
});
