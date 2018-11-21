import { fireAjax } from 'src/services/index';
import { call, put } from 'redux-saga/effects';
import * as actions from 'src/redux/actions';
import {show_loading, hide_loading} from 'src/redux/generic/actions/frontend';


export function* getAttendanceUploadSettings(action) {
    yield put(show_loading());
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'get_attendance_keys'
        });
        if (response.error === 0) {
            yield put(actions.successGetAttendanceUploadSetting(response.data));
        } else if (response.error === 1) {
            yield put(actions.errorGetAttendanceUploadSetting('API response error.'));
        }
        yield put(hide_loading());
    } catch (e) {
        yield put(actions.errorGetAttendanceUploadSetting('Error Occurs !!'));
        yield put(hide_loading());
    }
}

export function* addAttendanceUploadSettings(action) {
    yield put(show_loading());
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'add_attendance_keys',
            ...action.payload
        });
        if (response.error === 0) {
            yield put(actions.successAddAttendanceUploadSetting(response.data));
            yield put(actions.requestGetAttendanceUploadSetting());
        } else if (response.error === 1) {
            yield put(actions.errorAddAttendanceUploadSetting(response.data.message));
        }
        yield put(hide_loading());
    } catch (e) {
        yield put(actions.errorAddAttendanceUploadSetting('Error Occurs !!'));
        yield put(hide_loading());
    }
}

export function* deleteAttendanceUploadSettings(action) {
    yield put(show_loading());
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'delete_attendance_keys',
            ...action.payload
        });
        if (response.error === 0) {
            yield put(actions.successDeleteAttendanceUploadSetting());
            yield put(actions.requestGetAttendanceUploadSetting());
        } else if (response.error === 1) {
            yield put(actions.errorDeleteAttendanceUploadSetting(response.data.message));
        }
        yield put(hide_loading());
    } catch (e) {
        yield put(actions.errorDeleteAttendanceUploadSetting('Error Occurs !!'));
        yield put(hide_loading());
    }
}
