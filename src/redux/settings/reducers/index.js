import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "appRedux/constants";
import "appRedux/update";

let initialState = {
  attendanceUploadSetting: {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
  },
  addAttendanceUploadSetting: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
  },
  deleteAttendanceUploadSetting: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
  },
  resetPasswordStatus: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    data:{}
  }
};

const requestAttendanceUploadSetting = (state, action) =>
  update(state, {
    attendanceUploadSetting: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message: { $set: "" }
    }
  });
const successGetAttendanceUploadSetting = (state, action) =>
  update(state, {
    attendanceUploadSetting: {
      data: { $set: action.payload },
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" }
    }
  });
const errorAttendanceUploadSetting = (state, action) =>
  update(state, {
    attendanceUploadSetting: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message: { $set: action.payload }
    }
  });

// const requestAddAttendanceUploadSetting = (state, action) => update(state, {
//   addAttendanceUploadSetting: {
//     isLoading: {$set: true},
//     isError:   {$set: false},
//     isSuccess: {$set: false},
//     message:   {$set: ''}
//   }
// });
const successAttendanceUploadSettingActions = (state, action) =>
  update(state, {
    addAttendanceUploadSetting: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" }
    }
  });
// const errorAddAttendanceUploadSetting = (state, action) => update(state, {
//   addAttendanceUploadSetting: {
//     isLoading: {$set: false},
//     isError:   {$set: true},
//     isSuccess: {$set: false},
//     message:   {$set: 'Error !'}
//   }
// });

// const requestDeleteAttendanceUploadSetting = (state, action) => update(state, {
//   deleteAttendanceUploadSetting: {
//     isLoading: {$set: true},
//     isError:   {$set: false},
//     isSuccess: {$set: false},
//     message:   {$set: ''}
//   }
// });
// const successDeleteAttendanceUploadSetting = (state, action) => update(state, {
//   deleteAttendanceUploadSetting: {
//     isLoading: {$set: false},
//     isError:   {$set: false},
//     isSuccess: {$set: true},
//     message:   {$set: ''}
//   }
// });
// const errorDeleteAttendanceUploadSetting = (state, action) => update(state, {
//   deleteAttendanceUploadSetting: {
//     isLoading: {$set: false},
//     isError:   {$set: true},
//     isSuccess: {$set: false},
//     message:   {$set: 'Error !'}
//   }
// });

const successResetPasswordStatus = (state, action) =>update(state, {
    resetPasswordStatus: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "Error !" },
      data: {$set:action.payload.data}
    }
  });

export default handleActions(
  {
    [constants.REQUEST_GET_ATTANDANCE_UPLOAD_SETTING]: requestAttendanceUploadSetting,
    [constants.SUCCESS_GET_ATTANDANCE_UPLOAD_SETTING]: successGetAttendanceUploadSetting,
    [constants.ERROR_GET_ATTANDANCE_UPLOAD_SETTING]: errorAttendanceUploadSetting,

    [constants.REQUEST_ADD_ATTANDANCE_UPLOAD_SETTING]: requestAttendanceUploadSetting,
    [constants.SUCCESS_ADD_ATTANDANCE_UPLOAD_SETTING]: successAttendanceUploadSettingActions,
    [constants.ERROR_ADD_ATTANDANCE_UPLOAD_SETTING]: errorAttendanceUploadSetting,

    [constants.REQUEST_DELETE_ATTANDANCE_UPLOAD_SETTING]: requestAttendanceUploadSetting,
    [constants.SUCCESS_DELETE_ATTANDANCE_UPLOAD_SETTING]: successAttendanceUploadSettingActions,
    [constants.ERROR_DELETE_ATTANDANCE_UPLOAD_SETTING]: errorAttendanceUploadSetting,
    [constants.SUCCESS_RESET_PASSWORD_STATUS]: successResetPasswordStatus
  },
  initialState
);
