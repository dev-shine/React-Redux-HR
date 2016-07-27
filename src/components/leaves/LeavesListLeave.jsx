import React from 'react';
import * as _ from 'lodash'

class LeavesListLeave extends React.Component {
    constructor( props ){
		  super( props );
      
    }
    _leaveStatusSelectBoxOptions( status ){
      let statusList = [ "Approved", "Pending", "Rejected" , "Cancelled" ]
      
      let soptions = _.map( statusList, ( s, k  ) => {
        let selected = ""
        if(  s == status ){
          selected  = "selected"
        }
        return <option value={s} key={k}  >{s}</option>
      })

      return soptions

    }
    
    render(){
      let leaveStatusColor = ""
      if( this.props.leave.status == 'Approved'){
        leaveStatusColor = "primary"
      }else if( this.props.leave.status == 'Pending'){
        leaveStatusColor = "blue"
      }else if( this.props.leave.status == 'Rejected'){
        leaveStatusColor = "red-500"
      }else if( this.props.leave.status == 'Cancelled'){
        leaveStatusColor = "red-100"
      }

      let status_select_box_options = this._leaveStatusSelectBoxOptions( this.props.leave.status )


      let sel_box = <select defaultValue={this.props.leave.status} ref="leavestatus" onChange={ () => this.props.doLeaveStatusChange( this.props.leave.id, this.refs.leavestatus.value ) }>{status_select_box_options}</select>


let key = parseInt( this.props.keyval )

      return (



        <tr key={key}>
              <td >{sel_box}</td>
              <td className={leaveStatusColor}>{this.props.leave.username}</td>
              <td className={leaveStatusColor}>{this.props.leave.applied_on}</td>
              <td className={leaveStatusColor}>{this.props.leave.from_date}</td>
              <td className={leaveStatusColor}>{this.props.leave.to_date}</td>
              <td className={leaveStatusColor}>{this.props.leave.no_of_days}</td>
              <td className={leaveStatusColor}>{this.props.leave.reason}</td>
              
            </tr>
	     	
	    )
    }
}



export default LeavesListLeave


