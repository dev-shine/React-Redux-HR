import React from 'react';
import * as _ from 'lodash'

class ViewLeave extends React.Component {
    constructor( props ){
		  super( props );
      this.state = {
        messagetouser : ""
      }
      
    }



    changeStatus( leaveid, newstatus ){
      this.props.doLeaveStatusChange( leaveid, newstatus, this.state.messagetouser )
    }

   
    _getChangeStatusButtons( leaveid, status ){
      let statusList = [ "Approved", "Pending", "Rejected" ]
      
      let soptions = _.map( statusList, ( s, k  ) => {

        let leaveStatusColor = ""

        if( s == status ){

        }else if( s == 'Approved'){
          return <button key={k} className="md-btn md-raised indigo" onClick={ () => this.changeStatus( leaveid, s ) } >Approve</button>
        }else if(s == 'Pending'){
          return <button  key={k} className="md-btn md-raised blue" onClick={ () => this.changeStatus( leaveid, s ) } >Mark Pending</button>
        }else if( s == 'Rejected'){
          return <button key={k} className="md-btn md-flat m-b-sm text-danger" onClick={ () => this.changeStatus( leaveid, s ) }>Reject</button>
        }
        
      })

      return soptions

    }


    _getLastAppliedLeaves( dd ){

      let prev_leaves = _.map( dd, ( d, k  ) => {
          
          return( 
               <div className="sl-item b-info"  key={k}>
                  <div className="sl-content">
                    <div className="sl-date text-muted">  Applied On  : {d.applied_on}</div>
                    <div className="sl-date text-muted">  {d.from_date} to {d.to_date} / No of Days : {d.no_of_days}</div>
                    <div>
                      {d.status} - {d.reason}
                    </div>
                  </div>
                </div>
          )
        })

      return (

             <div className="box-body">
            <div className="streamline b-l m-l">
                {prev_leaves}
                
            </div>
        </div>

        )
    }
    componentWillReceiveProps(){
      this.setState ({ messagetouser : "" })
    }
    
    render(){

      let styles = _.cloneDeep(this.constructor.styles);

      let changeStatusButton = this._getChangeStatusButtons(  this.props.listLeaves.selectedLeave.id, this.props.listLeaves.selectedLeave.status )

      let key = parseInt( this.props.keyval )


      //previoud leaves
      let last_applied_leaves = this.props.listLeaves.selectedLeave.last_applied_leaves
      let last_applied_leaves_html = ""
      if( typeof last_applied_leaves != 'undefined' && last_applied_leaves.length > 0 ){
        let aa  = this._getLastAppliedLeaves( this.props.listLeaves.selectedLeave.last_applied_leaves )
        last_applied_leaves_html = <div><hr/><h5>Leave history</h5>{aa}</div>

          
      }

      

      return (
          <div className="item">
    <div className="item-bg">
      
    </div>
    <div className="p-a-md">
      <div className="row m-t">
        <div className="col-sm-4">
          <a href="" className="pull-left m-r-md">
            <span className="avatar w-96">
              <img src={this.props.listLeaves.selectedLeave.user_profile_image}/>
            </span>
          </a>
          <div className="clear m-b">
            <h6 className="m-a-0 m-b-xs">{this.props.listLeaves.selectedLeave.user_profile_name}</h6>
            <div>{this.props.listLeaves.selectedLeave.user_profile_jobtitle}</div>
          </div>
        </div>
        <div className="col-sm-8">
            <div>Status - <i><b>{this.props.listLeaves.selectedLeave.status}</b>                                                                                                                    </i></div>
            <div>Applied On <i><b>{this.props.listLeaves.selectedLeave.applied_on}</b></i></div>
            <div><b>{this.props.listLeaves.selectedLeave.from_date} To {this.props.listLeaves.selectedLeave.to_date}</b></div>
            <div>No. of Days - <i><b>{this.props.listLeaves.selectedLeave.no_of_days}</b></i></div>
            {this.props.listLeaves.selectedLeave.day_status == ""?"":<div>Leave apply for - <i><b>{this.props.listLeaves.selectedLeave.day_status == "1"?"First Half":"Second Half"}</b></i></div>}
            <div>Reason - <i><b>{this.props.listLeaves.selectedLeave.reason}</b></i></div>
            <br/>

            <b>Enter message for employee</b><br/>
            <input type="text" className="md-input" ref="messagetouser" onChange={ () => this.setState({ messagetouser : this.refs.messagetouser.value }) } value={ this.state.messagetouser }/>
            <br/>
            <br/>

            {changeStatusButton}
            {last_applied_leaves_html}
        </div>
      </div>
    </div>
  </div>
         
	    )
    }
}

ViewLeave.styles = {
  leaveDiv: {
    'marginBottom' : '10px'
  }
};



export default ViewLeave


