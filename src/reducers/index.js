import { combineReducers } from 'redux'

import { frontend } from './frontend/index'
import { logged_user } from './user/logged_user'
import { monthlyAttendance} from './user/monthlyAttendance'
import { attendanceSummary } from './user/attendanceSummary'
import { userDaySummary } from './user/userDaySummary'
import { usersList } from './user/usersList'
import { workingHoursSummary} from './admin/workingHoursSummary'
import { holidaysList} from './user/holidaysList'
import { applyLeave} from './user/applyLeave'
import { listLeaves} from './admin/listLeaves'
import { manageLeave } from './admin/manageLeave'
import { userLeaves } from './user/userLeaves'
import { manageUserWorkingHours } from './admin/manageUserWorkingHours'
import { leavesSummary } from './admin/leavesSummary'
import { salary } from './user/salary'
import { manageSalary } from './admin/manageSalary'
import { myProfile } from './user/myProfile'
import { myDocument } from './user/myDocument'
import { manageUsers } from './admin/manageUsers'
import { clientsList } from './admin/clientsList'
import { manageClients } from './admin/manageClients'
import { managePayslips } from './admin/managePayslips'
import { empSalaryList } from './admin/empSalaryDetails'
import {variable} from './admin/variable'


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
    variable
})