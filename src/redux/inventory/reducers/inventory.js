import Immutable from "immutable";

let initialState = {
  unapprovedList: [],
  approvedList: [],
  deviceHistory: {},
  device: [],
  status_message: "",
  deviceList: [],
  statusList: [],
  deviceCountList: {},
  comment: [],
  unassignedDeviceList: [],
  editData: [],
  showTab: false,
};

export function manageDevice(state = Immutable.fromJS(initialState), action) {
  if (action.type === "ACTION_SUCCESS_DEVICE_LIST") {
    return state.set("device", action.payload);
  } else if (action.type === "ACTION_EMPTY_DEVICE_LIST") {
    return state.set("device", action.payload);
  } else if (action.type === "ACTION_SUCCESS_ADD_NEW_MACHINE") {
    return state.set("status_message", action.payload);
  } else if (action.type === "ACTION_SHOW_TAB") {
    return state.set("showTab", action.payload);
  } else if (action.type === "ACTION_NO_TAB") {
    return state.set("showTab", action.payload);
  } else if (action.type === "ACTION_ERROR_ADD_NEW_MACHINE") {
    return state.set("status_message", action.payload);
  } else if (action.type === "ACTION_SUCCESS_UPDATE_DEVICELIST") {
    return state.set("status_message", action.payload);
  } else if (action.type === "ACTION_SUCCESS_DEVICE_TYPE") {
    return state.set("status_message", action.payload);
  } else if (action.type === "ACTION_SUCCESS_ASSIGN_DEVICE") {
    return state.set("status_message", action.payload);
  } else if (action.type === "ACTION_ERRORR_ASSIGN_DEVICE") {
    return state.set("status_message", action.payload);
  } else if (action.type === "ACTION_SUCCESS_DELETE_DEVICELIST") {
    return state.set("status_message", action.payload);
  } else if (action.type === "ACTION_SUCCESS_GET_DEVICE_TYPE_LIST") {
    return state.set("deviceList", action.payload);
  } else if (action.type === "ACTION_SUCCESS_DEVICE_COUNT") {
    return state.set("deviceCountList", action.payload);
  } else if (action.type === "ACTION_SUCCESS_GET_DEVICE_STATUS_LIST") {
    return state.set("statusList", action.payload);
  } else if (action.type === "ACTION_SUCCESS_ADD_INVENTORY_COMMENT") {
    return state.set("status_message", action.payload);
  } else if (action.type === "ACTION_ERROR_ADD_INVENTORY_COMMENT") {
    return state.set("status_message", action.payload);
  } else if (action.type === "ACTION_SUCCESS_GET_DEVICELIST") {
    return state.set("deviceHistory", action.payload);
  } else if (action.type === "ACTION_SUCCESS_UPDATE_UNAPPROVED_USER") {
    return state.set("unapprovedList", action.payload);
  } else if (action.type === "ACTION_SUCCESS_UPDATE_APPROVED_USER") {
    return state.set("approvedList", action.payload);
  } else if (action.type === "ACTION_SUCCESS_ADD_USER_COMMENT") {
    return state.set("comment", action.payload);
  } else if (action.type === "ACTION_ERROR_ADD_USER_COMMENT") {
    return state.set("comment", action.payload);
  } else if (action.type === "ACTION_SUCCESS_UNASSIGNED_DEVICE_LIST") {
    return state.set("unassignedDeviceList", action.payload);
  } else if (action.type === "ACTION_SUCCESS_EDIT_WITHOUT_API") {
    return state.set("editData", action.payload);
  }
   else {
    return state;
  }
}
