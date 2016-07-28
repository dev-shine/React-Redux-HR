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

    _getChangeStatusButtons( leaveid, status ){
      let statusList = [ "Approved", "Pending", "Rejected" , "Cancelled" ]
      
      let soptions = _.map( statusList, ( s, k  ) => {

        let leaveStatusColor = ""

        if( s == 'Approved'){
          leaveStatusColor = "green-A200"
        }else if(s == 'Pending'){
          leaveStatusColor = "blue"
        }else if( s == 'Rejected'){
          leaveStatusColor = "red-500"
        }else if( s == 'Cancelled'){
          leaveStatusColor = "red-100"
        }

        if(  s == status ){
          
        }else{
          return <div key={k}><button className={`md-btn md-raised ${leaveStatusColor}`} onClick={ () => this.props.doLeaveStatusChange( leaveid, s ) } >Mark {s}</button> <br/><br/> </div>
        }
        
      })

      return soptions

    }


    _getLastAppliedLeaves( dd ){
        return _.map( dd, ( d, k  ) => {
          return( 
            <div key={k}>
              {d.status} - {d.from_date} - {d.to_date} - {d.no_of_days} - {d.reason}
              <hr/>
            </div>
          )
        })
    }
    
    render(){


      let styles = _.cloneDeep(this.constructor.styles);

      let leaveStatusColor = ""
      if( this.props.leave.status == 'Approved'){
        leaveStatusColor = "green-A200"
      }else if( this.props.leave.status == 'Pending'){
        leaveStatusColor = "blue"
      }else if( this.props.leave.status == 'Rejected'){
        leaveStatusColor = "red-500"
      }else if( this.props.leave.status == 'Cancelled'){
        leaveStatusColor = "red-100"
      }

      let changeStatusButton = this._getChangeStatusButtons(  this.props.leave.id, this.props.leave.status )

      let status_select_box_options = this._leaveStatusSelectBoxOptions( this.props.leave.status )


      let sel_box = <select defaultValue={this.props.leave.status} ref="leavestatus" onChange={ () => this.props.doLeaveStatusChange( this.props.leave.id, this.refs.leavestatus.value ) }>{status_select_box_options}</select>


      let key = parseInt( this.props.keyval )



      let last_applied_leaves_html = this._getLastAppliedLeaves( this.props.leave.last_applied_leaves )


      let isSelectedDiv = 0;
      if( typeof this.props.leave.option_select != 'undefined' ){
        isSelectedDiv = this.props.leave.option_select
        if( isSelectedDiv == 1 ){
          leaveStatusColor = "yellow"
        }
      }

      return (

        


          <div className={`list-item pointer ${leaveStatusColor}`} key={key} style={styles.leaveDiv} onClick={ () => this.props.onSelectLeave( this.props.leave.id)}>
            <div className="list-left">
              <span className="w-40 avatar">
                <img src={this.props.leave.user_profile_image} className="img-circle"/>
              </span>
            </div>
            <div className="list-body">
              {this.props.leave.user_profile_name}
              <small className="block">
                Applied on : {this.props.leave.applied_on}
              </small>
            </div>
          </div>


	    )
    }
}

LeavesListLeave.styles = {
  leaveDiv: {
    'marginBottom' : '10px'
  }
};



export default LeavesListLeave


