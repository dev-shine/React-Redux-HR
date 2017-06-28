import _ from 'lodash';
import * as jwt from 'jwt-simple';
import {CONFIG} from '../config/index';

export function isNotUserValid (path, logStatus) {
  let tokenData = [];
  if (localStorage.getItem('hr_logged_user') !== null) {
    const token = localStorage.getItem('hr_logged_user');
    tokenData = jwt.decode(token, CONFIG.jwt_secret_key);
    console.log('tokenData', token);
  }
  console.log(path, 'current path');
  console.log(logStatus);
  if (logStatus === 0) {
    return '/logout';
  } else if (_.indexOf(tokenData.role_pages, path) < 0 && tokenData.role === CONFIG.EMPLOYEE) {  // true if not found false if found
    return '/monthly_attendance';
  } else if (_.indexOf(tokenData.role_pages, path) <= 0 && tokenData.role === CONFIG.HR) {
    return 'HR';
  } else if (_.indexOf(tokenData.role_pages, path) < 0) {
    return '/home';
  } else {
    return false;
  }
}
