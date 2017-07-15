import {handleActions} from 'redux-actions';
// import Immutable from 'immutable';
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

const successTeamLists = (state, action) => update(state, {
  teamList: {$setRequestSuccess: action.payload}
});

const errorTeamLists = (state, action) => update(state, {
  teamList: {$setRequestError: action.payload}
});

const requestAddTeams = (state, action) => update(state, {
  addTeam: {$setRequestLoading: null}
});

const successAddTeams = (state, action) => update(state, {
  addTeam: {$setRequestSuccess: action.payload}
});

const errorAddTeams = (state, action) => update(state, {
  addTeam: {$setRequestError: action.payload}
});

const requestGetTeamCandidates = (state, action) => update(state, {
  candidateByTeam: {$setRequestLoading: null}
});

const successGetTeamCandidates = (state, action) => update(state, {
  candidateByTeam: {$setRequestSuccess: action.payload}
});

const errorGetTeamCandidates = (state, action) => update(state, {
  candidateByTeam: {$setRequestError: action.payload}
});

export default handleActions({
  [constants.REQUEST_TEAM_LIST]:          requestTeamLists,
  [constants.SUCCESS_TEAM_LIST]:          successTeamLists,
  [constants.ERROR_TEAM_LIST]:            errorTeamLists,
  [constants.REQUEST_ADD_TEAM]:           requestAddTeams,
  [constants.SUCCESS_ADD_TEAM]:           successAddTeams,
  [constants.ERROR_ADD_TEAM]:             errorAddTeams,
  [constants.REQUEST_GET_TEAM_CANDIDATE]: requestGetTeamCandidates,
  [constants.SUCCESS_GET_TEAM_CANDIDATE]: successGetTeamCandidates,
  [constants.ERROR_GET_TEAM_CANDIDATE]:   errorGetTeamCandidates
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
