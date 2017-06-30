import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {notify} from 'src/services/index';
import {CONFIG} from 'src/config/index';
import GetLogo from 'components/auth/login/GetLogo';
import Navbar from 'components/auth/login/Navbar';
import LoginForm from 'modules/auth/components/login/LoginForm';
import LoginFormFooter from 'components/auth/login/LoginFormFooter';
import LoadingIcon from 'components/generic/LoadingIcon';
import * as actions from 'appRedux/actions';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      form_login_status: ''
    };
    this.doGuestLogin = this.doGuestLogin.bind(this);
  }
  componentWillReceiveProps (props) {
    let logged_user = props.logged_user;
    if (typeof logged_user.logged_in !== 'undefined' && logged_user.logged_in == 1) {
      if (props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.GUEST || props.logged_user.role == CONFIG.HR) {
        this.props.router.push('/home');
      } else {
        this.props.router.push('/monthly_attendance');
      }
    } else {
      this.setState({form_login_status: props.logged_user.login_status_message});
      if (props.logged_user.login_status_message != '') {
        notify(props.logged_user.login_status_message);
      }
    }
  }

  doGuestLogin (evt) {
    this.props.onLogin('global_guest', 'global_guest').then((data) => {}, (error) => {
      notify(error);
    });
  }
  render () {
    return (
      <div>
        <div className="center-block w-xxl w-auto-xs p-y-md">
          <GetLogo />
          <Navbar />
          <div className="p-a-md box-color r box-shadow-z1 text-color m-a">
            <LoadingIcon loading={this.props.frontend.show_loading} />
            <br />
            <div className="m-b text-sm">
              Sign in with your username
            </div>
            <LoginForm {...this.props} />
            <LoginFormFooter doGuestLogin={this.doGuestLogin} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:    state.frontend.toJS(),
    logged_user: state.logged_user.toJS()
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) => {
      return dispatch(actions.userLoginRequest({username, password}));
    },
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    }
  };
};

const VisibleLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

const RouterVisibleLogin = withRouter(VisibleLogin);

export default RouterVisibleLogin;
