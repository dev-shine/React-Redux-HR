import {createAction} from 'redux-actions'
import {CONFIG} from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'
import {show_loading, hide_loading} from '../generic/frontend'
var moment = require('moment')

// -------add New machine
export const ACTION_SUCCESS_ADD_NEW_MACHINE = 'ACTION_SUCCESS_ADD_NEW_MACHINE'
export const ACTION_ERROR_ADD_NEW_MACHINE = 'ACTION_ERROR_ADD_NEW_MACHINE'

export function success_add_new_machine (data) {
  return createAction(ACTION_SUCCESS_ADD_NEW_MACHINE)(data)
}

export function error_add_new_machine (data) {
  return createAction(ACTION_ERROR_ADD_NEW_MACHINE)(data)
}

function async_addNewMachine (n_machine_type, n_machine_name, n_machine_price, n_serial_no, n_purchase_date, n_mac_address, n_operating_system, n_status, n_comment) {
  return fireAjax('POST', '', {
    'action': 'add_office_machine',
    'machine_type': n_machine_type,
    'machine_name': n_machine_name,
    'machine_price': n_machine_price,
    'serial_no': n_serial_no,
    'purchase_date': n_purchase_date,
    'mac_address': n_mac_address,
    'operating_system': n_operating_system,
    'status': n_status,
    'comment': n_comment
  })
}

export function addNewMachine (new_machine_details) {
  return function (dispatch, getState) {
    let n_machine_type = ''
    let n_machine_name = ''
    let n_machine_price = ''
    let n_serial_no = ''
    let n_purchase_date = ''
    let n_mac_address = ''
    let n_operating_system = ''
    let n_status = ''
    let n_comment = ''

    if (typeof new_machine_details.machine_type === 'undefined' || new_machine_details.machine_type == '') {
      return Promise.reject('Machine Type is empty')
    } else {
      n_machine_type = new_machine_details.machine_type
    }

    if (typeof new_machine_details.machine_name === 'undefined' || new_machine_details.machine_name == '') {
      return Promise.reject('Machine Name is empty')
    } else {
      n_machine_name = new_machine_details.machine_name
    }

    if (typeof new_machine_details.machine_price === 'undefined' || new_machine_details.machine_price == '') {
      return Promise.reject('Machine Price is empty')
    } else {
      n_machine_price = new_machine_details.machine_price
    }

    if (typeof new_machine_details.serial_no === 'undefined' || new_machine_details.serial_no == '') {
      return Promise.reject('Serial Number is empty')
    } else {
      n_serial_no = new_machine_details.serial_no
    }

    if (typeof new_machine_details.purchase_date === 'undefined' || new_machine_details.purchase_date == '') {
      return Promise.reject('Date of Purchase is empty')
    } else {
      n_purchase_date = new_machine_details.purchase_date
    }

    if (typeof new_machine_details.mac_address === 'undefined' || new_machine_details.mac_address == '') {
      return Promise.reject('Mac Address is empty')
    } else {
      n_mac_address = new_machine_details.mac_address
    }

    if (typeof new_machine_details.operating_system === 'undefined' || new_machine_details.operating_system == '') {
      return Promise.reject('Operating System is empty')
    } else {
      n_operating_system = new_machine_details.operating_system
    }

    if (typeof new_machine_details.status === 'undefined' || new_machine_details.status == '') {
      return Promise.reject('Status is empty')
    } else {
      n_status = new_machine_details.status
    }

    if (typeof new_machine_details.comment === 'undefined' || new_machine_details.comment == '') {
      return Promise.reject('comment is empty')
    } else {
      n_comment = new_machine_details.comment
    }

    return new Promise((reslove, reject) => {
      dispatch(show_loading())
      async_addNewMachine(n_machine_type, n_machine_name, n_machine_price, n_serial_no, n_purchase_date, n_mac_address, n_operating_system, n_status, n_comment).then((json) => {
        dispatch(hide_loading())
        if (json.error == 0) {
          // console.log(json, '----action wala-----')
          dispatch(success_add_new_machine(json.message))
          reslove(json.message)
        } else {
          dispatch(error_add_new_machine(json.message))
          reject(json.message)
        }
      }, (error) => {
        dispatch(hide_loading())
        dispatch(error_add_new_machine('error occurs!!!'))
        reject('error occurs!!!')
      })
    })
  }
}

// Get Devicelist

export const ACTION_SUCCESS_DEVICE_LIST = 'ACTION_SUCCESS_DEVICE_LIST'
export const ACTION_EMPTY_DEVICE_LIST = 'ACTION_EMPTY_DEVICE_LIST'
export const ACTION_ERROR_DEVICE_LIST = 'ACTION_ERROR_DEVICE_LIST'

export function success_device_list (data) {
  return createAction(ACTION_SUCCESS_DEVICE_LIST)(data)
}

export function empty_device_list (data) {
  return createAction(ACTION_EMPTY_DEVICE_LIST)(data)
}

export function error_device_list (data) {
  return createAction(ACTION_ERROR_DEVICE_LIST)(data)
}

function async_get_AllDevice () {
  return fireAjax('POST', '', {'action': 'get_machines_detail'})
}

export function get_machines_detail () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()) // show loading icon
      async_get_AllDevice().then((json) => {
        dispatch(hide_loading()) // hide loading icon
        if (json.error == 0) {
          dispatch(success_device_list(json.data))
          resolve(json.data)
        } else {
          dispatch(empty_device_list([]))
        }
      }, (error) => {
        dispatch(hide_loading()) // hide loading icon
        dispatch(error_device_list([]))
      })
    })
  }
}
