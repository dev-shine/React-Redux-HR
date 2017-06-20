import { combineReducers } from 'redux';

import { frontend } from 'appRedux/generic/reducers/frontend';
import { logged_user } from 'appRedux/auth/reducers/logged_user';
import { monthlyAttendance } from 'appRedux/attendance/reducers/monthlyAttendance';
import { attendanceSummary } from './user/attendanceSummary';
import { userDaySummary } from 'appRedux/attendance/reducers/userDaySummary';
import { usersList } from 'appRedux/generic/reducers/usersList';
import { workingHoursSummary } from 'appRedux/workingHours/reducers/workingHoursSummary';
import { holidaysList } from 'appRedux/holidays/reducers/holidaysList';
import { applyLeave } from 'appRedux/leave/reducers/applyLeave';
import { listLeaves } from 'appRedux/leave/reducers/listLeaves';
import { manageLeave } from 'appRedux/leave/reducers/manageLeave';
import { leavesSummary } from 'appRedux/leave/reducers/leavesSummary';
import { userLeaves } from './user/userLeaves';
import { manageUserWorkingHours } from 'appRedux/workingHours/reducers/manageUserWorkingHours';
import { manageUserPendingHours } from 'appRedux/workingHours/reducers/manageUserPendingHour';
import { salary } from 'appRedux/salary/reducers/salary';
import { manageSalary } from 'appRedux/salary/reducers/manageSalary';
import { myProfile } from './user/myProfile';
import { myDocument } from './user/myDocument';
import { manageUsers } from './admin/manageUsers';
import { clientsList } from './admin/clientsList';
import { manageClients } from 'appRedux/manageClients/reducers/manageClients';
import { managePayslips } from 'appRedux/salary/reducers/managePayslips';
import { empSalaryList } from 'appRedux/salary/reducers/empSalaryDetails';
import {policyDocuments} from 'appRedux/policyDocuments/reducers/policyDocuments';
import {template} from './admin/template';
import {teamList} from './admin/teamList';
import {manageDevice} from './admin/inventory';

export default combineReducers({
  frontend,
  logged_user,
  monthlyAttendance,
  attendanceSummary,
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
  clientsList,
  manageClients,
  managePayslips,
  empSalaryList,
  policyDocuments,
  template,
  teamList,
  manageDevice
});
