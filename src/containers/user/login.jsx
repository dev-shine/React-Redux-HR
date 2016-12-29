import React from 'react';
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'
import * as actions_login from '../../actions/login/index'
import * as _ from 'lodash'
import {notify} from '../../services/index'
import { CONFIG } from '../../config/index'
import LoadingIcon from '../../components/generic/LoadingIcon'

const css = {
  log: {
    "backgroundColor": "#284665",
    "padding": "30px 40px 30px 40px",
    "width": "300px",
    "marginLeft": "5px",
    "borderRadius": "6px",
    paddingBottom: '20px',
  }
}

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
    let styles = _.cloneDeep(this.constructor.styles);
    let link_forgot_password = <Link to='/forgot_password'>Forgot Password</Link>
    return (
      <div>
        <div className="center-block w-xxl w-auto-xs p-y-md">
          <div style={css.log}>
            <img src="./logo.png" height="40" width="220"/>
          </div>
          <div className="navbar">

            <div className="pull-center">

              <a className="navbar-brand">
                <img src="./favicon.ico" height="25" width="25"/>
                <span className="hidden-folded inline">HR</span>
              </a>

            </div>
          </div>

          <div className="p-a-md box-color r box-shadow-z1 text-color m-a">
            <LoadingIcon {...this.props}/>
            <br/>
            <div className="m-b text-sm">
              Sign in with your username
            </div>
            <form name="form" onSubmit={this.doLogin}>
              <div className="md-form-group float-label">

                <input type="email" className="md-input" required type="text" ref="username" onChange={() => this.setState({form_login_username: this.refs.username.value})} value={this.state.form_login_username}/>
                <label>Username</label>

              </div>
              <div className="md-form-group float-label">
                <input type="password" className="md-input" required type="password" ref="password" onChange={() => this.setState({form_login_password: this.refs.password.value})} value={this.state.form_login_password}/>
                <label>Password</label>
              </div>
              <button type="submit" className="btn primary btn-block p-x-md">Sign in</button>
            </form>
            <div className="m-b text-sm text-center">
              <br/>
              <button className="md-btn md-flat text-accent" onClick={this.doGuestLogin}>Click for guest Login</button>
              <br/>
              <button className="md-btn md-flat text-accent">{link_forgot_password}</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

// inline css
Login.styles = {
  username: {
    background: "rgb(62, 168, 245)",
    color: "white"
  },
  password: {
    background: "rgb(62, 168, 245)",
    color: "white"
  }
};

function mapStateToProps(state) {
  return {frontend: state.frontend.toJS(), logged_user: state.logged_user.toJS()}
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

const VisibleLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

const RouterVisibleLogin = withRouter(VisibleLogin)

export default RouterVisibleLogin
