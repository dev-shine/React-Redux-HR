import {CONFIG} from '../config/index';
import * as _ from 'lodash';
import 'whatwg-fetch';
export function notify (text) {
  alert(text);
}

export function fireAjax (method, url, data) {
  let URL = CONFIG.api_url + url;
  let headers = {};
  let action = data.action;
  if (method == 'GET') {
    headers = {
      method: 'GET',
      mode:   'cors',
      cache:  'no-cache'
    };
  } else if (method == 'POST') {
    let token = localStorage.getItem('hr_logged_user');
    data.token = token;
    headers = {
      method: 'POST',
      mode:   'cors',
      cache:  'no-cache',
      body:   JSON.stringify(data)
    };
  }

  if (data.action == 'get_salary_details') {
    let token = localStorage.getItem('hr_logged_user');
    URL = CONFIG.api_url_salary + '/salary_info.php?token=' + token;
  } else if (data.action == 'get_user_salary_details') {
    let token = localStorage.getItem('hr_logged_user');
    URL = CONFIG.api_url_salary + '/salary_info.php?token=' + token + '&user_id=' + data.userid;
  } else if (data.action == 'add_user_salary') {
    let token = localStorage.getItem('hr_logged_user');
    delete (data.action);
    data.token = token;
    headers = {
      method: 'POST',
      mode:   'cors',
      cache:  'no-cache',
      body:   JSON.stringify(data)
    };
    URL = CONFIG.api_url_salary + '/add_sal_structure.php';
  } else if (data.action == 'add_user_holding') {
    let token = localStorage.getItem('hr_logged_user');
    delete (data.action);
    data.token = token;
    headers = {
      method: 'POST',
      mode:   'cors',
      cache:  'no-cache',
      body:   JSON.stringify(data)
    };
    URL = CONFIG.api_url_salary + '/add_holding_info.php';
  }
  // else if( data.action == "update_user_bank_details" ){
  // 	let token = localStorage.getItem('hr_logged_user')
  // 	delete( data.action )
  // 	data.token = token
  // 	headers = {
  // 		method : 'POST',
  // 		mode: 'cors',
  // 		cache: 'no-cache',
  // 		body: JSON.stringify(data),
  // 	}
  // 	URL = CONFIG.api_url_salary +'/user_bank_detail.php'}
  else if (data.action == 'get_user_profile_detail' || data.action == 'update_user_bank_detail' || data.action == 'update_user_profile_detail' ||
    data.action == 'get_all_clients' || data.action == 'get_client_detail' || data.action == 'create_new_client' || data.action == 'create_client_invoice' ||
    data.action == 'update_client_details' || data.action == 'delete_invoice' || data.action == 'get_user_manage_payslips_data' ||
    data.action == 'create_employee_salary_slip' || data.action == 'delete_salary' || data.action == 'send_payslips_to_employees' ||
    data.action == 'get_user_document' || data.action == 'insert_user_document' || data.action == 'delete_user_document' || data.action == 'get_all_users_detail' ||
    data.action == 'create_template_variable' || data.action == 'get_template_variable' || data.action == 'delete_template_variable' ||
    data.action == 'update_template_variable' || data.action == 'create_email_template' || data.action == 'get_email_template' || data.action == 'delete_email_template' ||
    data.action == 'update_email_template' || data.action == 'send_employee_email' || data.action == 'create_pdf' || data.action == 'get_policy_document' ||
    data.action == 'save_policy_document' || data.action == 'get_user_policy_document' || data.action == 'update_user_policy_document' ||
    data.action == 'add_team_list' || data.action == 'get_team_list' || data.action == 'get_team_users_detail') { // generic other new api url
    let token = localStorage.getItem('hr_logged_user');
    data.token = token;
    headers = {
      method: 'POST',
      mode:   'cors',
      cache:  'no-cache',
      body:   JSON.stringify(data)
    };
    URL = CONFIG.other_api_url;
  } else if (data.action == 'admin_user_apply_leave' || data.action == 'change_employee_status' || data.action == 'show_disabled_users' ||
  data.action == 'add_roles' || data.action == 'list_all_roles' || data.action == 'update_role' || data.action == 'assign_user_role' ||
  data.action == 'delete_role') {
    let token = localStorage.getItem('hr_logged_user');
    data.token = token;
    headers = {
      method: 'POST',
      mode:   'cors',
      cache:  'no-cache',
      body:   JSON.stringify(data)
    };
    URL = CONFIG.api_url;
  }

  return fetch(URL, headers).then((response) => {
    if (response.status === 500) {
      return new Promise((resolve, reject) => {
        response.json().then((data) => {
          reject(data);
        });
      });
    } else if (response.status === 401) {
      // alert('401 hai ')	;
      if (action === 'login') {
        notify('Unauthorized Action login- Contact Admin!!');
        localStorage.removeItem('hr_logged_user');
        location.href = CONFIG.login_page_url;
      } else {
        notify('Unauthorized Action ' + action + ' - Contact Admin!!');
        location.href = CONFIG.BASE_URL + '/#/home';
      }
    } else {
      return response.json();
    }
  });
}
