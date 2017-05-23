import React from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import * as actions_login from '../../../redux/auth/actions/index';
import * as _ from 'lodash'
import {notify} from '../../../services/index'
import { CONFIG } from '../../../config/index'
import ForgotPasswordRoot from  '../../../components1/auth/forgotPassword/ForgotPasswordRoot';


class ForgotPassword extends React.Component {
  constructor( props ){
      super( props );
      this.props.onIsAlreadyLogin()
      this.state = {
          form_username : '',
      }
      this.doResetPassword = this.doResetPassword.bind(this)
  }
  componentWillReceiveProps( props ){
      let logged_user = props.logged_user

      if( typeof logged_user.logged_in != 'undefined' && logged_user.logged_in == 1 ){
          if( props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.GUEST ){
              this.props.router.push('/home');
          }else{
              this.props.router.push('/monthly_attendance');
          }
      }else{
          this.setState({
              form_login_status : props.logged_user.login_status_message
          })
          if( props.logged_user.login_status_message != ''){
              notify( props.logged_user.login_status_message );
          }
      }
  }
  doResetPassword( evt ){
      evt.preventDefault();

      if( this.state.form_username == '' ){
          alert('Enter username!!')
      }else{
          this.props.onForgotPassword( this.state.form_username ).then(
          (data) => {
              notify( data );
          },(error) => {
              notify( error );
          })
      }
  }
  render(){
      return(
        <ForgotPasswordRoot self={this} />
      )
  }
}


function mapStateToProps( state ){
    return {
        frontend : state.frontend.toJS(),
        logged_user : state.logged_user.toJS()
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin : ( username, password ) => {
            return dispatch( actions_login.login( username, password ))
        },
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onForgotPassword : ( username ) => {
            return dispatch( actions_login.forgotPassword( username ))
        }
    }
}

const VisibleForgotPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)( ForgotPassword )

const RouterVisibleForgotPassword = withRouter( VisibleForgotPassword )

export default RouterVisibleForgotPassword
