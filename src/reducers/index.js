import { combineReducers } from 'redux'

import { frontend } from './frontend/index'
import { logged_user } from './user/logged_user'
import { monthlyAttendance} from './user/monthlyAttendance'
import { attendanceSummary } from './user/attendanceSummary'
import { userDaySummary } from './user/userDaySummary'
import { usersList } from './user/usersList'
import { workingHoursSummary} from './admin/workingHoursSummary'

export default combineReducers({
	frontend,
    logged_user,
    monthlyAttendance,
    attendanceSummary,
    userDaySummary,
    usersList,
    workingHoursSummary
})