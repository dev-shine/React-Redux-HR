import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import Header from '../../components/generic/header'

import * as actions_login from '../../actions/login/index'
import * as actions_salary from '../../actions/salary/index'
import * as actions_templates from '../../actions/admin/templates'
import * as actions_policy from '../../actions/policyDocuments/index'

import Template from '../../components/attendance/Template'
import { CONFIG } from '../../config/index'


class TemplateContainer extends React.Component {
     constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin();
        this.state = {
        }
    }
    componentWillMount(){
      this.props.onFetchUserPolicyDocument();
      this.props.onFetchUserSalaryDetails().then(()=>{
        this.props.onFetchTemplate();
        this.props.onFetchVariables();
      });
    }
    componentWillReceiveProps( props ){

      //window.scrollTo(0, 0);

      if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            if( props.logged_user.role == CONFIG.ADMIN ){

            } else if (props.logged_user.role == CONFIG.HR){
              let unread = _.filter(props.policy_documents.policyDocuments, function(o) { return o.read == 0; }) || [];
              if(unread.length > 0){
                this.props.router.push('/policy_documents');
              }
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
            <Header pageTitle={"Email Template"} {...this.props} />
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
        employee: state.empSalaryList.toJS(),
        policy_documents: state.policyDocuments.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    	  onIsAlreadyLogin: () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onFetchUserPolicyDocument: ()=>{
          return dispatch(actions_policy.fetchUserPolicyDocument());
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
        },
        onDownloadPdf: (template,fileName)=>{
            return dispatch(actions_templates.download_pdf(template,fileName))
        },
        onFetchUserSalaryDetails: () =>{
            return dispatch( actions_salary.fetchUserSalaryDetails())
        }
    }
}

const VisibleTemplateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( TemplateContainer )

const RouterVisibleTemplateContainer = withRouter( VisibleTemplateContainer )

export default RouterVisibleTemplateContainer
