import {CONFIG} from 'src/config/index';
import _ from 'lodash';
import {confirm} from 'src/services/notify';
import 'whatwg-fetch';

const actionsForOtherAPIurl = ['get_user_profile_detail', 'get_user_profile_detail_by_id', 'update_user_bank_detail',
  'update_user_profile_detail', 'get_all_clients', 'get_client_detail', 'create_new_client', 'create_client_invoice',
  'update_client_details', 'delete_invoice', 'get_user_manage_payslips_data', 'create_employee_salary_slip', 'delete_salary',
  'send_payslips_to_employees', 'get_user_document', 'insert_user_document', 'delete_user_document', 'get_all_users_detail',
  'create_template_variable', 'get_template_variable', 'delete_template_variable', 'update_template_variable', 'create_email_template',
  'get_email_template', 'delete_email_template', 'update_email_template', 'send_employee_email', 'create_pdf', 'get_policy_document',
  'save_policy_document', 'get_user_policy_document', 'update_user_policy_document', 'add_team_list', 'get_team_list',
  'get_team_users_detail', 'get_user_salary_info', 'get_user_salary_info_by_id' ];

const actionsForAPIurl = ['admin_user_apply_leave', 'change_employee_status', 'get_employee_life_cycle', 'update_employee_life_cycle', 'show_disabled_users', 'add_roles', 'list_all_roles', 'update_role', 'assign_user_role', 'delete_role'];

export function fireAjax (method, url, data) {
  let URL = CONFIG.api_url + url;
  let action = data.action;
  let token = localStorage.getItem('hr_logged_user');
  data.token = token;
  let headers = {
    method: method,
    mode:   'cors',
    cache:  'no-cache',
    body:   JSON.stringify(data)
  };

  if (data.action === 'add_user_salary') {
    delete (data.action);
    headers.body = JSON.stringify(data);
    URL = CONFIG.api_url_salary + '/add_sal_structure.php';
  } else if (data.action === 'add_user_holding') {
    delete (data.action);
    headers.body = JSON.stringify(data);
    URL = CONFIG.api_url_salary + '/add_holding_info.php';
  } else if (_.indexOf(actionsForOtherAPIurl, data.action) >= 0) {
    headers.body = JSON.stringify(data);
    URL = CONFIG.other_api_url;
  } else if (_.indexOf(actionsForAPIurl, data.action) >= 0) {
    headers.body = JSON.stringify(data);
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
      confirm('401 ! Access denied!', '<span style="color:#f27474;font-size:18px;font-weight:600">' + action + '</span><br/>You are unauthorized to the Action - Contact Admin!!', 'error').then((res) => {
        localStorage.removeItem('hr_logged_user');
        location.href = CONFIG.BASE_URL;
      });
    } else {
      return response.json();
    }
  });
}
