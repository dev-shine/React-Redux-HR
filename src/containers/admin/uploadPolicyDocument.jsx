import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import * as actions_login from '../../actions/login/index'
import * as actions_policy from '../../actions/policyDocuments/index'
import { CONFIG } from '../../config/index'
import Header from '../../components/generic/header'

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FormUploadPolicyDocument from '../../components/policyDocuments/formUploadPolicyDocument';
import ListAllPolicyDocument from '../../components/policyDocuments/listAllPolicyDocument';

const styles = {
  errorAlert: {
    "marginLeft": "5%",
    "marginRight": "5%",
    "width": "90%",
    "display":"none",
  },
}

class UploadPolicyDocumentContainer extends React.Component {
     constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin();
        this.state = {
          submitStatus:0,
        };
        this.submitDocs = this.submitDocs.bind(this);
        this.showError = this.showError.bind(this);
        this.hideError = this.hideError.bind(this);
        this.submitNewListofDocs = this.submitNewListofDocs.bind(this);
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
    showError(id, errorMsg){
      $('#'+id+ " span").remove();
      $('#'+id).fadeIn().append("<span>"+errorMsg+"<span>")
    }
    hideError(e, id){
      e.preventDefault();
      $('#'+id).fadeOut(0);
      $('#'+id+ " span").remove();
    }
    submitNewListofDocs(newList){
      this.props.onSubmitDocs(newList).then(()=>{
        //this.hideError('e','updateFailed');
        this.showError('updateSuccessful','Documents deleted successfully');
      })
      .catch(()=>{
        //this.hideError('e','updateSuccessful');
        this.showError('updateFailed','Documents not deleted');
      });
    }
    submitDocs(docs){
      if(docs.length > 0){
        this.setState({
          submitStatus:0,
        });
        let policyDocuments = this.props.policy_documents.policyDocuments;
        let finalDoc = _.union(policyDocuments, docs);
        this.props.onSubmitDocs(finalDoc).then(()=>{
          //this.hideError('e','updateFailed');
          this.showError('updateSuccessful','Documents submitted successfully');
          this.setState({
            submitStatus:1,
          });
        })
        .catch(()=>{
          //this.hideError('e','updateSuccessful');
          this.setState({
            submitStatus:-1,
          });
          this.showError('updateFailed','Documents submition faild');
        });
      }else{
        //this.hideError('e','updateSuccessful');
        this.showError('updateFailed','Please add the doc data first');
      }
    }
    render(){
    	return(
    		<div>
          <Menu {...this.props }/>
      		<div id="content" className="app-content box-shadow-z0" role="main">

            <Header pageTitle={"Upload Policy Documents"} {...this.props} />

            <div className="app-body" style={{'marginTop':10}}>
              <div className="row" style={{margin:'10px 4px 0px'}}>
                <div className='col-xs-12' style={{paddingTop:'10px',paddingRight:'0px',textAlign:'center'}}>
                  <div id="updateSuccessful" className="alert alert-success pull-left" style={styles.errorAlert}>
                    <a href="#" className="close" onClick={(e)=>this.hideError(e,'updateSuccessful')} aria-label="close">&times;</a>
                  </div>
                  <div id="updateFailed" className="alert alert-danger pull-left" style={styles.errorAlert}>
                    <a href="#" className="close" onClick={(e)=>this.hideError(e,'updateFailed')} aria-label="close">&times;</a>
                  </div>
                </div>
                <div className="col-xs-6">
                  <FormUploadPolicyDocument submitDocs={this.submitDocs} docs={this.state.docs} {...this.props}/>
                </div>
                <div className="col-xs-6">
                  <ListAllPolicyDocument
                    policyDocuments={this.props.policy_documents.policyDocuments}
                    submitNewListofDocs={this.submitNewListofDocs}
                    {...this.props}
                    />
                </div>
              </div>
            </div>
      		</div>
    		</div>
    		)
    }
}
function mapStateToProps( state ){
    return {
    	frontend : state.frontend.toJS(),
      logged_user : state.logged_user.toJS(),
      policy_documents: state.policyDocuments.toJS(),
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
