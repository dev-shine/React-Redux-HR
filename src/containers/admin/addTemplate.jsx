import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import * as actions_login from '../../actions/login/index'
import * as actions_usersList from '../../actions/user/usersList'
import * as actions_salary from '../../actions/salary/index'
import * as actions_templates from '../../actions/admin/templates'
import Template from '../../components/attendance/Template'
import { CONFIG } from '../../config/index'


class TemplateContainer extends React.Component {
     constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
        this.state = {
        }
    }
    componentWillMount(){
        this.props.onFetchTemplate()
        this.props.onFetchVariables()
        this.props.onUsersList()
    }
    componentWillReceiveProps( props ){

      //window.scrollTo(0, 0);

      if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            if( props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.HR){
            }else{
                this.props.router.push('/home');
            }
        }
    }
    componentDidUpdate(){
    }
    render(){
    	return(
    		<div>
            <Menu {...this.props }/>
    		<div id="content" className="app-content box-shadow-z0" role="main">
    		  <div className="app-header white box-shadow">
                <div className="navbar">
    			    <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
      				   <i className="material-icons">&#xe5d2;</i>
    				</a>
    			    <div className="navbar-item pull-left h5" id="pageTitle">
    			       Email Template
    			    </div>
			    </div>
				</div>
				<Template {...this.props }/>
    		</div>
    		</div>
    		)
    }
}
function mapStateToProps( state ){
    return {
    	  frontend : state.frontend.toJS(),
        logged_user : state.logged_user.toJS(),
        templates : state.template.toJS(),
        usersList: state.usersList.toJS()
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    	  onIsAlreadyLogin: () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onUsersList: () => {
          return dispatch(actions_usersList.get_users_list())
        },
        onFetchTemplate: ()=>{
            return dispatch(actions_templates.get_templates())
        },
        onFetchVariables:()=>{
            return dispatch(actions_templates.get_variable())
        },
        onSaveTemplate: (t_id, t_name, t_subject, t_body) =>{
          return dispatch(actions_templates.save_templates(t_id, t_name, t_subject, t_body))
        },
        onDeleteTemplate: (t_id) =>{
          return dispatch(actions_templates.delete_template(t_id))
        },
        onSendMail: (email) =>{
          return dispatch(actions_templates.send_mail(email))
        }
    }
}

const VisibleTemplateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( TemplateContainer )

const RouterVisibleTemplateContainer = withRouter( VisibleTemplateContainer )

export default RouterVisibleTemplateContainer
