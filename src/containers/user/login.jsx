import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as actions_login from '../../actions/login/index'
import * as _ from 'lodash'
import {notify} from '../../services/index'


import LoadingIcon from '../../components/generic/LoadingIcon'

class Login extends React.Component {
    constructor( props ){
        super( props );

        // if( props.logged_user.logged_in == 1 ){  //is user already readirect to another page
        //     this.props.router.push('/monthly_attendance');
        // }
        if( this.props.onIsAlreadyLogin() == false ){
          
        }else{ //is user already readirect to another page
          this.props.router.push('/home');
        }

        this.state = {
            form_login_username : '',
            form_login_password : '',
            form_login_status : '',
        }
        this.doLogin = this.doLogin.bind(this)
        this.doGuestLogin = this.doGuestLogin.bind( this )
    }
    componentWillReceiveProps( props ){
        let logged_user = props.logged_user
        
        if( typeof logged_user.logged_in != 'undefined' && logged_user.logged_in == 1 ){
            this.props.router.push('/home');
        }else{
            this.setState({
                form_login_status : props.logged_user.login_status_message
            })
            if( props.logged_user.login_status_message != ''){
                notify( props.logged_user.login_status_message );    
            }
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
    doGuestLogin( evt ){
        this.props.onLogin( 'global_guest', 'global_guest' ).then( 
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
    <LoadingIcon {...this.props}/>
      <div className="m-b text-sm">
        Sign in with your username
      </div>
      <form name="form"  onSubmit={this.doLogin}>
        <div className="md-form-group float-label">

            <input type="email" className="md-input"  required type="text" ref="username" onChange={ () => this.setState({ form_login_username : this.refs.username.value }) } value={ this.state.form_login_username }/>
            <label>Username</label>

        </div>
        <div className="md-form-group float-label">
          <input type="password" className="md-input"  required  type="password" ref="password" onChange={ () => this.setState( { form_login_password : this.refs.password.value } ) } value={ this.state.form_login_password } />
          <label>Password</label>
        </div>      
        <button type="submit" className="btn primary btn-block p-x-md">Sign in</button>
      </form>
      <div className="m-b text-sm text-center">
        <br/>
        <button className="md-btn md-flat text-accent"  onClick={this.doGuestLogin}>Click for guest Login</button>
      </div>
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