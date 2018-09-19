import { fireAjax } from 'src/services/index';
import { call, put } from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

export default function* healthStatsRequest(action) {
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
