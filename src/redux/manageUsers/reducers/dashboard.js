import {handleActions} from 'redux-actions';
import * as constants from 'appRedux/constants';
import update from 'immutability-helper';
import 'appRedux/update';

let initialState = {
  teamStats: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  empLifeCycle: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  empHours: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
};

const requestTeamStats = (state, action) => update(state, {
  teamStats: {$setRequestLoading: null}
});

const successTeamStats = (state, action) => {
  return update(state, {
    teamStats: {$setRequestSuccess: action.payload}
  });
};

const errorTeamStats = (state, action) => update(state, {
  teamStats: {$setRequestError: action.payload}
});

const requestEmployeLifeCycle = (state, action) => update(state, {
  empLifeCycle: {$setRequestLoading: null}
});

const successEmployeLifeCycle = (state, action) => update(state, {
  empLifeCycle: {$setRequestSuccess: action.payload}
});

const errorEmployeLifeCycle = (state, action) => update(state, {
  empLifeCycle: {$setRequestError: action.payload}
});

const requestEmployeeHours = (state, action) => update(state, {
  empHours: {$setRequestLoading: null}
});

const successEmployeeHours = (state, action) => {
  console.log(action);
  return update(state, {
    empHours: {$setRequestSuccess: action.payload}
  });
};

const errorEmployeeHours = (state, action) => update(state, {
  empHours: {$setRequestError: action.payload}
});

export default handleActions({
  [constants.REQUEST_TEAM_STATS]: requestTeamStats,
  [constants.SUCCESS_TEAM_STATS]: successTeamStats,
  [constants.ERROR_TEAM_STATS]:   errorTeamStats,

  [constants.REQUEST_EMP_LIFE_CYCLE]: requestEmployeLifeCycle,
  [constants.SUCCESS_EMP_LIFE_CYCLE]: successEmployeLifeCycle,
  [constants.ERROR_EMP_LIFE_CYCLE]:   errorEmployeLifeCycle,

  [constants.REQUEST_EMP_HOURS]: requestEmployeeHours,
  [constants.SUCCESS_EMP_HOURS]: successEmployeeHours,
  [constants.ERROR_EMP_HOURS]:   errorEmployeeHours
}, initialState);
