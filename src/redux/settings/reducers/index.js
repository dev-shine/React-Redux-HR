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


export default handleActions({
  [constants.REQUEST_GET_ATTANDANCE_UPLOAD_SETTING]: requestGetAttendanceUploadSetting,
  [constants.SUCCESS_GET_ATTANDANCE_UPLOAD_SETTING]: successGetAttendanceUploadSetting,
  [constants.ERROR_GET_ATTANDANCE_UPLOAD_SETTING]:   errorGetAttendanceUploadSetting 
}, initialState);
