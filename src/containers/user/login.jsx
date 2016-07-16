import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as actions_login from '../../actions/login/index'
import * as _ from 'lodash'
import {notify} from '../../services/index'

import VisibleHeader from '../../containers/generic/header'

class Login extends React.Component {
    constructor( props ){
        super( props );

        // if( props.logged_user.logged_in == 1 ){  //is user already readirect to another page
        //     this.props.router.push('/monthly_attendance');
        // }
        if( this.props.onIsAlreadyLogin() == false ){
          
        }else{ //is user already readirect to another page
          this.props.router.push('/monthly_attendance');
        }

        this.state = {
            form_login_username : '',
            form_login_password : '',
            form_login_status : '',
        }
        this.doLogin = this.doLogin.bind(this);
    }
    componentWillReceiveProps( props ){
        let logged_user = props.logged_user
        
        if( typeof logged_user.logged_in != 'undefined' && logged_user.logged_in == 1 ){
            this.props.router.push('/monthly_attendance');
        }else{
            this.setState({
                form_login_status : props.frontend.form_login_status
            })
        }

    }
    doLogin( evt ){
        evt.preventDefault();
        this.props.onLogin( this.state.form_login_username, this.state.form_login_password ).then( 
        (data) => {
            
        },(error) => {
            notify( error );
        })
    }
    render(){
        let styles = _.cloneDeep(this.constructor.styles);
        return(



  <div className="center-block w-xxl w-auto-xs p-y-md">
    <div className="navbar">
      <div className="pull-center">
        
        <a className="navbar-brand">
            <span className="hidden-folded inline">HR</span>
        </a>


      </div>
    </div>
    <div className="p-a-md box-color r box-shadow-z1 text-color m-a">
      <div className="m-b text-sm">
        Sign in with your username
      </div>
      <form name="form"  onSubmit={this.doLogin}>
        <div className="md-form-group float-label">

            <input type="email" className="md-input" ng-model="user.email" required type="text" ref="username" onChange={ () => this.setState({ form_login_username : this.refs.username.value }) } value={ this.state.form_login_username }/>
            <label>Username</label>

        </div>
        <div className="md-form-group float-label">

          <input type="password" className="md-input" ng-model="user.password" required  type="password" ref="password" onChange={ () => this.setState( { form_login_password : this.refs.password.value } ) } value={ this.state.form_login_password } />
          <label>Password</label>

        </div>      
        <div className="m-b-md">        
          <label className="md-check">
            <input type="checkbox" /><i className="primary"></i> Keep me signed in
          </label>
        </div>
        <button type="submit" className="btn primary btn-block p-x-md">Sign in</button>
      </form>
    </div>

    <div className="p-v-lg text-center">
      <div className="m-b"><a ui-sref="access.forgot-password" href="#/access/forgot-password" className="text-primary _600">Forgot password?</a></div>
    </div>
  </div>





        )
    }
}

// inline css
Login.styles = {
  username: {
    background : "rgb(62, 168, 245)",
    color : "white",
  },
  password: {
    background : "rgb(62, 168, 245)",
    color : "white",
  }
};



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
        }
    }
}

const VisibleLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)( Login )

const RouterVisibleLogin = withRouter( VisibleLogin )

export default RouterVisibleLogin