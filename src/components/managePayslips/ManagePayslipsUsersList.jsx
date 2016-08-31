import React from 'react';
import * as _ from 'lodash'

class ManagePayslipsUsersList extends React.Component {
  constructor( props ){
    super( props );
  }
  render(){
    let usersList =  _.map( this.props.users , ( user, keyval ) => {
      let userid = user.user_Id

      let payslipGenerated = 0
      let email_to_user_status = 0
      if( typeof this.props.all_users_latest_payslip != 'undefined' && this.props.all_users_latest_payslip.length > 0 ){
        let findUser = _.find( this.props.all_users_latest_payslip, {'user_Id': userid })
        if( typeof findUser != 'undefined' ){
          payslipGenerated = 1
          if( typeof findUser.status != 'undefined' ){
            email_to_user_status = findUser.status
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
      
      let checkbox_send_email = <input type="checkbox" name="send_payslip_emails" value={userid} style={{'verticalAlign':'middle'}}/>
      let email_to_user_statusHtmlClass = styles.pendingStatus      
      if( email_to_user_status == 1 ){
        email_to_user_statusHtmlClass = styles.doneStatus
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
            <div>
              <small className="text-muted text-ellipsis" style={payslipGeneratedHtmlClass}>Payslip</small>
              <small className="text-muted text-ellipsis" style={email_to_user_statusHtmlClass}>{checkbox_send_email}Email to Employee</small>
            </div>
          </div>
        </li>
      )
    })
    
    return (
      <div className = "row">
        <div className="col-12">
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
    'padding' :'2px'
  },
  doneStatus : {
    'background' : 'green',
    'color' : 'white',
    'padding' :'2px'
  }
}

export default ManagePayslipsUsersList


