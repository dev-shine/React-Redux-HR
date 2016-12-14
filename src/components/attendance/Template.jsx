import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import * as actions_login from '../../actions/login/index'
import * as actions_salary from '../../actions/salary/index'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import AutoComplete from 'material-ui/AutoComplete';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}from 'material-ui/Table';
import { CONFIG } from '../../config/index'

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
    "width": "90%"
  },
  delete: {
    float: 'right',
    marginTop: '-12px',
    marginRight: '-7px'
  },
};

class Variables extends React.Component {
     constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
        this.state = {
          usersList: [],
          openDialog: false,
          templateId:'',
          templateName: '',
          templateSubject: '',
          templateBody: '',
          errName: '',
          errSubject: '',
          openSendMailDialog:false
        }
        this.openCreateTemplate = this.openCreateTemplate.bind(this)
        this.handleCloseDialog = this.handleCloseDialog.bind(this)
        this.saveTemplate = this.saveTemplate.bind(this)
        this.editTemplate = this.editTemplate.bind(this)
        this.deleteTemplate = this.deleteTemplate.bind(this)
        this.forwardTemplate = this.forwardTemplate.bind(this)
    }
    componentWillMount(){

    }
    componentWillReceiveProps( props ){

      window.scrollTo(0, 0);

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
    saveTemplate(){
      let t_id = this.state.templateId.trim(),
          t_name = this.state.templateName.trim(),
          t_subject = this.state.templateSubject.trim(),
          t_body = this.state.templateBody.trim(),
          errName = "",
          errSubject = "";

          if(_.isEmpty(t_name)){
            errName = "Name empty"
          }
          if(_.isEmpty(t_subject)){
            errSubject = "Subject empty"
          }
          this.setState({
            errName: errName,
            errSubject: errSubject
          })
      if(!_.isEmpty(t_name) && !_.isEmpty(t_subject) && !_.isEmpty(t_body)){
        this.props.onSaveTemplate(t_id, t_name, t_subject, t_body).then((succ)=>{
          alert(succ)
          this.handleCloseDialog();
        }).catch((err)=>{
          alert(err)
        })
      }
    }
    editTemplate(tmp){
      this.setState({
          openDialog:true,
          templateId:tmp.id,
          templateName: tmp.name,
          templateSubject: tmp.subject,
          templateBody: tmp.body
      })
    }
    deleteTemplate(tmp){
      if(confirm('Do you want to delete this template')){
        this.props.onDeleteTemplate(tmp.id).then((msg)=>{
          alert(msg)
        }).catch((err)=>{
          alert(err)
        })
      }
    }
    forwardTemplate(tmp){
      this.setState({
          openSendMailDialog:true,
          templateId:tmp.id,
          templateName: tmp.name,
          templateSubject: tmp.subject,
          templateBody: tmp.body
      })
    }
    openCreateTemplate(){
        this.setState({
            openDialog:true
        })
    }
    handleCloseDialog(){
      this.setState({
        openDialog: false,
        templateId: '',
        templateName: '',
        templateSubject: '',
        templateBody: '',
        errName: '',
        errSubject: '',
        openSendMailDialog:false,
      })
    }

    render(){
      console.log('this.state',this.state,'this.props.userList',this.props.usersList);
      const actions = [
        <FlatButton
            label="Close"
            primary={true}
            onTouchTap={this.handleCloseDialog}
            style={{marginRight:5}}
          />,
          <RaisedButton
            label={_.isEmpty(this.state.templateId) ? "SAVE" : "Update"}
            primary={true}
            onClick={this.saveTemplate}
          />,
        ];

        const dataSourceConfig = {
          text: 'name',
          value: 'work_email',
        };
    	return(
				<div className="app-body" id="view" style={{'marginTop':10}}>
        {/*<div className="row">
                    <div className="col-12">
                      <LoadingIcon {...this.props}/>
                    </div>
                  </div>*/""}
					<div className="col-xs-12 col-sm-12" style={{ "float":"right"}}>
            <Dialog
              title={_.isEmpty(this.state.templateId) ? "Create Template" : "Edit Template"}
              actions={actions}
              modal={false}
              contentStyle={{maxWidth:'80%',width:"80%"}}
              open={this.state.openDialog}
              onRequestClose={this.handleCloseDialog}
              autoDetectWindowHeight={true}
              autoScrollBodyContent={true}
            >
            <div>
              <form className="form-inline">
              <div className="form-group" style={styles.formInput}>
              <TextField
                    ref='value'
                    floatingLabelText="Name"
                    floatingLabelFixed={true}
                    hintText="Template Name"
                    fullWidth={true}
                    errorText={this.state.errName}
                    value={this.state.templateName}
                    onChange={(e)=>{
                      this.setState({
                          templateName: e.target.value,
                      });
                    }}
              />
              </div>
              <div className="form-group" style={styles.formInput}>
              <TextField
                    ref='Name'
                    floatingLabelText="Subject"
                    floatingLabelFixed={true}
                    hintText="Subject"
                    fullWidth={true}
                    errorText={this.state.errSubject}
                    value={this.state.templateSubject}
                    onChange={(e)=>{
                      this.setState({
                          templateSubject: e.target.value,
                      });
                    }}
              />
              </div>
              <div className="form-group" style={styles.formInput}>
                <textarea style={{width:'100%', height:'200px'}}
                  value = {this.state.templateBody}
                  onChange={(e)=>{
                    this.setState({
                        templateBody: e.target.value,
                    });
                  }}
                  ></textarea>
              </div>
              </form>
            </div>
            </Dialog>
                 <div className="row" style={{margin:'0px 4px 0px'}}>
                   <div className="col-xs-12">
                     <div className='row'>
                      <div className='col-xs-12' style={{paddingTop:'10px',paddingRight:'0px'}}>
                      <button
                       className="md-btn md-raised m-b-sm indigo"
                       onClick={this.openCreateTemplate}
                      >Add New Template</button>
                      </div>
                      <div className={this.state.paper} style={{"marginTop":"8%"}}>
                        {_.map(this.props.templates.templates, (tmp, i) => (
                        <div className="col-xs-6" key={i} style={{height:'400px', marginBottom:'20px'}}>
                          <Paper zDepth={3} style={{padding:'20px', overflow:'hidden', height:'100%'}} >
                            <div style={styles.delete}>
                              <i className="fa fa-share tempalate-btn forward-mail" aria-hidden="true" onClick={()=>this.forwardTemplate(tmp)}></i>
                              <i className="fa fa-pencil-square-o tempalate-btn edit" aria-hidden="true" title="Edit" onClick={()=>this.editTemplate(tmp)}></i>
                              <i className="fa fa-times tempalate-btn delete" aria-hidden="true" title="Delete" onClick={()=>this.deleteTemplate(tmp)}></i>
                            </div>
                            <div className="col-xs-12 m-b"><span style={{display: 'inline-flex'}}><b>Name:  </b><div className="p-l" dangerouslySetInnerHTML={{__html:tmp.name}}></div></span></div>
                            <div className="col-xs-12 m-b"><span style={{display: 'inline-flex'}}><b>Subject: </b><div className="p-l" dangerouslySetInnerHTML={{__html:tmp.subject}}></div></span></div>
                            <div className="col-xs-12 m-b"><span style={{display: 'inline-flex'}}><b>Body: </b><div className="p-l" dangerouslySetInnerHTML={{__html:tmp.body}}></div></span></div>
                        </Paper>
                        </div>
                            )
                          )
                        }
                      </div>
                     </div>
                   </div>
                 </div>
                 <Dialog
                   title={"Send Mail"}
                   actions={actions}
                   modal={false}
                   contentStyle={{maxWidth:'80%',width:"80%"}}
                   open={this.state.openSendMailDialog}
                   onRequestClose={this.handleCloseDialog}
                   autoDetectWindowHeight={true}
                   autoScrollBodyContent={true}
                 >
                 <div>
                   <form className="form-inline">
                    <div className="form-group" style={styles.formInput}>
                      <select className="form-control ">
                        <option><input type="text" /></option>
                        <option><input type="checkbox"/> ssssssss</option>
                        <option><input type="checkbox"/>aaaa</option>
                        <option><input type="checkbox"/>aaaa</option>
                        <option><input type="checkbox"/>aaaa</option>
                      </select>
                    </div>
                   <div className="form-group" style={styles.formInput}>
                     
                   </div>
                   <div className="form-group" style={styles.formInput}>
                   <TextField
                         ref='value'
                         floatingLabelText="Name"
                         floatingLabelFixed={true}
                         hintText="Template Name"
                         fullWidth={true}
                         errorText={this.state.errName}
                         value={this.state.templateName}
                         onChange={(e)=>{
                           this.setState({
                               templateName: e.target.value,
                           });
                         }}
                   />
                   </div>
                   <div className="form-group" style={styles.formInput}>
                   <TextField
                         ref='Name'
                         floatingLabelText="Subject"
                         floatingLabelFixed={true}
                         hintText="Subject"
                         fullWidth={true}
                         errorText={this.state.errSubject}
                         value={this.state.templateSubject}
                         onChange={(e)=>{
                           this.setState({
                               templateSubject: e.target.value,
                           });
                         }}
                   />
                   </div>
                   <div className="form-group" style={styles.formInput}>
                     <textarea style={{width:'100%', height:'70px'}}
                       value = {this.state.templateBody}
                       onChange={(e)=>{
                         this.setState({
                             templateBody: e.target.value,
                         });
                       }}
                       ></textarea>
                   </div>
                   </form>
                 </div>
                 </Dialog>
              </div>
    		  </div>
    		)
    }
}



export default Variables
