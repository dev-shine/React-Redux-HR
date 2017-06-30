import _ from 'lodash';

export function isNotUserValid (path) {
  let rolePages = {'role_pages': [ 'home', 'view_salary', 'inventory_system', 'manage_roles', 'manage_salary', 'manage_clients' ]};
  if ((_.indexOf(rolePages.role_pages, path)) === -1) {
    return true;
  } else {
    return false;
  }
}
