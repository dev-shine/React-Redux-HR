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
  healthStatsSecretKeyList: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  healthStatsAddSecretKey: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  healthStatsDeleteSecretKey: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  healthStatsRegenerateSecretKey: {
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

const requestHealthStatsSecretKeyList = (state, action) => update(state, {
  healthStatsSecretKeyList: {$setRequestLoading: null}
});
const successHealthStatsSecretKeyList = (state, action) => update(state, {
  healthStatsSecretKeyList: {$setRequestSuccess: action.payload}
});
const errorHealthStatsSecretKeyList = (state, action) => update(state, {
  healthStatsSecretKeyList: {$setRequestError: action.payload}
});

const requestHealthStatsAddSecretKey = (state, action) => update(state, {
  healthStatsSecretKeyList: {$setRequestLoading: null}
});
const successHealthStatsAddSecretKey = (state, action) => update(state, {
  healthStatsSecretKeyList: {$setRequestSuccess: action.payload}
});
const errorHealthStatsAddSecretKey = (state, action) => update(state, {
  healthStatsSecretKeyList: {$setRequestError: action.payload}
});

const requestHealthStatsDeleteSecretKey = (state, action) => update(state, {
  healthStatsSecretKeyList: {$setRequestLoading: null}
});
const successHealthStatsDeleteSecretKey = (state, action) => update(state, {
  healthStatsSecretKeyList: {$setRequestSuccess: action.payload}
});
const errorHealthStatsDeleteSecretKey = (state, action) => update(state, {
  healthStatsSecretKeyList: {$setRequestError: action.payload}
});

const requestHealthStatsRegenerateSecretKey = (state, action) => update(state, {
  healthStatsSecretKeyList: {$setRequestLoading: null}
});
const successHealthStatsRegenerateSecretKey = (state, action) => update(state, {
  healthStatsSecretKeyList: {$setRequestSuccess: action.payload}
});
const errorHealthStatsRegenerateSecretKey = (state, action) => update(state, {
  healthStatsSecretKeyList: {$setRequestError: action.payload}
});

export default handleActions({
  [constants.REQUEST_HEALTH_STATS]: requestHealthStats,
  [constants.SUCCESS_HEALTH_STATS]: successHealthStats,
  [constants.ERROR_HEALTH_STATS]:   errorHealthStats,
  [constants.REQUEST_HEALTH_STATS_SECRET_KEY_LIST]: requestHealthStatsSecretKeyList,
  [constants.SUCCESS_HEALTH_STATS_SECRET_KEY_LIST]: successHealthStatsSecretKeyList,
  [constants.ERROR_HEALTH_STATS_SECRET_KEY_LIST]: errorHealthStatsSecretKeyList,
  [constants.REQUEST_HEALTH_STATS_ADD_SECRET_KEY]: requestHealthStatsAddSecretKey,
  [constants.SUCCESS_HEALTH_STATS_ADD_SECRET_KEY]: successHealthStatsAddSecretKey,
  [constants.ERROR_HEALTH_STATS_ADD_SECRET_KEY]: errorHealthStatsAddSecretKey,
  [constants.REQUEST_HEALTH_STATS_DELETE_SECRET_KEY]: requestHealthStatsDeleteSecretKey,
  [constants.SUCCESS_HEALTH_STATS_DELETE_SECRET_KEY]: successHealthStatsDeleteSecretKey,
  [constants.ERROR_HEALTH_STATS_DELETE_SECRET_KEY]: errorHealthStatsDeleteSecretKey,
  [constants.REQUEST_HEALTH_STATS_REGENERATE_SECRET_KEY]: requestHealthStatsRegenerateSecretKey,
  [constants.SUCCESS_HEALTH_STATS_REGENERATE_SECRET_KEY]: successHealthStatsRegenerateSecretKey,
  [constants.ERROR_HEALTH_STATS_REGENERATE_SECRET_KEY]: errorHealthStatsRegenerateSecretKey,
}, initialState);
