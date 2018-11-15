import {handleActions} from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'appRedux/constants';
import 'appRedux/update';

let initialState = {
  attendanceUploadSetting: {
    data:      [],
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  addAttendanceUploadSetting: {
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  deleteAttendanceUploadSetting: {
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
};

const requestGetAttendanceUploadSetting = (state, action) => update(state, {
  attendanceUploadSetting: {
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});
const successGetAttendanceUploadSetting = (state, action) => update(state, {
  attendanceUploadSetting: {
    data:      {$set: action.payload},
    isLoading: {$set: false},
    isError:   {$set: false},
    isSuccess: {$set: true},
    message:   {$set: ''}
  }
});
const errorGetAttendanceUploadSetting = (state, action) => update(state, {
  attendanceUploadSetting: {
    isLoading: {$set: false},
    isError:   {$set: true},
    isSuccess: {$set: false},
    message:   {$set: 'Error !'}
  }
});

const requestAddAttendanceUploadSetting = (state, action) => update(state, {
  addAttendanceUploadSetting: {
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});
const successAddAttendanceUploadSetting = (state, action) => update(state, {
  addAttendanceUploadSetting: {
    isLoading: {$set: false},
    isError:   {$set: false},
    isSuccess: {$set: true},
    message:   {$set: ''}
  }
});
const errorAddAttendanceUploadSetting = (state, action) => update(state, {
  addAttendanceUploadSetting: {
    isLoading: {$set: false},
    isError:   {$set: true},
    isSuccess: {$set: false},
    message:   {$set: 'Error !'}
  }
});

const requestDeleteAttendanceUploadSetting = (state, action) => update(state, {
  deleteAttendanceUploadSetting: {
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});
const successDeleteAttendanceUploadSetting = (state, action) => update(state, {
  deleteAttendanceUploadSetting: {
    isLoading: {$set: false},
    isError:   {$set: false},
    isSuccess: {$set: true},
    message:   {$set: ''}
  }
});
const errorDeleteAttendanceUploadSetting = (state, action) => update(state, {
  deleteAttendanceUploadSetting: {
    isLoading: {$set: false},
    isError:   {$set: true},
    isSuccess: {$set: false},
    message:   {$set: 'Error !'}
  }
});

export default handleActions({
  [constants.REQUEST_GET_ATTANDANCE_UPLOAD_SETTING]: requestGetAttendanceUploadSetting,
  [constants.SUCCESS_GET_ATTANDANCE_UPLOAD_SETTING]: successGetAttendanceUploadSetting,
  [constants.ERROR_GET_ATTANDANCE_UPLOAD_SETTING]:   errorGetAttendanceUploadSetting, 

  [constants.REQUEST_ADD_ATTANDANCE_UPLOAD_SETTING]: requestAddAttendanceUploadSetting,
  [constants.SUCCESS_ADD_ATTANDANCE_UPLOAD_SETTING]: successAddAttendanceUploadSetting,
  [constants.ERROR_ADD_ATTANDANCE_UPLOAD_SETTING]:   errorAddAttendanceUploadSetting, 

  [constants.REQUEST_DELETE_ATTANDANCE_UPLOAD_SETTING]: requestDeleteAttendanceUploadSetting,
  [constants.SUCCESS_DELETE_ATTANDANCE_UPLOAD_SETTING]: successDeleteAttendanceUploadSetting,
  [constants.ERROR_DELETE_ATTANDANCE_UPLOAD_SETTING]:   errorDeleteAttendanceUploadSetting 
}, initialState);
