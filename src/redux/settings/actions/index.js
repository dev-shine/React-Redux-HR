import { fireAjax } from 'src/services/index';
import { call, put } from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

export function* getAttendanceUploadSettings(action) {
    try {
        const response = yield call(fireAjax, 'POST', '', {
            'action': 'get_attendance_keys'
        });
        if (response.error === 0) {
            yield put(actions.successGetAttendanceUploadSetting(response.data));
        } else if (response.error === 1) {
            yield put(actions.errorGetAttendanceUploadSetting('API response error.'));
        }
    } catch (e) {
        yield put(actions.errorGetAttendanceUploadSetting('Error Occurs !!'));
    }
}

export function* addAttendanceUploadSettings(action) {
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
    } catch (e) {
        yield put(actions.errorAddAttendanceUploadSetting('Error Occurs !!'));
    }
}

export function* deleteAttendanceUploadSettings(action) {
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
    } catch (e) {
        yield put(actions.errorDeleteAttendanceUploadSetting('Error Occurs !!'));
    }
}
