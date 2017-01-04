import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import * as actions_login from '../../actions/login/index'
import * as actions_policy from '../../actions/policyDocuments/index'
import { CONFIG } from '../../config/index'

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FormUploadPolicyDocument from '../../components/policyDocuments/formUploadPolicyDocument';


class UploadPolicyDocumentContainer extends React.Component {
     constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin();
        this.state = {
        };
    }
    componentWillMount(){
        this.props.onFetchPolicyDocument()
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
          			       Upload Policy Documents
          			    </div>
  			          </div>
  				  </div><div className="app-body" style={{'marginTop':10}}>
              <div className="row" style={{margin:'10px 4px 0px'}}>
                <div className="col-xs-6">
                  <FormUploadPolicyDocument {...this.props}/>
                </div>
              </div>
            </div>
      		</div>
    		</div>
    		)
    }
}
function mapStateToProps( state ){
  console.log(state.policyDocuments.toJS())
    return {
    	frontend : state.frontend.toJS(),
      logged_user : state.logged_user.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    	  onIsAlreadyLogin: () => {
          return dispatch( actions_login.isAlreadyLogin());
        },
        onSubmitDocs: (docs)=> {
          return dispatch( actions_policy.submitDocs(docs));
        },
        onFetchPolicyDocument: ()=>{
          return dispatch(actions_policy.fetchPolicyDocument());
        }
    }
}

const VisibleUploadPolicyDocumentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( UploadPolicyDocumentContainer )

const RouterVisibleUploadPolicyDocumentContainer = withRouter( VisibleUploadPolicyDocumentContainer )

export default RouterVisibleUploadPolicyDocumentContainer
