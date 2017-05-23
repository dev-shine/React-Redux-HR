import { combineReducers } from 'redux'

import { frontend } from './frontend/index'
import { logged_user } from '../redux/auth/reducers/logged_user'
import { monthlyAttendance} from './user/monthlyAttendance'
import { attendanceSummary } from './user/attendanceSummary'
import { userDaySummary } from './user/userDaySummary'
import { usersList } from '../redux/generic/reducers/usersList'
import { workingHoursSummary} from './admin/workingHoursSummary'
import { holidaysList} from './user/holidaysList'
import { applyLeave} from '../redux/leave/reducers/applyLeave'
import { listLeaves} from './admin/listLeaves'
import { manageLeave } from '../redux/leave/reducers/manageLeave'
import { userLeaves } from './user/userLeaves'
import { manageUserWorkingHours } from './admin/manageUserWorkingHours'
import { leavesSummary } from '../redux/leave/reducers/leavesSummary'
import { salary } from './user/salary'
import { manageSalary } from './admin/manageSalary'
import { myProfile } from './user/myProfile'
import { myDocument } from './user/myDocument'
import { manageUsers } from './admin/manageUsers'
import { clientsList } from './admin/clientsList'
import { manageClients } from './admin/manageClients'
import { managePayslips } from './admin/managePayslips'
import { empSalaryList } from './admin/empSalaryDetails'
import {policyDocuments} from '../redux/policyDocuments/reducers/policyDocuments'
import {template} from './admin/template'
import {teamList} from './admin/teamList'
import {manageDevice} from './admin/inventory'


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
})
