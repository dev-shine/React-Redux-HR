import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import * as actions_login from '../../actions/login/index'
import * as actions_salary from '../../actions/salary/index'
import * as actions_variable from '../../actions/variable'
import Variables from '../../components/attendance/Variable'
import { CONFIG } from '../../config/index'

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';


const styles = {
  block: {
    maxWidth: 250,
  },
  lable:{
    fontWeight:'normal',
    fontSize:15
  },
  container: {
    position: 'relative',
    textAlign:'center',
    paddingTop:'200px'
  },
  formInput:{
    "marginLeft": "5%",
    "marginRight": "5%",
    "width": "60%"
  },
};


class UploadPolicyDocumentContainer extends React.Component {
     constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
        this.state = {
          nameofdoc:'',
          linkofdoc:'',
        }
    }
    componentWillMount(){
        //this.props.onFetchVariables( )
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
    saveDocs(){
      let name = this.state.nameofdoc.trim(),
          link = this.state.linkofdoc.trim();
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
  				  </div>
            <div className="app-body" style={{'marginTop':10}}>
              <div className="row" style={{margin:'10px 4px 0px'}}>
                <div className="col-xs-12">
                  <Paper  zDepth={1} >
                    <div>
                      <form className="form-inline">
                      <div className="form-group" style={styles.formInput}>
                      <TextField
                            ref='name'
                            floatingLabelText="Name of doc"
                            value={this.state.nameofdoc}
                            onChange={(e)=>{
                              this.setState({
                                  nameofdoc: e.target.value,
                              });
                            }}
                      />
                      </div>
                      <div className="form-group" style={styles.formInput}>
                      <TextField
                            ref='link'
                            floatingLabelText="Link of doc"
                            value={this.state.linkofdoc}
                            onChange={(e)=>{
                              this.setState({
                                  linkofdoc: e.target.value,
                              });
                            }}
                      />
                      </div>
                      <div className="form-group" style={styles.formInput}>
                        <FlatButton
                          label="SAVE"
                          primary={true}
                          style={{margin:"20px 10px"}}
                          onTouchTap={this.saveDocs}
                        />
                        <RaisedButton
                          label="SUBMIT"
                          primary={true}
                          style={{margin:"20px 10px"}}
                          onClick={this.submitDocs}
                        />
                      </div>
                      </form>
                    </div>
                  </Paper>
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
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    	onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        }
    }
}

const VisibleUploadPolicyDocumentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( UploadPolicyDocumentContainer )

const RouterVisibleUploadPolicyDocumentContainer = withRouter( VisibleUploadPolicyDocumentContainer )

export default RouterVisibleUploadPolicyDocumentContainer
