import {CONFIG} from 'src/config/index';

export function notify (text) {
  sweetAlert(text);
}

export function apiAccessError (text, action) {
  swal({
    title:              'Access denied!',
    text:               'You are unauthorized to the Action <b>' + action + '</b> - Contact Admin!!',
    type:               'error',
    confirmButtonColor: '#DD6B55',
    confirmButtonText:  'OK',
    closeOnConfirm:     false,
    html:               true
  },
function () {
  localStorage.removeItem('hr_logged_user');
  location.href = CONFIG.BASE_URL;
});
}
