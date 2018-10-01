import {handleActions} from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'appRedux/constants';
import 'appRedux/update';

let initialState = {
  healthStats: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  deleteHealthStats: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  statsHistory:{
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
};

const requestHealthStats = (state, action) => update(state, {
    healthStats: {$setRequestLoading: null},
    deleteHealthStats: {isError:{$set: false},isSuccess:{$set: false}}
});
const successHealthStats = (state, action) => update(state, {
    healthStats: {$setRequestSuccess: action.payload}
});
const errorHealthStats = (state, action) => update(state, {
    healthStats: {$setRequestError: action.payload}
});

const deleteHealthStats = (state, action) => update(state, {
  deleteHealthStats: {$setRequestLoading: null}
});
const successDeleteHealthStats = (state, action) => update(state, {
  deleteHealthStats: {$setRequestSuccess: action.payload}
});
const errorDeleteHealthStats = (state, action) => update(state, {
  deleteHealthStats: {$setRequestError: action.payload}
});

const requestStatsHistory = (state, action) => update(state, {
  statsHistory: {$setRequestLoading: null}
});
const successStatsHistory = (state, action) => update(state, {
  statsHistory: {$setRequestSuccess: action.payload}
});
const errorStatsHistory = (state, action) => update(state, {
  statsHistory: {$setRequestError: action.payload}
});

export default handleActions({
  [constants.REQUEST_HEALTH_STATS]: requestHealthStats,
  [constants.SUCCESS_HEALTH_STATS]: successHealthStats,
  [constants.ERROR_HEALTH_STATS]:   errorHealthStats,
  [constants.DELETE_HEALTH_STATS]: deleteHealthStats,
  [constants.SUCCESS_DELETE_HEALTH_STATS]: successDeleteHealthStats,
  [constants.ERROR_DELETE_HEALTH_STATS]:   errorDeleteHealthStats,
  [constants.REQUEST_STATS_HISTORY]: requestStatsHistory,
  [constants.SUCCESS_STATS_HISTORY]: successStatsHistory,
  [constants.ERROR_STATS_HISTORY]: errorStatsHistory
  
}, initialState);
