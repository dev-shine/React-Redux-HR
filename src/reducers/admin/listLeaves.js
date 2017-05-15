import Immutable from 'immutable'
import * as _ from 'lodash'

let initialState = {
  all_leaves: [],
  leaves: [],
  selectedLeave: {}
}

export function listLeaves (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_LIST_LEAVES_SUCCESS') {
    let leavesList = action.payload.data.leaves
    let newLeavesList
    if (action.payload.role === 'Admin') {
      newLeavesList = _.filter(leavesList, {'status': 'Pending', 'hr_approved': '1'})
    } else {
      newLeavesList = _.filter(leavesList, {'status': 'Pending', 'hr_approved': '0'})
    }

    let selectedLeave = newLeavesList[0]
    return state.set('leaves', newLeavesList)
        .set('selectedLeave', selectedLeave)
        .set('all_leaves', leavesList)
  } else if (action.type === 'ACTION_LIST_LEAVES_EMPTY') {
    return state
  } else if (action.type === 'ACTION_LIST_LEAVES_ERROR') {
    return state
  } else if (action.type === 'ACTION_SELECT_LEAVE') {
    let leavesList = state.get('leaves')
    let newSelect = _.find(leavesList, { id: action.payload })

    let newLeavesList = _.map(leavesList, (d, k) => {
      if (action.payload === d.id) {
        d.option_select = 1
      } else {
        d.option_select = 0
      }
      return d
    })

    return state.set('selectedLeave', newSelect)
        .set('leaves', newLeavesList)
  } else if (action.type === 'ACTION_LEAVE_FILTER') {
    let appliedFilter = action.payload
    let leavesList = state.get('all_leaves')
    let newLeavesList
    if (appliedFilter === 'Pending by HR') {
      newLeavesList = _.filter(leavesList, { 'status': 'Pending', 'hr_approved': '1' })
    } else if (appliedFilter === 'HR') {
      newLeavesList = leavesList.filter(leaves => leaves.status === 'Pending' && leaves.hr_approved != '1')
    } else if (appliedFilter === 'Pending') {
      newLeavesList = _.filter(leavesList, { 'status': 'Pending', 'hr_approved': '0' })
    } else if (appliedFilter === 'ApprovedByHr') {
      newLeavesList = _.filter(leavesList, { 'status': 'Pending', 'hr_approved': '1' })
    } else {
      newLeavesList = _.filter(leavesList, { 'status': appliedFilter })
    }
    let selectedLeave = newLeavesList[0]

    return state.set('leaves', newLeavesList)
        .set('selectedLeave', selectedLeave)
  } else {
    return state
  }
}
