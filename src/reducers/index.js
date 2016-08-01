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
    manageUserWorkingHours
})