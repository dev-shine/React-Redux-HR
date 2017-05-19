import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actions_login from '../../../redux/auth/actions/index';
import {notify} from '../../../../services/index';
import { CONFIG } from '../../../../config/index';
import {login} from  '../../../components/auth/login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.props.onIsAlreadyLogin()

    this.state = {
      form_login_username: '',
      form_login_password: '',
      form_login_status: ''
    }
    this.doLogin = this.doLogin.bind(this)
    this.doGuestLogin = this.doGuestLogin.bind(this)
  }
  componentWillReceiveProps(props) {
    let logged_user = props.logged_user

    if (typeof logged_user.logged_in != 'undefined' && logged_user.logged_in == 1) {
      if (props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.GUEST || props.logged_user.role == CONFIG.HR) {
        this.props.router.push('/home');
      } else {
        this.props.router.push('/monthly_attendance');
      }
    } else {
      this.setState({form_login_status: props.logged_user.login_status_message})
      if (props.logged_user.login_status_message != '') {
        notify(props.logged_user.login_status_message);
      }
    }
  }
  doLogin(evt) {
    evt.preventDefault();
    this.props.onLogin(this.state.form_login_username, this.state.form_login_password).then((data) => {}, (error) => {
      notify(error);
    })
  }
  doGuestLogin(evt) {
    this.props.onLogin('global_guest', 'global_guest').then((data) => {}, (error) => {
      notify(error);
    })
  }
  render() {
    var self = this;
    return (
      login({self})
    )
  }
}



function mapStateToProps(state) {
  return {
    frontend: state.frontend.toJS(),
    logged_user: state.logged_user.toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) => {
      return dispatch(actions_login.login(username, password))
    },
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin())
    }
  }
}

const VisibleLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

const RouterVisibleLogin = withRouter(VisibleLogin)

export default RouterVisibleLogin
