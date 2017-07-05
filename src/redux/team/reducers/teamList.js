import Immutable from 'immutable';

let initialState = {
  'teams':           [],
  'status_message':  '',
  'candidateByTeam': []
};

export function teamList (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_TEAM_LIST') {
    return state.set('teams', action.payload);
  } else if (action.type === 'ACTION_EMPTY_TEAM_LIST') {
    return state.set('teams', action.payload);
  } else if (action.type === 'ACTION_ERROR_TEAM_LIST') {
    return state.set('teams', action.payload);
  } else if (action.type === 'ACTION_SUCCESS_ADD_TEAM') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_ERROR_ADD_TEAM') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_SUCCESS_GET_TEAM_CANDIDATE') {
    return state.set('candidateByTeam', action.payload)
                    .set('status_message', '');
  } else if (action.type === 'ACTION_ERROR_GET_TEAM_CANDIDATE') {
    return state.set('status_message', action.payload)
                    .set('candidateByTeam', []);
  } else {
    return state;
  }
}
