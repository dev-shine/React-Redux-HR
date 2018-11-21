import {combineReducers} from 'redux';

import {frontend} from 'src/redux/generic/reducers/frontend';
import logged_user from 'src/redux/auth/reducers/logged_user';
import {monthlyAttendance} from 'src/redux/attendance/reducers/monthlyAttendance';
import {userDaySummary} from 'src/redux/attendance/reducers/userDaySummary';
import {usersList} from 'src/redux/generic/reducers/usersList';
import {workingHoursSummary} from 'src/redux/workingHours/reducers/workingHoursSummary';
import holidaysList from 'src/redux/holidays/reducers/holidaysList';
import {applyLeave} from 'src/redux/leave/reducers/applyLeave';
import {listLeaves} from 'src/redux/leave/reducers/listLeaves';
import {manageLeave} from 'src/redux/leave/reducers/manageLeave';
import {leavesSummary} from 'src/redux/leave/reducers/leavesSummary';
import {userLeaves} from 'src/redux/leave/reducers/userLeaves';
import {manageUserWorkingHours} from 'src/redux/workingHours/reducers/manageUserWorkingHours';
import {manageUserPendingHours} from 'src/redux/workingHours/reducers/manageUserPendingHour';
import {salary} from 'src/redux/salary/reducers/salary';
import {manageSalary} from 'src/redux/salary/reducers/manageSalary';
import {myProfile} from 'src/redux/myProfile/reducers/myProfile';
import {myDocument} from 'src/redux/myDocuments/reducers/myDocument';
import {manageUsers} from 'src/redux/manageUsers/reducers/manageUsers';
import {manageRoles} from 'src/redux/manageRoles/reducers/manageRoles';
import {managePayslips} from 'src/redux/salary/reducers/managePayslips';
import {empSalaryList} from 'src/redux/salary/reducers/empSalaryDetails';
import policyDocuments from 'src/redux/policyDocuments/reducers/policyDocuments';
import {template} from 'src/redux/templates/reducers/template';
import teamList from 'src/redux/team/reducers/teamList';
import teamStats from 'src/redux/manageUsers/reducers/dashboard';
import {manageDevice} from 'src/redux/inventory/reducers/inventory';
import attendanceReq from 'src/redux/attendance/reducers/attendanceReq';
import empDaySummary from 'src/redux/attendance/reducers/empDaySummary';
import {uploadImage} from 'src/redux/uploadImageComp/reducers/uploadImageComp'
import healthstats from 'src/redux/healthStats/reducers/healthStats';
import settings from 'src/redux/settings/reducers';

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
