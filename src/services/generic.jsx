import _ from 'lodash';
// import {CONFIG} from '../config/index';

export function isNotUserValid (path) {
  // Temporary hard coded token.page_roles data to be removed later
  let rolePages = {'role_pages': [ 'home', 'view_salary', 'inventory_system', 'manage_roles', 'manage_salary', 'manage_clients' ]};
  // Ends here
  // let rolePages = CONFIG.ROLEPAGES;
  // console.log(path, 'path', rolePages.role_pages, 'rolePages');
  // console.log(_.indexOf(rolePages.role_pages, path), 'check');
  if ((_.indexOf(rolePages.role_pages, path)) === -1) {
    return true;
  } else {
    return false;
  }
}
