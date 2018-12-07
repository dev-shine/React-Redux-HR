import {createAction} from 'redux-actions';
import {fireAjax} from '../../../services/index';
import {notify} from '../../../services/notify'; 
import {show_loading, hide_loading} from '../../../redux/generic/actions/frontend';
import * as actionsMyProfile from "../../../redux/myProfile/actions/myProfile";
import * as constants from '../../../redux/constants';
import { createInflate } from 'zlib';

export function success_add_new_machine (data) {
  return createAction(constants.ACTION_SUCCESS_ADD_NEW_MACHINE)(data);
}

export function error_add_new_machine (data) {
  return createAction(constants.ACTION_ERROR_ADD_NEW_MACHINE)(data);
}

function async_addNewMachine (
  
  n_machine_type,
  n_machine_name,
  n_machine_price,
  n_serial_no,
  n_purchase_date,
  n_operating_system,
  n_status,
  n_comment,
  n_warranty, 
  n_warranty_comment,
  n_repair_comment,
  n_bill_no,
  n_user_Id,
  n_unassign_comment,
  n_option_warranty

) {
  return fireAjax('POST', '', {
    'action':           'add_office_machine',
    'machine_type':     n_machine_type,
    'machine_name':     n_machine_name,
    'machine_price':    n_machine_price,
    'serial_no':        n_serial_no,
    'purchase_date':    n_purchase_date,
    'operating_system': n_operating_system, 
    'status':           n_status,
    'comment':          n_comment,
    'warranty':         n_warranty,
    'warranty_comment': n_warranty_comment,
    'repair_comment':   n_repair_comment,
    'bill_no':          n_bill_no,
    'user_id':          n_user_Id,
    'unassign_comment': n_unassign_comment,
    'warranty_years':n_option_warranty
  });
}

export function addNewMachine (new_machine_details) {
  
  return function (dispatch, getState) {
    let n_machine_type = '';
    let n_machine_name = '';
    let n_machine_price = '';
    let n_serial_no = '';
    let n_purchase_date = '';
    let n_operating_system = '';
    let n_status = '';
    let n_comment = '';
    let n_warranty = '';
    let n_warranty_comment = '';
    let n_repair_comment = '';
    let n_bill_no='';
    let n_user_Id = '';
    let n_unassign_comment='';
    let n_option_warranty='';
    

    if (typeof new_machine_details.machine_type === 'undefined' || new_machine_details.machine_type === '') {
      return Promise.reject('Machine Type is empty');
    } else {
      n_machine_type = new_machine_details.machine_type;
    }

    if (typeof new_machine_details.machine_name === 'undefined' || new_machine_details.machine_name.trim() === '') {
      return Promise.reject('Machine Name is empty');
    } else {
      n_machine_name = new_machine_details.machine_name;
    }

    if (typeof new_machine_details.machine_price === 'undefined' || new_machine_details.machine_price.trim() === '') {
      return Promise.reject('Machine Price is empty');
    } else {
      n_machine_price = new_machine_details.machine_price;
    }

    if (typeof new_machine_details.serial_no === 'undefined' || new_machine_details.serial_no.trim() === '') {
      return Promise.reject('Serial Number is empty');
    } else {
      n_serial_no = new_machine_details.serial_no;
    }

    if (typeof new_machine_details.purchase_date === 'undefined' || new_machine_details.purchase_date === '') {
      return Promise.reject('Date of Purchase is empty');
    } else {
      n_purchase_date = new_machine_details.purchase_date;
    }
    if (typeof new_machine_details.operating_system === 'undefined') {
      return Promise.reject('Operating System is empty');
    } else {
      n_operating_system = new_machine_details.operating_system;
    }

    if (typeof new_machine_details.status === 'undefined' || new_machine_details.status === '') {
      return Promise.reject('Status is empty');
    } else {
      n_status = new_machine_details.status;
    }

    if (typeof new_machine_details.comment === 'undefined') {
      return Promise.reject('Comment is empty');
    } else {
      n_comment = new_machine_details.comment;
    }

    if (typeof new_machine_details.warranty === 'undefined' || new_machine_details.warranty === '') {
      return Promise.reject('Warranty Expire Date is empty');
    } else {
      n_warranty = new_machine_details.warranty;
    }

    if (typeof new_machine_details.warranty_comment === 'undefined') {
      return Promise.reject('Warranty Comment is empty');
    } else {
      n_warranty_comment = new_machine_details.warranty_comment;
    }
    if (typeof new_machine_details.warranty_years === 'undefined' || new_machine_details.warranty_years === '') {
      return Promise.reject('select warranty expiry option');
    } else {
      n_option_warranty = new_machine_details.warranty_years;
    }

    if (typeof new_machine_details.repair_comment === 'undefined') {
      return Promise.reject('Repair Comment is empty');
    } else {
      n_repair_comment = new_machine_details.repair_comment;
    }
      if (typeof new_machine_details.bill_no === 'undefined' || new_machine_details.bill_no.trim() === '') {
        return Promise.reject('Excellenece No is empty');
      } else {
        n_bill_no = new_machine_details.bill_no;
      }
    
    if (typeof new_machine_details.user_Id === 'undefined' || new_machine_details.user_Id === '') {
      return Promise.reject('User Not Assign');
    }else if(new_machine_details.user_Id=='unassign'){
      n_user_Id=null;
    }
     else {
      n_user_Id = new_machine_details.user_Id;
    }

    
    
    if(new_machine_details.user_Id=='unassign'){
       if (typeof new_machine_details.unassign_comment === 'undefined' || new_machine_details.unassign_comment.trim() === '') {
        return Promise.reject('unassign comment is empty');
       }
       else{
        n_unassign_comment=new_machine_details.unassign_comment;
      }
    }

    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_addNewMachine(n_machine_type,
        n_machine_name,
        n_machine_price,
        n_serial_no,
        n_purchase_date,
        n_operating_system,
        n_status,
        n_comment,
        n_warranty,
        n_warranty_comment,
        n_repair_comment,
        n_bill_no,
        n_user_Id,
      n_unassign_comment,
      n_option_warranty).then((json) => {
          dispatch(hide_loading());
          dispatch(deviceCount());
          if (json.error === 0) {
            dispatch(success_add_new_machine(json.message));
            dispatch(get_machines_detail());
            dispatch(unapprovedUser());
            dispatch(showTab())
            resolve(json.message);
          } else {
            dispatch(error_add_new_machine(json.message));
            reject(json.message);
          }
        }, (error) => {
          dispatch(hide_loading());
          dispatch(error_add_new_machine('error occurs!!!'));
          reject('error occurs!!!');
        });
    });
  };
}
export function showTab() {
  return { type: "ACTION_SHOW_TAB", payload: true };
}
export function noTab(){
  return {type:"ACTION_NO_TAB", payload:false}
}
// Get Devicelist

export function success_device_list (data) {
  return createAction(constants.ACTION_SUCCESS_DEVICE_LIST)(data);
}

export function empty_device_list (data) {
  return createAction(constants.ACTION_EMPTY_DEVICE_LIST)(data);
}

export function error_device_list (data) {
  return createAction(constants.ACTION_ERROR_DEVICE_LIST)(data);
}

function async_get_AllDevice () {
  return fireAjax('POST', '', {'action': 'get_machines_detail'});
}

export function get_machines_detail () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_AllDevice().then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(success_device_list(json.data));

          resolve(json.data);
        } else {
          dispatch(empty_device_list([]));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_device_list([]));
      });
    });
  };
}

export function success_getDevice (data) {
  return createAction(constants.ACTION_SUCCESS_GET_DEVICELIST)(data);
}

function getAsync_getDeviceById (n_inventory_id) {
  return fireAjax('POST', '', {
    'action': 'get_machine',
    'id':     n_inventory_id
  });
}

export function getDeviceById (device_id) {
  return (dispatch, getState) => {
    let n_inventory_id = '';
    
    if (typeof device_id !== "undefined") {
      n_inventory_id = device_id;
    }
    if (n_inventory_id.trim() === "") {
      // return Promise.reject("inventory id is empty");
    }
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      return getAsync_getDeviceById(n_inventory_id).then((json) => {
        dispatch(hide_loading());
        if (json.data) {
          dispatch(success_getDevice(json.data));
          dispatch(success_getDevice(json.data));
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  }}

export function success_updateDevice (data) {
  return createAction(constants.ACTION_SUCCESS_UPDATE_DEVICELIST)(data);
}

function getAsync_updateDeviceById (deviceId, data) {
  return fireAjax('POST', '', {
    'action':           'update_office_machine',
    'id':               deviceId,
    'machine_type':     data.machine_type,
    'machine_name':     data.machine_name,
    'machine_price':    data.machine_price,
    'serial_no':        data.serial_no,
    'purchase_date':    data.purchase_date,
    'mac_address':      data.mac_address,
    'operating_system': data.operating_system,
    'status':           data.status,
    'comment':          data.comment,
    'warranty':         data.warranty,
    'warranty_comment': data.warranty_comment,
    'repair_comment':   data.repair_comment,
    'bill_no':          data.bill_no,
    'user_id':          data.user_Id,
    'unassign_comment': data.unassign_comment,
    'warranty_years':data.warranty_years
  });
}

export function updateDevice (id, data) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_updateDeviceById(id, data).then((res) => {
        dispatch(hide_loading());
        if (res.error === 0) {
          dispatch(deviceCount());
          dispatch(get_machines_detail());
          dispatch(unapprovedUser());
          dispatch(success_updateDevice(res.message));
          resolve(res.message);
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}

export function success_deleteDevice (data) {
  return createAction(constants.ACTION_SUCCESS_DELETE_DEVICELIST)(data);
}

function getAsync_deleteDeviceById (deviceId,userId) {
  return fireAjax('POST', '', {
    'action': 'remove_machine_detail',
    'id':     deviceId,
    'userId':     userId
  });
}

export function deleteDevice (id,userId) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_deleteDeviceById(id,userId).then((res) => {
        dispatch(deviceCount());
        dispatch(get_machines_detail());
        dispatch(unapprovedUser());
        dispatch(hide_loading());
        if (res.error === 0) {
          dispatch(success_deleteDevice(res.message));
          resolve(res.message);
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}

export function success_assignDevice (data) {
  return createAction(constants.ACTION_SUCCESS_ASSIGN_DEVICE)(data);
}

export function error_assignDevice (data) {
  return createAction(constants.ACTION_ERROR_ASSIGN_DEVICE)(data);
}

function getAsync_assignDeviceToUser (n_inventory_id, n_user_id) {
  return fireAjax('POST', '', {
    'action':     'assign_user_machine',
    'machine_id': n_inventory_id,
    'user_id':    n_user_id
  });
}

export function assignDevice (assign_device) {
  return (dispatch, getState) => {
    let n_inventory_id = '';
    let n_user_id = '';
    
    if (typeof assign_device.user_id !== "undefined") {
      n_user_id = assign_device.user_id;
    }
    if (typeof assign_device.inventory_id !== "undefined") {
      n_inventory_id = assign_device.inventory_id;
    }
    // if (n_user_id.trim() === "") {
    //   return Promise.reject("User id is empty");
    // }
    if (n_inventory_id.trim() === "") {
      return Promise.reject("Inventory id is empty");
    }
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      dispatch(getDeviceById());
      return getAsync_assignDeviceToUser(n_inventory_id, n_user_id).then((res) => {
        dispatch(unapprovedUser());
        dispatch(get_machines_detail());
        dispatch(hide_loading());
        resolve(res.message);// }
      }, (error) => {
        dispatch(hide_loading());
        dispatch(error_assignDevice('error occurs!!!'));
        reject('error occurs!!!');
      });
    });
  };
}

export function success_deviceType (data) {
  return createAction(constants.ACTION_SUCCESS_DEVICE_TYPE)(data);
} 

export function error_deviceType (data) {
  return createAction(constants.ACTION_ERROR_DEVICE_TYPE)(data);
}

function getAsync_assignDeviceType (deviceList) {
  var newDevice = JSON.stringify(deviceList);

  return fireAjax('POST', '', {
    'action': 'add_machine_type',
    'type':   'machine_type',
    'value':  newDevice
  });
}

export function assignDeviceType (newDevice) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_assignDeviceType(newDevice).then((res) => {
        dispatch(getDeviceType());
        resolve(res);
        dispatch(hide_loading());
      }, (error) => {
        dispatch(hide_loading());
        dispatch(error_deviceType('error occurs!!!'));
        reject('error occurs!!!');
      });
    });
  };
}

// Device Type List
export function success_getDeviceType (data) {
  return createAction(constants.ACTION_SUCCESS_GET_DEVICE_TYPE_LIST)(data);
}

function getAsync_getDeviceType () {
  return fireAjax('POST', '', {
    'action': 'get_machine_type_list'
  });
}

export function getDeviceType () {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_getDeviceType().then((res) => {
        dispatch(hide_loading());
        if (res.data) {
          var list = JSON.parse(res.data.value);
          resolve(list);
          dispatch(success_getDeviceType(list));
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}
// Device Status---

export function success_deviceStatus (data) {
  return createAction(constants.ACTION_SUCCESS_DEVICE_STATUS)(data);
}

export function error_deviceStatus (data) {
  return createAction(constants.ACTION_ERROR_DEVICE_STATUS)(data);
}

function getAsync_assignDeviceStatus (statusValue, colorValue) {
  // var statusNew = JSON.stringify(statusType)
  // var colors = JSON.stringify(background)
  return fireAjax('POST', '', {
    'action': 'add_machine_status',
    'type':   'machine_status',
    'status': statusValue,
    'color':  colorValue

  });
}

export function assignDeviceStatus (statusValue, colorValue) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_assignDeviceStatus(statusValue, colorValue).then((res) => {
        // dispatch(getDeviceStatus())
        resolve(res.data.message);
        dispatch(hide_loading());
      }, (error) => {
        dispatch(hide_loading());
        dispatch(error_deviceType('error occurs!!!'));
        reject('error occurs!!!');
      });
    });
  };
}

export function success_getDeviceStatus (data) {
  return createAction(constants.ACTION_SUCCESS_GET_DEVICE_STATUS_LIST)(data);
}

function getAsync_getDeviceStatus () {
  return fireAjax('POST', '', {
    'action': 'get_machine_status_list'
  });
}

export function getDeviceStatus () {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_getDeviceStatus().then((res) => {
        dispatch(hide_loading());
        resolve(res.data);
        dispatch(success_getDeviceStatus(res.data));
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}

export function success_deleteDeviceStatus (data) {
  return createAction(constants.ACTION_SUCCESS_DELETE_DEVICE_STATUS_LIST)(data);
}

function getAsync_deleteDeviceStatus (checkValue) {
  return fireAjax('POST', '', {
    'action': 'delete_machine_status',
    'status': checkValue
  });
}

export function deleteDeviceStatus (checkValue) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_deleteDeviceStatus(checkValue).then((res) => {
        dispatch(hide_loading());
        resolve(res);
        dispatch(success_deleteDeviceStatus(res));
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}
export function successDeviceCount (data) {
  return createAction(constants.ACTION_SUCCESS_DEVICE_COUNT)(data);
}

function getAsyncDeviceCount () {
  return fireAjax('POST', '', {
    'action': 'get_machine_count'
  });
}

export function deviceCount () {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsyncDeviceCount().then((res) => {
        dispatch(hide_loading());
        resolve(res.data);
        dispatch(successDeviceCount(res.data));
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}

export function successAddInventoryComment (data) {
  return createAction(constants.ACTION_SUCCESS_ADD_INVENTORY_COMMENT)(data);
}

export function errorAddInventoryComment (data) {
  return createAction(constants.ACTION_ERROR_ADD_INVENTORY_COMMENT)(data);
}

function async_addInventoryComment ( n_comment, n_inventory_id) {
  return fireAjax('POST', '', {
    'action':         'add_inventory_comment',
    'comment':        n_comment,
    'inventory_id':   n_inventory_id
  });
}

export function addInventoryComment (add_inventory_comment) {
  return function (dispatch, getState) {
    let n_comment = '';
    let n_inventory_id = '';
    
    if (typeof add_inventory_comment.comment !== "undefined") {
      n_comment = add_inventory_comment.comment;
    }
    if (typeof add_inventory_comment.inventory_id !== "undefined") {
      n_inventory_id = add_inventory_comment.inventory_id;
    }
    if (n_comment.trim() === "") {
      return Promise.reject("Comment is empty");
    }
    if (n_inventory_id.trim() === "") {
      return Promise.reject("inventory id is empty");
    }
    return new Promise((resolve, reject) => {
      async_addInventoryComment(n_comment,n_inventory_id).then((res) => {
          if (res.error === 0) {
            dispatch(successAddInventoryComment(res.message));
            resolve(res.message);
          } else {
            dispatch(errorAddInventoryComment(res.message));
          }
        }, (error) => {
          dispatch(errorAddInventoryComment('error occurs!!!'));
        });
    });
  };
}

export function successUnapprovedList (data) {
  return createAction(constants.ACTION_SUCCESS_UPDATE_UNAPPROVED_USER)(data);
}

function getAsyncUnapprovedData(dataLogin){
  return fireAjax('POST','',{
    'action':'get_unapproved_inventories'
  });
}

export function unapprovedUser () {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsyncUnapprovedData().then((res) => {
        dispatch(hide_loading());
        resolve(res);
        dispatch(successUnapprovedList(res));
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
    })
    })
  }
}

export function errorAddUserComment (data) {
  return createAction(constants.ACTION_ERROR_ADD_USER_COMMENT)(data);
}

export function successAddUserComment (data) {
  return createAction(constants.ACTION_SUCCESS_ADD_USER_COMMENT)(data);
}

function asyncAddUserComment (n_comment, n_inventory_id){
  return fireAjax('POST', '', {
    'action':       'unassigned_my_inventory',
    'comment':      n_comment,
    'inventory_id':      n_inventory_id,
  });
}

export function addUserComment (addUserCommentDetails) {
  return (dispatch, getState) => {

    let n_comment = '';
    let n_inventory_id = '';
    if (typeof addUserCommentDetails.comment !== "undefined") {
      n_comment = addUserCommentDetails.comment;
    }
    if (typeof addUserCommentDetails.inventory_id !== "undefined") {
      n_inventory_id = addUserCommentDetails.inventory_id;
    }
    if (n_comment.trim() === "") {
      notify('Warning!','Comment is empty','warning');
      return Promise.reject("Comment is empty");
    }
    if (n_inventory_id.trim() === "") {
      notify('Warning!','Inventory id is empty','warning');
      return Promise.reject("inventory id is empty");
    }

    return new Promise(function (resolve, reject){
      dispatch(show_loading());
      return asyncAddUserComment(n_comment, n_inventory_id).then((json) => {
        dispatch(hide_loading());
        if(json.error==0){
          dispatch(successAddUserComment(json.message));
          notify('Success !','Comment added to unassign device','success');
          dispatch(actionsMyProfile.getMyInventory());
        }else{
          dispatch(errorAddUserComment(json.message))
          notify('Error !',json.message,'error');
        }
      }, (error) => {
        dispatch(hide_loading());
        dispatch(errorAddUserComment('error occurs!!!'));
        notify('Error !',error,'error');
      });
    });
  };
}

export function errorApprovedList(data){
  return createAction(constants.ACTION_ERROR_UPDATE_APPROVED_USER)
}
export function successApprovedList (data) {
  return createAction(constants.ACTION_SUCCESS_UPDATE_APPROVED_USER)(data);
}

function getAsyncApprovedData(id){
  return fireAjax('POST','',{
    'action':'approve_machine',
    id
  });
}

export function approvedUser (id) {
  return (dispatch, getState) => {
    
    if(typeof id==='undefined'|| id==''){
      return Promise.reject('id is empty') 
    }
    else{
      id=id;
    }
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsyncApprovedData(id).then((json) => {
        dispatch(hide_loading());
        if(json.error==0){
          dispatch(successApprovedList(json.message));
          dispatch(unapprovedUser());
          dispatch(get_machines_detail());
        }else{
          dispatch(errorApprovedList(json.message));
        }
    },(error) => {
      // dispatch(errorAddusercomment('error occur'));
      reject('error occur');
    })
  })
}
}

export function successUnassignedDeviceList (data) {
  return createAction(constants.ACTION_SUCCESS_UNASSIGNED_DEVICE_LIST)(data);
}

function getAsyncUnassignDeviceList () {
  return fireAjax('POST','',{
    'action': 'get_unassigned_inventories'
  });
}

export function unassignDeviceList () {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsyncUnassignDeviceList().then((res) => {
        dispatch(hide_loading());
        dispatch(successUnassignedDeviceList(res.data));
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}

export function successEditDeviceData (device,edit,open) {
  return createAction(constants.ACTION_SUCCESS_EDIT_WITHOUT_API)({device,edit,open});
}

export function editDeviceData (device,edit,open) {
  return (dispatch, getState) => {
    dispatch(successEditDeviceData(device,edit,open));
  };
}

export function successAuditList (data) {
  return createAction(constants.ACTION_SUCCESS_AUDIT_LIST)(data);
}
export function errorAuditList (data) {
  return createAction(constants.ACTION_ERROR_AUDIT_LIST)(data);
}

function getAsyncAuditList (token, month, year) {
  return fireAjax('POST','',{
    'token': token,
    'request': 'POST', 
    'action': 'get_inventory_audit_status_month_wise',
    'month': month,
    'year': year
  });
}

export function getAuditList(token, month, year){
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsyncAuditList(token, month, year).then((res) => {
        dispatch(hide_loading());
        dispatch(successAuditList(res.data));
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}


