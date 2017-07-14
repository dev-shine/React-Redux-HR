import {handleActions} from 'redux-actions';
import Immutable from 'immutable';
import * as constants from 'appRedux/constants';
import update from 'immutability-helper';
import 'appRedux/update';

let initialState = {
  teamList: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  addTeam: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  candidateByTeam: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
};

const requestTeamLists = (state, action) => update(state, {
  teamList: {$setRequestLoading: null}
});

const successTeamList = (state, action) => update(state, {
  teamList: {$setRequestSuccess: action.payload}
});

const errorTeamList = (state, action) => update(state, {
  teamList: {$setRequestError: action.payload}
});

const requestAddTeam = (state, action) => update(state, {
  addTeam: {$setRequestLoading: null}
});

const successAddTeam = (state, action) => update(state, {
  addTeam: {$setRequestSuccess: action.payload}
});

const errorAddTeam = (state, action) => update(state, {
  addTeam: {$setRequestError: action.payload}
});

const requestGetTeamCandidate = (state, action) => update(state, {
  candidateByTeam: {$setRequestLoading: null}
});

const successGetTeamCandidate = (state, action) => update(state, {
  candidateByTeam: {$setRequestSuccess: action.payload}
});

const errorGetTeamCandidate = (state, action) => update(state, {
  candidateByTeam: {$setRequestError: action.payload}
});

export default handleActions({
  [constants.REQUEST_TEAM_LIST]:          requestTeamLists,
  [constants.SUCCESS_TEAM_LIST]:          successTeamList,
  [constants.ERROR_TEAM_LIST]:            errorTeamList,
  [constants.REQUEST_ADD_TEAM]:           requestAddTeam,
  [constants.SUCCESS_ADD_TEAM]:           successAddTeam,
  [constants.ERROR_ADD_TEAM]:             errorAddTeam,
  [constants.REQUEST_GET_TEAM_CANDIDATE]: requestGetTeamCandidate,
  [constants.SUCCESS_GET_TEAM_CANDIDATE]: successGetTeamCandidate,
  [constants.ERROR_GET_TEAM_CANDIDATE]:   errorGetTeamCandidate
}, initialState);

// export function teamList (state = Immutable.fromJS(initialState), action) {
//   if (action.type === 'ACTION_SUCCESS_TEAM_LIST') {
//     return state.set('teams', action.payload);
//   } else if (action.type === 'ACTION_ERROR_TEAM_LIST') {
//     return state.set('teams', action.payload);
//   } else if (action.type === 'ACTION_SUCCESS_ADD_TEAM') {
//     return state.set('status_message', action.payload);
//   } else if (action.type === 'ACTION_ERROR_ADD_TEAM') {
//     return state.set('status_message', action.payload);
//   } else if (action.type === 'ACTION_SUCCESS_GET_TEAM_CANDIDATE') {
//     return state.set('candidateByTeam', action.payload).set('isSuccess', true);
//   } else if (action.type === 'ACTION_ERROR_GET_TEAM_CANDIDATE') {
//     return state.set('status_message', action.payload).set('candidateByTeam', []);
//   } else {
//     return state;
//   }
// }
