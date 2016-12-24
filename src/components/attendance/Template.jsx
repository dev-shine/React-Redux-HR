//require('../../components/css/template.scss');

import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import RichTextEditor from 'react-rte';

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
var moment = require('moment');

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
    display: 'block',
    width: '100%',
    height: '300px',
    maxHeight: '300px',
    background:'rgba(204,204,204,.51)',
  },
  errorAlert: {
    "marginLeft": "5%",
    "marginRight": "5%",
    "width": "90%",
    "display":"none",
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
          templateBody: RichTextEditor.createEmptyValue(),
          errName: '',
          errSubject: '',
          pValue:[],
          openSendMailDialog:false,
          recipient: [],
          openVarDialog: false,
          openPreview: false,
          sentMail:{},
          recipientEmailId: '',
          recipientNotFound: false,
          emailValidationError: '',
        }

        this.openCreateTemplate = this.openCreateTemplate.bind(this)
        this.handleCloseDialog = this.handleCloseDialog.bind(this)
        this.saveTemplate = this.saveTemplate.bind(this)
        this.editTemplate = this.editTemplate.bind(this)
        this.deleteTemplate = this.deleteTemplate.bind(this)
        this.forwardTemplate = this.forwardTemplate.bind(this)
        //this.onclearFilter = this.onclearFilter.bind(this)
        this.onClickLabel = this.onClickLabel.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this);
        this.sendMail = this.sendMail.bind(this);
        this.applyVariables = this.applyVariables.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setVariable = this.setVariable.bind(this);
        this.openMailPreview = this.openMailPreview.bind(this);
        this.closeMailPreview = this.closeMailPreview.bind(this);
        this.submitEmail = this.submitEmail.bind(this);

        this.variables = [];
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
          t_body = this.state.templateBody.toString('html'),
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
          templateBody: RichTextEditor.createValueFromString(tmp.body, 'html'),
      })
    }
    deleteTemplate(tmp){
      if(confirm('Do you want to delete this template')){
        this.props.onDeleteTemplate(tmp.id).then(()=>{

        }).catch((err)=>{
          alert(err)
        })
      }
    }
    applyVariables(templateId){
      let templ = '', recipient = '';
       _.map(this.props.templates.templates, (tmp, i) =>{
        if(tmp.id === templateId){
          templ = _.clone(tmp);
        }
      });
      if(this.state.recipient.length > 0){
        this.state.usersList.map((user)=>{
          if(user.user_Id == this.state.recipient[0].user_Id){
            recipient = user;
          }
        });
      }
      this.props.templates.variable.map((variable)=>{
        if(variable.variable_type == 'user' || !_.isEmpty(variable.value)){
          templ.name = templ.name.split(variable.name).join(variable.value)    // replace multiple variables
          templ.subject = templ.subject.split(variable.name).join(variable.value)    // replace multiple variables
          templ.body = templ.body.split(variable.name).join(variable.value)    // replace multiple variables
        }
        if(variable.variable_type === 'system' || _.isEmpty(variable.value)){
          if(this.state.recipient.length > 0){
          let value;
          if(variable.name == '#date'){
            value = new Date();
            value = moment(value).format('YYYY-MM-DD');
          }else if(variable.name == '#joining_date'){
            value = recipient.dateofjoining
          }else if(variable.name == '#employee_title'){
            value = recipient.jobtitle
          }else if(variable.name == '#employee_name'){
            value = recipient.name
          }
          templ.name = templ.name.split(variable.name).join(value)    // replace multiple variables
          templ.subject = templ.subject.split(variable.name).join(value)    // replace multiple variables
          templ.body = templ.body.split(variable.name).join(value)    // replace multiple variables
          }
        }
      });
      this.setState({
        templateName: templ.name,
        templateSubject: templ.subject,
        templateBody: RichTextEditor.createValueFromString(templ.body, 'html'),
      });
    }
    forwardTemplate(tmp){
      this.setState({
          openSendMailDialog:true,
          templateId:tmp.id,
          templateName: tmp.name,
          templateSubject: tmp.subject,
          templateBody: RichTextEditor.createValueFromString(tmp.body, 'html'),
      });
      this.applyVariables(tmp.id);
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
        templateBody: RichTextEditor.createEmptyValue(),
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
      //status ? recipient.push(data) : _.pullAllBy(recipient, [data], 'user_Id');
      status ? recipient[0] = data : _.pullAllBy(recipient, [data], 'email');
      this.setState({
        recipient: recipient
      });
      this.applyVariables(this.state.templateId);
    }
    submitEmail(email){
      var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      email = email.trim();
      if(_.isEmpty(email)){
        this.setState({emailValidationError:"Empty field"});
      }else if(!email.match(pattern)){
        this.setState({emailValidationError:"Not a valid email"})
      }else{
        this.setState({emailValidationError:"",recipientEmailId:""})
        this.selectUser({user_Id:"#", name: email, email: email}, true)
      }
    }
    //-----------insertAtCaret
  //   function insertAtCaret(areaId, text) {
	// 	var txtarea = document.getElementById(areaId);
	// 	if (!txtarea) { return; }
  //
	// 	var scrollPos = txtarea.scrollTop;
	// 	var strPos = 0;
	// 	var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
	// 		"ff" : (document.selection ? "ie" : false ) );
	// 	if (br == "ie") {
	// 		txtarea.focus();
	// 		var range = document.selection.createRange();
	// 		range.moveStart ('character', -txtarea.value.length);
	// 		strPos = range.text.length;
	// 	} else if (br == "ff") {
	// 		strPos = txtarea.selectionStart;
	// 	}
  //
	// 	var front = (txtarea.value).substring(0, strPos);
	// 	var back = (txtarea.value).substring(strPos, txtarea.value.length);
	// 	txtarea.value = front + text + back;
	// 	strPos = strPos + text.length;
	// 	if (br == "ie") {
	// 		txtarea.focus();
	// 		var ieRange = document.selection.createRange();
	// 		ieRange.moveStart ('character', -txtarea.value.length);
	// 		ieRange.moveStart ('character', strPos);
	// 		ieRange.moveEnd ('character', 0);
	// 		ieRange.select();
	// 	} else if (br == "ff") {
	// 		txtarea.selectionStart = strPos;
	// 		txtarea.selectionEnd = strPos;
	// 		txtarea.focus();
	// 	}
  //
	// 	txtarea.scrollTop = scrollPos;
	// }
    // selectAll(){
    //   let recipient = this.state.recipient;
    //   _.remove(recipient)
    //   this.state.usersList.map((user)=>{
    //     recipient.push({user_Id:user.user_Id, name: user.name, email: user.work_email})
    //   });
    //   this.setState({
    //     recipient: recipient,
    //   });
    //   this.applyVariables(this.state.templateId);
    // }
    // onclearFilter(){
    //   let recipient = this.state.recipient;
    //   _.remove(recipient)
    //   this.setState({ recipient: recipient});
    //   this.applyVariables(this.state.templateId);
    // }
    onClickLabel(label, indexLabel) {
       this.selectUser(label, false);
    }
    //------editors
    handleContentChange(value) {
      this.setState({templateBody: value});
      //this.setState({templateBody:e.target.value});
    }
    closeMailPreview(){
      this.setState({
        openPreview: false,
        sentMail:{},
      });
    }

    openMailPreview(){
      let recipient = this.state.recipient,
          templateName = this.state.templateName.trim(),
          templateSubject = this.state.templateSubject.trim(),
          templateBody = this.state.templateBody.toString('html'),
          state = true,
          error = '';
          if(recipient.length === 0){
            state = false;
            error = "Please select a recipient"
          }
          if(state && _.isEmpty(templateName) || _.isEmpty(templateSubject) || _.isEmpty(templateBody)){
            state = false;
            error = "Please select a template";
          }
          if(state){
            let string = templateName.concat(" ",templateSubject," ", templateBody);
            let regx = /(?:^|\W)#(\w+)(?!\w)/g;
            let result = string.match(regx);
            if(result !== null && result.length > 0){
              state = false;
              error = "Please put all variable's value";
              result = _.uniq(result);
             this.variables = result.map((str)=>{
                 return str.substring(1);
               });
               this.setState({
                 openVarDialog: true,
               });
             }
           }
        if(state){
          let email = [{
              email_id: recipient[0].email,
              name: recipient[0].name,
              subject: templateSubject,
              body: templateBody
              }]
          this.setState({
            openPreview: true,
            sentMail:{status:state, email:email}
          })
        }else{
          $('#previewalert').fadeIn().append("<strong>Error!</strong>"+error).fadeOut(10000)
        }
    }
    sendMail(){
      this.closeMailPreview();
      // let recipient = this.state.recipient,
      //     templateName = this.state.templateName.trim(),
      //     templateSubject = this.state.templateSubject.trim(),
      //     templateBody = this.state.templateBody.toString('html'),
      //     state = true;
      //     if(recipient.length === 0){
      //       state = false;
      //       alert("Please select a recipient");
      //     }
      //     if(_.isEmpty(templateName) || _.isEmpty(templateSubject) || _.isEmpty(templateBody)){
      //       state = false;
      //       alert("Please select a template");
      //     }else{
      //         let string = templateName.concat(" ",templateSubject," ", templateBody);
      //         let regx = /(?:^|\W)#(\w+)(?!\w)/g;
      //         let result = string.match(regx);
      //         if(result !== null && result.length > 0){
      //           state = false;
      //           result = _.uniq(result);
      //          this.variables = result.map((str)=>{
      //              return str.substring(1);
      //          });
      //          this.setState({
      //           openVarDialog: true,
      //          });
      //        }else{
      //          this.setState({
      //            openPreview: true,
      //          })
      //        }
      //     }

          let sentMail = this.state.sentMail;
          if(sentMail.status){
            // let email = [{
            //     email_id: recipient[0].email,
            //     name: recipient[0].name,
            //     subject: templateSubject,
            //     body: templateBody
            //     }]
            this.props.onSendMail(sentMail.email).then(()=>{
              alert('Mail sent');
              this.handleCloseDialog();
            }).catch(()=>{
              //$('#mailsenterror').fadeIn().append("<strong>Error!</strong>"+error).fadeOut(10000)
              alert('Error mail not sent.')
            })
          }
    }
    handleClose(){
      this.setState({
        openVarDialog: false,
        pValue: [],
      });
      this.variables = [];
    }
    setVariable(){
      let pValue = this.state.pValue,
          templateName = this.state.templateName.trim(),
          templateSubject = this.state.templateSubject.trim(),
          templateBody = this.state.templateBody.toString('html');
      _.map(this.variables, (variable, i)=>{
           templateName = _.replace(templateName, variable, pValue[i]);
           templateSubject = _.replace(templateSubject, variable, pValue[i]);
           templateBody = _.replace(templateBody, variable, pValue[i]);
       });
       this.setState({
         templateName: templateName,
         templateSubject: templateSubject,
         templateBody: RichTextEditor.createValueFromString(templateBody, 'html'),
       });
       this.handleClose();
    }
    render(){
      console.log('this.state',this.state,'props',this.props);
          const actionsCreateTemplate = [
            <FlatButton label="Close" primary={true} onTouchTap={this.handleCloseDialog} style={{marginRight:5}} />,
            <RaisedButton label={_.isEmpty(this.state.templateId) ? "SAVE" : "Update"} primary={true} onClick={this.saveTemplate} />
          ];
          const actionsSendMail = [
            <FlatButton label="Close" primary={true} onTouchTap={this.handleCloseDialog} style={{marginRight:5}} />,
            <RaisedButton label={"Send"} primary={true} onClick={this.openMailPreview} />
          ];

        //------------------------------------
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
        //-----------------pending Variables
        let pendingVar = [];
        _.map(this.variables,(variable, i)=>{
          pendingVar.push(
          <div className="form-group" key={i}>
           <label>Enter value for {variable} :</label>
           <input type="text" className="form-control" onChange={(e)=>{
               let pValue = this.state.pValue;
               pValue[i] = e.target.value;
             this.setState({
                 pValue: pValue,
             });
           }}
           value={this.state.pValue[i]} />
          </div>)
        })
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
                <RichTextEditor
                   style={styles.editorStyle}
                   value={this.state.templateBody}
                   onChange={this.handleContentChange}
                 />
              </div>
              </form>
            </div>
            <div className="col-xs-3">
              <h5 style={{textAlign:'center', color:'#000'}}>System Variables</h5>
              <Divider />
                {_.map(this.props.templates.variable, (vari) => {
                  if(vari.variable_type === 'system' || vari.value == ''){
                    return (
                      <div key={vari.id}>
                        <span className="select-variable">{vari.name}</span>
                        <Divider />
                      </div>
                    )
                  }
                })
                }
                <h5 style={{textAlign:'center', color:'#000'}}>User Variables</h5>
                <Divider />
                  {_.map(this.props.templates.variable, (vari) => {
                    if(vari.variable_type == 'user' || !_.isEmpty(vari.value)){
                      return(
                        <div key={vari.id}>
                          <span className="select-variable">{vari.name}</span>
                          <Divider />
                        </div>
                      )
                    }
                   })
                  }
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
                 <Dialog
                   title={"Enter values"}
                   actions={[<FlatButton label="Close" primary={true} onTouchTap={this.handleClose} style={{marginRight:5}} />,
                             <RaisedButton label={"Set Variables"} primary={true} onClick={this.setVariable}/>]}
                   modal={false}
                   bodyStyle={{minHeight:'50vh'}}
                   contentStyle={{maxWidth:'90%',width:"50%",transform: 'translate(0px, 0px)'}}
                   open={this.state.openVarDialog}
                   onRequestClose={this.handleClose}
                   autoDetectWindowHeight={true}
                   autoScrollBodyContent={true}
                 >
                 <div>
                 <div className="col-sx-12"></div>
                    {pendingVar}
                </div>
               </Dialog>
               <Dialog
                 title={"Mail Preview"}
                 titleStyle={{padding:'5px 24px 0px',textAlign:'center',fontSize:'18px',fontWeight:'500'}}
                 actions={[<FlatButton label="Cancel" primary={true} onTouchTap={this.closeMailPreview} style={{marginRight:5}} />,
                            <RaisedButton label={"Continue"} primary={true} onClick={this.sendMail}/>]}
                 modal={false}
                 bodyStyle={{minHeight:'70vh'}}
                 contentStyle={{maxWidth:'90%',width:"50%",transform: 'translate(0px, 0px)'}}
                 open={this.state.openPreview}
                 onRequestClose={this.closeMailPreview}
                 autoDetectWindowHeight={true}
                 autoScrollBodyContent={true}
               >
               <div>
                 <div className="p-t p-b" style={{borderBottom:'1px solid gainsboro',fontWeight:'500'}} dangerouslySetInnerHTML={{__html: this.state.sentMail && this.state.sentMail.email && this.state.sentMail.email[0].subject}}></div>
                 <div className="p-t p-b" dangerouslySetInnerHTML={{__html: this.state.sentMail && this.state.sentMail.email && this.state.sentMail.email[0].body}}></div>
              </div>
             </Dialog>
                 <div className="col-xs-9" style={{borderRight:'1px solid gainsboro'}}>
                   <form className="form-inline">
                     <span className="pull-right" style={{fontSize:'13px',fontStyle:'italic',color:'#0000FF',cursor:'pointer',display:'block',width:'100%',textAlign:'right'}} onClick={()=>this.toggleDialog("FilterBack", "Filter")}>Add recipient</span>
                       <div className="dropdown">
                        <div id={"FilterBack"} className="dropdown-backdrop-custom" style={{'display':'none','opacity':0.5}} onClick={()=>this.toggleDialog("FilterBack","Filter")}></div>
                        <div id={"Filter"} className="dropdown-menu has-child has-arrow selectUser">
                              <ul className="list-unstyled pt-xs">
                              <li className="mb-sm b-b p-t p-b">
                                  {/*<div className="form-group" style={{width:'50%'}}>
                                    <input type="checkbox" id="selectAll" className="select-all" checked={this.state.recipient.length === this.state.usersList.length ? true : false} onChange={(e)=>this.selectAll()} /> Select all
                                  </div>
                                  <div className="form-group" style={{width:'50%'}}>
                                    <input type="checkbox" id="clearAll" className="clear-all" checked={this.state.recipient.length > 0 ? false : true} onChange={(e)=>this.onclearFilter()} /> Clear all
                                  </div>*/}
                                  <div className="form-group" style={{width:'100%'}}>
                                    <input type="checkbox" id="notListed" className="not-listed" checked={this.state.recipientNotFound} onChange={(e)=>this.setState({recipientNotFound:e.target.checked})} /> Recipient Not Listed
                                  </div>
                              </li>
                              {this.state.recipientNotFound ?
                              <li className="mb-sm b-b p-t p-b">
                                <div className="form-group" style={{width:'100%'}}>
                                  <label>Enter email id:</label>
                                  <input type="text"  style={{width:'100%'}} className="form-control" placeholder="enter email..." onChange={(e)=>this.setState({recipientEmailId: e.target.value})} value={this.state.recipientEmailId} />
                                  <span style={{color:'#FF0000',padding:'5px',display:'block'}}>{this.state.emailValidationError}</span>
                                  <button type="button" className="btn m-t btn-primary btn-block" onClick={()=>this.submitEmail(this.state.recipientEmailId)}>Submit</button>
                                </div>
                              </li>
                              :
                              <span>
                              <li className="mb-sm b-b p-t p-b">
                                <div className="form-group" style={{width:'100%'}}>
                                  <input type="text"  style={{width:'100%'}} className="form-control select-all" placeholder="search" onKeyUp={(e)=>this.filterList(e.target.value)} />
                                </div>
                              </li>
                                  {listChartItems}
                                </span>
                                }
                              </ul>
                          </div>
                      </div>
                    <div id="previewalert" className="alert alert-danger pull-left" style={styles.errorAlert}>
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
                         disabled={true}
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
                   <RichTextEditor
                      style={styles.editorStyle}
                      value={this.state.templateBody}
                      onChange={this.handleContentChange}
                    />
                </div>

                   </form>
                 </div>
                 <div className="col-xs-3">
                   <h5 style={{textAlign:'center', color:'#000'}}>System Variables</h5>
                   <Divider />
                     {_.map(this.props.templates.variable, (vari) => {
                       if(vari.variable_type === 'system' || vari.value == ''){
                         return (
                           <div key={vari.id}>
                             <span className="select-variable">{vari.name}</span>
                             <Divider />
                           </div>
                         )
                       }
                     })
                     }
                     <h5 style={{textAlign:'center', color:'#000'}}>User Variables</h5>
                     <Divider />
                       {_.map(this.props.templates.variable, (vari) => {
                         if(vari.variable_type == 'user' || !_.isEmpty(vari.value)){
                           return(
                             <div key={vari.id}>
                               <span className="select-variable">{vari.name}</span>
                               <Divider />
                             </div>
                           )
                         }
                        })
                       }
                 </div>
                 </Dialog>
              </div>
    		  </div>
    		)
    }
}



export default Variables
