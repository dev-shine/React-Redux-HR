//require('../../components/css/template.scss');

import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import {Editor, EditorState, RichUtils} from 'draft-js';

import * as _ from 'lodash'
import Menu from '../../components/generic/Menu'
import FilterLabel from '../../components/generic/FilterLabel'
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
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}from 'material-ui/Table';
import { CONFIG } from '../../config/index';
import EditableDiv from '../../components/editor/EditableDiv';
//var EditableDiv = require('react-wysiwyg-editor');

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
  editorStyle: {
  overflow: 'auto',
  width: '100%',
  height: '300px',
  maxHeight: '300px',
  background:'rgba(204,204,204,.51)',
  }
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
          openSendMailDialog:false,
          recipient: [],
          editorState: EditorState.createEmpty(),
        }

        this.openCreateTemplate = this.openCreateTemplate.bind(this)
        this.handleCloseDialog = this.handleCloseDialog.bind(this)
        this.saveTemplate = this.saveTemplate.bind(this)
        this.editTemplate = this.editTemplate.bind(this)
        this.deleteTemplate = this.deleteTemplate.bind(this)
        this.forwardTemplate = this.forwardTemplate.bind(this)
        this.onclearFilter = this.onclearFilter.bind(this)
        this.onClickLabel = this.onClickLabel.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this);
        this.sendMail = this.sendMail.bind(this);
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
        this.setState({
          usersList: props.usersList.users,
        })
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
    applyVariables(str){
      this.props.templates.variable.map((variable)=>{
        //str = _.replace(str, variable.name, variable.value); // replace single variable
        str = str.split(variable.name).join(variable.value)    // replace multiple variables
      });
      return str;
    }
    forwardTemplate(tmp){
      this.setState({
          openSendMailDialog:true,
          templateId:tmp.id,
          templateName: this.applyVariables(tmp.name),
          templateSubject: this.applyVariables(tmp.subject),
          templateBody: this.applyVariables(tmp.body)
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
        recipient:[],
      })
    }
    toggleDialog(back, front){
        $('#' + back).toggle()
        $('#' + front).toggle()
      }
    filterList(searchText){
      let usersList = this.props.usersList.users,
          list = [];
      usersList.map((user)=>{
        if(user.name.toLowerCase().indexOf(searchText) !== -1){
          list.push(user)
        }
      });
      this.setState({
        usersList: list
      })
    }
    selectUser(data, status){
      let recipient = this.state.recipient;
      status ? recipient.push(data) : _.pullAllBy(recipient, [data], 'user_Id');
      this.setState({
        recipient: recipient
      });
    }
    selectAll(){
      let recipient = [];
      this.state.usersList.map((user)=>{
        recipient.push({user_Id:user.user_Id, name: user.name, email: user.work_email})
      });
      this.setState({
        recipient: recipient,
      })
    }
    onclearFilter() {
      this.setState({ recipient: []});
    }
    onClickLabel(label, indexLabel) {
       this.selectUser(label, false);
    }
    //------editors
    handleContentChange(e) {
      this.setState({templateBody: e.target.value});
    }
    sendMail(){
      let recipient = this.state.recipient,
          templateId = this.state.templateId.trim(),
          state = true;
          if(recipient.length === 0){
            state = false;
            let error = "Please select recipient"
          }
          if(_.isEmpty(templateId)){
            state = false;
            let error = "Please select recipient"
          }
          if(state){
            this.props.onSendMail(templateId, recipient).then(()=>{
              alert('Mail sent');
              this.handleCloseDialog();
            }).catch(()=>{
              alert('Error mail not sent.')
            })
          }
    }
    render(){
      const actionsCreateTemplate = [
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
        const actionsSendMail = [
          <FlatButton
              label="Close"
              primary={true}
              onTouchTap={this.handleCloseDialog}
              style={{marginRight:5}}
            />,
            <RaisedButton
              label={"Send"}
              primary={true}
              onClick={this.sendMail}
            />,
          ];
        let listChartItems = [];

        this.state.usersList.map((user, i)=>{
          let check = false;
          if(_.filter(this.state.recipient, _.matches({user_Id:user.user_Id })).length > 0) {
            check = true;
          }
        listChartItems.push(
          <li className="mb-sm b-b p-t p-b" key={i}>
              <div className="form-group">
                  <input type="checkbox" id="user" className="check" checked={check} onChange={(e)=>this.selectUser({user_Id:user.user_Id, name: user.name, email: user.work_email}, e.target.checked)} /> {user.name}
              </div>
          </li>);
        });

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
              actions={actionsCreateTemplate}
              modal={false}
              bodyStyle={{minHeight:'70vh'}}
              contentStyle={{maxWidth:'90%',width:"90%",transform: 'translate(0px, 0px)'}}
              open={this.state.openDialog}
              onRequestClose={this.handleCloseDialog}
              autoDetectWindowHeight={true}
              autoScrollBodyContent={true}
            >
            <div className="col-xs-9" style={{borderRight:'1px solid gainsboro'}}>
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
                <EditableDiv style={styles.editorStyle} content={this.state.templateBody} onChange={this.handleContentChange} />
              </div>
              </form>
            </div>
            <div className="col-xs-3">
              <h5 style={{textAlign:'center'}}>Variables</h5>
              <Divider />
                {_.map(this.props.templates.variable, (vari) => (
                  <div key={vari.id}>
                  <span className="select-variable">{vari.name}</span>
                  <Divider />
                  </div>
                  ))}
            </div>
            </Dialog>
                 <div className="row" style={{margin:'0px 4px 0px'}}>
                   <div className="col-xs-12">
                     <div className='row'>
                      <div className='col-xs-12' style={{paddingTop:'10px',paddingRight:'0px'}}>
                      <button
                       className="md-btn md-raised m-b-sm indigo"
                       onClick={this.openCreateTemplate}
                      >Create New Template</button>
                      </div>
                      <div className={this.state.paper} style={{"marginTop":"8%"}}>
                        {_.map(this.props.templates.templates, (tmp, i) => (
                        <div className="col-xs-6" key={i} style={{height:'400px', marginBottom:'20px'}}>
                          <Paper zDepth={0} className="paper">
                            <div style={styles.delete}>
                              <span className="pull-right" style={{fontSize:'13px',fontStyle:'italic',color:'#000',cursor:'pointer',padding:'5px 10px'}} onClick={()=>this.toggleDialog(tmp.id+"_menuBack",tmp.id+"_menu")}><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                              <div id={tmp.id+"_menuBack"} className="dropdown-backdrop-custom" style={{'display':'none','opacity':0.5}} onClick={()=>this.toggleDialog(tmp.id+"_menuBack",tmp.id+"_menu")}></div>
                              <div id={tmp.id+"_menu"} className="menuOptions" onClick={()=>this.toggleDialog(tmp.id+"_menuBack",tmp.id+"_menu")}>
                                <span className="b-b" onClick={()=>this.forwardTemplate(tmp)} ><i className="fa fa-share tempalate-btn forward-mail" aria-hidden="true" title="forword"></i>Forword Mail</span>
                                <span className="b-b" onClick={()=>this.editTemplate(tmp)} ><i className="fa fa-pencil-square-o tempalate-btn edit" aria-hidden="true" title="Edit"></i>Edit Template</span>
                                <span className="b-b" onClick={()=>this.deleteTemplate(tmp)} ><i className="fa fa-trash tempalate-btn delete" aria-hidden="true" title="Delete"></i>Delete Template</span>
                              </div>
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
                   actions={actionsSendMail}
                   modal={false}
                   bodyStyle={{minHeight:'70vh'}}
                   contentStyle={{maxWidth:'90%',width:"90%",transform: 'translate(0px, 0px)'}}
                   open={this.state.openSendMailDialog}
                   onRequestClose={this.handleCloseDialog}
                   autoDetectWindowHeight={true}
                   autoScrollBodyContent={true}
                 >
                 <div className="col-xs-9" style={{borderRight:'1px solid gainsboro'}}>
                   <form className="form-inline">
                     <span className="pull-right" style={{fontSize:'13px',fontStyle:'italic',color:'#0000FF',cursor:'pointer'}} onClick={()=>this.toggleDialog("FilterBack", "Filter")}>Add recipient</span>
                       <div className="dropdown">
                        <div id={"FilterBack"} className="dropdown-backdrop-custom" style={{'display':'none','opacity':0.5}} onClick={()=>this.toggleDialog("FilterBack","Filter")}></div>
                        <div id={"Filter"} className="dropdown-menu has-child has-arrow selectUser">
                              <ul className="list-unstyled pt-xs">
                              <li className="mb-sm b-b p-t p-b">
                                  <div className="form-group" style={{width:'50%'}}>
                                    <input type="checkbox" id="selectAll" className="select-all" checked={this.state.recipient.length === this.state.usersList.length ? true : false} onChange={(e)=>this.selectAll()} /> Select all
                                  </div>
                                  <div className="form-group" style={{width:'50%'}}>
                                    <input type="checkbox" id="clearAll" className="clear-all" checked={this.state.recipient.length > 0 ? false : true} onChange={(e)=>this.onclearFilter()} /> Clear all
                                  </div>
                              </li>
                              <li className="mb-sm b-b p-t p-b">
                                <div className="form-group" style={{width:'100%'}}>
                                  <input type="text" id={'selectAll'} style={{width:'100%'}} className="form-control select-all" placeholder="search" onKeyUp={(e)=>this.filterList(e.target.value)} />
                                </div>
                              </li>
                                  {listChartItems}
                              </ul>
                          </div>
                      </div>
                   <div className="form-group selected-recipient" style={styles.formInput}>
                      <div className="pull-left to">To</div>
                      <div className="pull-left filter-tags" style={{textTransform: 'capitalize',fontSize:'12px'}}>
                        {this.state.recipient.length > 0 ? <FilterLabel data={this.state.recipient} onClick={this.onClickLabel} onClear={this.onclearFilter} /> : ""}
                      </div>
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
                     <EditableDiv style={styles.editorStyle} content={this.state.templateBody} onChange={this.handleContentChange} />
                   </div>
                   </form>
                 </div>
                 <div className="col-xs-3">
                   <h5 style={{textAlign:'center'}}>Variables</h5>
                   <Divider />
                     {_.map(this.props.templates.variable, (vari) => (
                       <div key={vari.id}>
                       <span className="select-variable">{vari.name}</span>
                       <Divider />
                       </div>
                       ))}
                 </div>
                 </Dialog>
              </div>
    		  </div>
    		)
    }
}



export default Variables
