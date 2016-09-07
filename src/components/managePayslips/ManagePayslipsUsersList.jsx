import React from 'react';
import * as _ from 'lodash'

import { CONFIG } from '../../config/index'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


class ManagePayslipsUsersList extends React.Component {
  constructor( props ){
    super( props );
    this.state = {
      'email_paylsips_ids' : [],
      'openIframe': false,
    }
    this._select_payslips_to_email = this._select_payslips_to_email.bind(this)
    this.handleOpenIframe = this.handleOpenIframe.bind( this )
    this.handleCloseIframe = this.handleCloseIframe.bind( this )
  }
  handleOpenIframe(){
    this.setState({openIframe: true});
  };

  handleCloseIframe(){
    this.setState({openIframe: false});
  };

  _select_payslips_to_email( e ){
    let existing_email_paylsips_ids = this.state.email_paylsips_ids
    let checked_payslip_id = e.target.value
    let checked_status = e.target.checked

    let new_email_paylsips_ids = existing_email_paylsips_ids

    if( checked_status == true ){
      new_email_paylsips_ids.push( checked_payslip_id )
    }else{
      _.pull( new_email_paylsips_ids, checked_payslip_id )
    }
    this.setState({
      email_paylsips_ids : new_email_paylsips_ids
    })
  }

  componentWillReceiveProps( props ){
    this.setState({
      email_paylsips_ids : []
    }) 
  }

  render(){
      let usersList =  _.map( this.props.users , ( user, keyval ) => {
      let userid = user.user_Id

      let generatedPayslipIdToEmail = ""

      let payslipGenerated = 0
      let email_to_user_status = 0
      if( typeof this.props.all_users_latest_payslip != 'undefined' && this.props.all_users_latest_payslip.length > 0 ){
        let findUser = _.find( this.props.all_users_latest_payslip, {'user_Id': userid })
        if( typeof findUser != 'undefined' ){
          payslipGenerated = 1
          if( typeof findUser.status != 'undefined' ){
            email_to_user_status = findUser.status
          }

          if( typeof findUser.id != 'undefined' && generatedPayslipIdToEmail == '' ){
            generatedPayslipIdToEmail = findUser.id
          }

          
        }
      }
      let selectedUserId = this.props.selectedUserId
      let styles = _.cloneDeep(this.constructor.styles);
      let key = parseInt( userid )
      let profileImae = user.slack_profile.image_72
      let backgroundClass = styles.cursorPointer
      if( selectedUserId == userid ){
        backgroundClass = styles.selectedUser
      }

      //---
      let payslipGeneratedHtmlClass = styles.pendingStatus
      if( payslipGenerated == 1 ){
        payslipGeneratedHtmlClass = styles.doneStatus
      }
      
      let checkbox_send_email = <input 
        type="checkbox" 
        name="send_payslip_emails" 
        value={generatedPayslipIdToEmail} 
        style={{'verticalAlign':'middle'}}
        onChange={ this._select_payslips_to_email }
      />
      let email_to_user_statusHtmlClass = styles.pendingStatus      
      if( email_to_user_status == 1 ){
        email_to_user_statusHtmlClass = styles.doneStatus
        //checkbox_send_email = ""
      }
      if( payslipGenerated == 0 ){
        // if payslip is not generated then there is no option to send email
        checkbox_send_email = "" 
      }
      //---

      return (
        <li className="list-item b-b" key={keyval} style={backgroundClass}>
          <div className="list-left" onClick={ () => this.props.onUserClick( userid ) }>
            <span className="w-40 avatar">
              <img src={profileImae} />
            </span>
          </div>
          <div className="list-body">
            <div onClick={ () => this.props.onUserClick( userid ) } > 
              <div>{user.name}</div>
              <small className="text-muted text-ellipsis">{user.jobtitle}</small>
            </div>
            
            <div  className="text-muted" style={payslipGeneratedHtmlClass}>Payslip Generated</div>
            <div className="text-muted" style={email_to_user_statusHtmlClass}>{checkbox_send_email}Email to Employee</div>
            
          </div>
        </li>
      )
    })


    let googleDriveEmailStatus = <span className="text-info">Google Drive Email - {this.props.google_drive_emailid}</span>
    if( this.props.google_drive_emailid == '' || this.props.google_drive_emailid == false ){
      googleDriveEmailStatus = <span className="text-danger">Google drive token not found. Plz do login first!!</span>
    }
    

    return (
      <div className = "row">
        <div className="col-12">


          <div>
            <b>{googleDriveEmailStatus}</b>
          </div>
          <br/>
          <RaisedButton label="Google Drive Login" onTouchTap={this.handleOpenIframe} />
          <Dialog
            title="Google authentication for drive"
            modal={false}
            open={this.state.openIframe}
            onRequestClose={this.handleCloseIframe}
            contentStyle={{'width':'80%'}}
          >
           <iframe
              ref="myIframe"
              src= {CONFIG.google_login_btn_page_url}
              style={{'width':'100%','height':'300px'}}
            >
            </iframe>
          </Dialog>
          <br/>
          <br/>
          <button 
              className="md-btn md-raised m-b-sm indigo"
              onClick={ () => ( this.props.callEmailPayslips( this.state.email_paylsips_ids ) ) }
            >Email Payslips</button>
          <div className="box">
            <ul className="list no-border p-b">
              {usersList}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

ManagePayslipsUsersList.styles = {
  cursorPointer: {
    'cursor' : 'pointer'
  },
  selectedUser : {
    'background' : '#03a9f4',
    'color' : 'white'
  },
  pendingStatus : {
    'background' : 'red',
    'color' : 'white',
    'padding' :'2px',
    'fontSize' : '12px'
  },
  doneStatus : {
    'background' : 'green',
    'color' : 'white',
    'padding' :'2px',
    'fontSize' : '12px'
  }
}

export default ManagePayslipsUsersList


