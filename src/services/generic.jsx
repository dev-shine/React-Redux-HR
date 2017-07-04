import _ from 'lodash';
import * as jwt from 'jwt-simple';
import {CONFIG} from '../config/index';

export function isNotUserValid (path, loggedUser) {
  let tokenData = [];
  if (localStorage.getItem('hr_logged_user') !== null) {
    const token = localStorage.getItem('hr_logged_user');
    tokenData = jwt.decode(token, CONFIG.jwt_secret_key);
  }
  if (loggedUser.logged_in === 0) {
    return {status: true, redirectTo: '/logout'};
  } else if (_.isEmpty(_.find(tokenData.role_pages, ['page_name', path]))) {
    return {status: true, redirectTo: tokenData.role_pages && tokenData.role_pages[0].page_name};
  } else if (loggedUser.is_policy_documents_read_by_user === 0) {
    return {status: true, redirectTo: '/policy_documents'};
  } else {
    return {status: false, redirectTo: ''};
  }
}
