import { fireAjax } from '../../../services/index';
import { call, put } from 'redux-saga/effects';
import * as actions from '../../../redux/actions';
import {show_loading, hide_loading} from '../../../redux/generic/actions/frontend';


export function* getAttendanceUploadSettings(action) {
  yield put(show_loading());
  try {
    const response = yield call(fireAjax, "POST", "", {
      action: "get_attendance_keys"
    });
    if (response.error === 0) {
      yield put(actions.successGetAttendanceUploadSetting(response.data));
    } else if (response.error === 1) {
      yield put(actions.errorGetAttendanceUploadSetting("API response error."));
    }
    yield put(hide_loading());
  } catch (e) {
    yield put(actions.errorGetAttendanceUploadSetting("Error Occurs !!"));
    yield put(hide_loading());
  }
}

export function* addAttendanceUploadSettings(action) {
  yield put(show_loading());
  try {
    const response = yield call(fireAjax, "POST", "", {
      action: "add_attendance_keys",
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
    yield put(actions.errorAddAttendanceUploadSetting("Error Occurs !!"));
    yield put(hide_loading());
  }
}

export function* deleteAttendanceUploadSettings(action) {
  yield put(show_loading());
  try {
    const response = yield call(fireAjax, "POST", "", {
      action: "delete_attendance_keys",
      ...action.payload
    });
    if (response.error === 0) {
      yield put(actions.successDeleteAttendanceUploadSetting());
      yield put(actions.requestGetAttendanceUploadSetting());
    } else if (response.error === 1) {
      yield put(
        actions.errorDeleteAttendanceUploadSetting(response.data.message)
      );
    }
    yield put(hide_loading());
  } catch (e) {
    yield put(actions.errorDeleteAttendanceUploadSetting("Error Occurs !!"));
    yield put(hide_loading());
  }
}

export function* requestResetPasswordSetting(params) {
  yield put(show_loading());
  const response = yield call(fireAjax, "POST", "", {
    action: "add_reset_password_config",
    pwd_reset_interval: params.payload.selectedOption.value,
    pwd_reset_status: params.payload.toggleActive
  });
  yield put(hide_loading());
}

export function* requestResetPasswordStatus() {
  const response = yield call(fireAjax, "POST", "", {
    action: "get_reset_password_config"
  });
  if (response.error === 0) {
    yield put(actions.successResetPasswordStatus(response));
  }
}

export function* requestClearResetPasswordData() {
    yield put(actions.successClearResetPasswordData());
}