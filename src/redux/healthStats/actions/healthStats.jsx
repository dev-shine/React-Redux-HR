import { fireAjax } from 'src/services/index';
import { call, put } from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

export function* healthStatsRequest(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'get_stats_attendance_summary'
        });
        if (response.error === 0) {
            yield put(actions.successHealthStats(response.data));
        } else if (response.error === 1) {
            yield put(actions.errorHealthStats('API response error.'));
        }
    } catch (e) {
        yield put(actions.errorHealthStats('Error Occurs !!'));
    }
}

export function* healthStatsSecretKeyListRequest(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'get_all_secret_keys'
        });
        if (response.error === 0) {
            yield put(actions.successHealthStatsSecretKeyList(response.data));
        } else if (response.error === 1) {
            yield put(actions.errorHealthStatsSecretKeyList('API response error.'));
        }
    } catch (e) {
        yield put(actions.errorHealthStatsSecretKeyList('Error Occurs !!'));
    }
}

export function* healthStatsAddSecretKeyRequest(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'generate_secret_key',
            'app_name': action.payload
        });
        if (response.error === 0) {
            yield put(actions.requestHealthStatsSecretKeyList());
            yield put(actions.successHealthStatsAddSecretKey(response.data));
        } else if (response.error === 1) {
            yield put(actions.errorHealthStatsAddSecretKey('API response error.'));
        }
    } catch (e) {
        yield put(actions.errorHealthStatsAddSecretKey('Error Occurs !!'));
    }
}

export function* healthStatsDeleteSecretKeyRequest(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'delete_secret_key',
            'app_id': action.payload
        });
        if (response.error === 0) {
            yield put(actions.requestHealthStatsSecretKeyList());
            yield put(actions.successHealthStatsDeleteSecretKey(response.data));
        } else if (response.error === 1) {
            yield put(actions.errorHealthStatsDeleteSecretKey('API response error.'));
        }
    } catch (e) {
        yield put(actions.errorHealthStatsDeleteSecretKey('Error Occurs !!'));
    }
}

export function* healthStatsRegenerateSecretKeyRequest(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'regenerate_secret_key',
            'app_id': action.payload
        });
        if (response.error === 0) {
            yield put(actions.requestHealthStatsSecretKeyList());
            yield put(actions.successHealthStatsRegenerateSecretKey(response.data));
        } else if (response.error === 1) {
            yield put(actions.errorHealthStatsRegenerateSecretKey('API response error.'));
        }
    } catch (e) {
        yield put(actions.errorHealthStatsRegenerateSecretKey('Error Occurs !!'));
    }
}

export function* deleteHealthStats(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'delete_attendance_stats_summary',
            'year' : action.payload
        });
        if (response.error === 0) {
            yield put(actions.requestHealthStats());
            yield put(actions.successDeleteHealthStats(response));
        } else if (response.error === 1) {
            yield put(actions.errorDeleteHealthStats('API response error.'));
        }
    } catch (e) {
        yield put(actions.errorDeleteHealthStats('Error Occurs !!'));
    }
}
