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
  }
};

const requestHealthStats = (state, action) => update(state, {
    healthStats: {$setRequestLoading: null}
});
const successHealthStats = (state, action) => update(state, {
    healthStats: {$setRequestSuccess: action.payload}
});
const errorHealthStats = (state, action) => update(state, {
    healthStats: {$setRequestError: action.payload}
});

export default handleActions({
  [constants.REQUEST_HEALTH_STATS]: requestHealthStats,
  [constants.SUCCESS_HEALTH_STATS]: successHealthStats,
  [constants.ERROR_HEALTH_STATS]:   errorHealthStats
}, initialState);
