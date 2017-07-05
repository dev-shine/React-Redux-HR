import * as _ from 'lodash';
import {createAction} from 'redux-actions';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';

export function success_team_list (data) {
  return createAction(constants.ACTION_SUCCESS_TEAM_LIST)(data);
}

export function empty_team_list (data) {
  return createAction(constants.ACTION_EMPTY_TEAM_LIST)(data);
}

export function error_team_list (data) {
  return createAction(constants.ACTION_ERROR_TEAM_LIST)(data);
}

// get all team name

function async_get_all_team () {
  return fireAjax('POST', '', {'action': 'get_team_list'});
}

export function get_all_team () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_all_team().then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(success_team_list(json.data));
          resolve(json.data);
        } else {
          dispatch(empty_team_list([]));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_team_list([]));
      });
    });
  };
}

// save team name//

export function success_add_team (data) {
  return createAction(constants.ACTION_SUCCESS_ADD_TEAM)(data);
}
export function error_add_team (data) {
  return createAction(constants.ACTION_ERROR_ADD_TEAM)(data);
}

function async_saveTeam (team) {
  return fireAjax('POST', '', {
    action: 'add_team_list',
    type:   'team_list',
    value:  team
  });
}

export function saveTeam (team) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_saveTeam(team).then(
        (json) => {
          dispatch(hide_loading()); // hide loading icon
          if (json.error == 0) {
            dispatch(success_add_team(json.data));
            dispatch(get_all_team());
            resolve(json.data);
          } else {
            dispatch(error_add_team(json.error[0]));
            reject(json.error[0]);
          }
        }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_add_team('error occurs'));
      }
        );
    });
  };
}

// Get team candidate//

export function success_get_team_candidate (data) {
  return createAction(constants.ACTION_SUCCESS_GET_TEAM_CANDIDATE)(data);
}
export function error_get_team_candidate (data) {
  return createAction(constants.ACTION_ERROR_GET_TEAM_CANDIDATE)(data);
}

function async_get_team_candidate (selectedTeam) {
  return fireAjax('POST', '', {
    action: 'get_team_users_detail',
    team:   selectedTeam
  });
}

export function get_team_candidate (selectedTeam) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_get_team_candidate(selectedTeam).then(
        (json) => {
          dispatch(hide_loading()); // hide loading icon
          if (json.error == 0) {
            dispatch(success_get_team_candidate(json.data));
            resolve(json.data);
          } else {
            dispatch(error_get_team_candidate(json.error[0]));
            reject(json.error[0]);
          }
        }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_get_team_candidate('error occurs'));
      }
      );
    });
  };
}
