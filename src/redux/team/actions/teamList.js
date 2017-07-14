import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

export function* getAllTeam (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action': 'get_team_list'
    });
    if (response.error === 0) {
      yield put(actions.successTeamList(response.data));
    } else {
      yield put(actions.errorTeamList(response.message));
    }
  } catch (e) {
    yield put(actions.errorTeamList('Error Occurs !!'));
    console.warn('Some error found in Get Team List Request action\n', e);
  }
}

export function* saveTeam (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      action: 'add_team_list',
      type:   'team_list',
      value:  action.payload.teams
    });
    if (response.error === 0) {
      yield put(actions.successAddTeam(response.data));
      yield put(actions.requestTeamList());
    } else {
      yield put(actions.errorAddTeam(response.message));
    }
  } catch (e) {
    yield put(actions.errorAddTeam('Error Occurs !!'));
    console.warn('Some error found in getTeamUsersDetail action\n', e);
  }
}

export function* getTeamCandidate (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      action: 'get_team_users_detail',
      team:   action.payload.selectedTeam
    });
    if (response.error === 0) {
      yield put(actions.successGetTeamCandidate(response.data));
    } else {
      yield put(actions.errorGetTeamCandidate(response.message));
    }
  } catch (e) {
    yield put(actions.errorGetTeamCandidate('Error Occurs !!'));
    console.warn('Some error found in getTeamUsersDetail action\n', e);
  }
}
