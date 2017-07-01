import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {notify} from 'src/services/index';
import {CONFIG} from 'src/config/index';
import LoadingIcon from 'components/generic/LoadingIcon';
import {Button} from 'components/generic/buttons';
import * as actions_login from 'appRedux/auth/actions/index';
import * as actions from 'appRedux/actions';

class ForgotPassword extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      form_username: ''
    };
    this.doResetPassword = this.doResetPassword.bind(this);
  }
  componentWillReceiveProps (props) {
    let logged_user = props.logged_user;

    if (typeof logged_user.logged_in !== 'undefined' && logged_user.logged_in == 1) {
      if (props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.GUEST) {
        this.props.router.push('/home');
      } else {
        this.props.router.push('/monthly_attendance');
      }
    } else {
      this.setState({
        form_login_status: props.logged_user.login_status_message
      });
      if (props.logged_user.forgotPasswordMessage != '') {
        notify(props.logged_user.forgotPasswordMessage);
      }
    }
  }
  doResetPassword (evt) {
    evt.preventDefault();

    if (this.state.form_username == '') {
      alert('Enter username!!');
    } else {
      this.props.onForgotPassword(this.state.form_username);
      // .then(
      //     (data) => {
      //       console.log(data);
      //       notify(data);
      //     }, (error) => {
      //       notify(error);
      //     });
    }
  }
  render () {
    return (
      <div className="center-block w-xxl w-auto-xs p-y-md">
        <div className="navbar">
          <div className="pull-center">
            <a className="navbar-brand">
              <span className="hidden-folded inline">HR</span>
            </a>
          </div>
        </div>
        <div className="p-a-md box-color r box-shadow-z1 text-color m-a">
        <LoadingIcon loading={this.props.frontend.show_loading} />
        <br />
          <div className="m-b text-sm">
            Reset Your Password
          </div>
          <form name="form" onSubmit={this.doResetPassword}>
            <div className="md-form-group float-label">
                <input
                  className="md-input"
                  required type="text"
                  onChange={(e) => this.setState({form_username: e.target.value})}
                  value={this.state.form_username} />
                <label>Enter Username</label>
            </div>
            <Button type="submit" className="btn primary btn-block p-x-md" label="Reset Password" />
          </form>
          <div className="m-b text-sm text-center">
            <br />
            <button className="md-btn md-flat text-accent">
              <Link to='/'>Login</Link>
            </button>
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
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onForgotPassword: (username) => {
      return dispatch(actions.forgotPassword({username}));
    }
  };
};

const VisibleForgotPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

const RouterVisibleForgotPassword = withRouter(VisibleForgotPassword);

export default RouterVisibleForgotPassword;
