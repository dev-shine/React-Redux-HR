import Immutable from 'immutable';

let initialState = {
  login_status_message: '',
  logged_in:            0,
  userid:               '-1',
  username:             '-1',
  role:                 '-1',
  name:                 '-1',
  jobtitle:             '-1',
  profileImage:         ''

};

export function logged_user (state = Immutable.Map(initialState), action) {
  let d = new Date();
  let timestamp = d.getTime();

  if (action.type === 'ACTION_LOGIN_SUCCESS') {
    return state.set('logged_in', 1)
        .set('userid', action.payload.id)
        .set('username', action.payload.username)
        .set('role', action.payload.role)
        .set('name', action.payload.name)
        .set('jobtitle', action.payload.jobtitle)
        .set('profileImage', action.payload.profileImage)
        .set('login_status_message', 'Success Login');
  } else if (action.type === 'ACTION_LOGIN_FAIL') {
    return state.set('logged_in', -1)
        .set('login_status_message', action.payload);
  } else if (action.type === 'ACTION_LOGIN_ERROR') {
    return state.set('logged_in', -1)
        .set('login_status_message', action.payload)
        .set('stateTimestamp', timestamp);
  } else if (action.type === 'ACTION_LOGOUT') {
    return state.set('logged_in', 0)
        .set('userid', '-1')
        .set('username', '-1')
        .set('role', '-1')
        .set('name', '-1')
        .set('jobtitle', '-1')
        .set('profileImage', '')
        .set('login_status_message', '');
  } else {
    return state.set('login_status_message', '');
  }
}
