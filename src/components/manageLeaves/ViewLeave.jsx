import React from 'react';
import * as _ from 'lodash'

class ViewLeave extends React.Component {
    constructor( props ){
		  super( props );
      this.state = {
        messagetouser : "",
        notifyMsg:'Document Required Notification Sent',
        document_required:true,
        user_token:''
      }
      this.handleNotify = this.handleNotify.bind(this);
      this.handleComment = this.handleComment.bind(this);
      this.handleExtraDay = this.handleExtraDay.bind(this);
    }

    componentWillReceiveProps(props){
      let token = localStorage.getItem('hr_logged_user')
      this.setState({user_token: token})
      this.setState ({ messagetouser : "" })
    }
    handleExtraDay(day) {
      this.props.onAddExtraDay(this.props.listLeaves.selectedLeave.id , this.state.user_token , day)
    }
    handleNotify() {
      this.props.onDocRequired(this.props.listLeaves.selectedLeave.id , "1" , '')
    }
    handleComment(){
      this.props.onDocRequired(this.props.listLeaves.selectedLeave.id , '' , this.state.messagetouser)
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
            {
              this.props.listLeaves.selectedLeave.leave_type != '' ?
              <div>Leave Type - <i><b>{this.props.listLeaves.selectedLeave.leave_type}</b></i></div> : null
            }
            {
              this.props.listLeaves.selectedLeave.late_reason != '' ?
              <div>Reason For Late Applying - <i><b>{this.props.listLeaves.selectedLeave.late_reason}</b></i></div> : null
            }
            {
              this.props.listLeaves.selectedLeave.extra_day != '0' ?
              <div>Extra Day Added - <i><b>{this.props.listLeaves.selectedLeave.extra_day}</b></i></div> : null
            }
            {/* {
              this.state.document_required ?
              <div className="text-left" style={{marginTop:'10px'}}>
                <button className="md-btn md-raised indigo" onTouchTap={this.handleNotify}>Notify Document Required</button>
              </div>:<div className="text-left" style={{marginTop:'10px',border:"1px dotted green",width:"56%",padding:"11px 5px 5px",background:'#c8e4c8',color:'#0d7b2a',borderRadius:"7px"}}>
                  <label style={{fontWeight:"500"}}>{this.state.notifyMsg}</label>
                  </div>
            } */}
            {
              this.props.listLeaves.selectedLeave.doc_require === '0' ?
              <div className="text-left" style={{marginTop:'10px'}}>
                <button className="md-btn md-raised indigo" onTouchTap={this.handleNotify}>Notify Document Required</button>
              </div> : null
            }
            {
              this.props.listLeaves.selectedLeave.doc_link === '' ?
              <div className="text-left" style={{marginTop:'10px',border:"1px dotted green",width:"56%",padding:"11px 5px 5px",background:'#c8e4c8',color:'#0d7b2a',borderRadius:"7px"}}>
                  <label style={{fontWeight:"500"}}>{this.state.notifyMsg}</label>
                </div>:
                <form method="get" action= {this.props.listLeaves.selectedLeave.doc_link  }>
                <div className=" text-left" style={{marginTop:'10px'}}>
                <button className="md-btn md-raised indigo" >View Document</button>
              </div>
            </form>
            }
              <div className='row m-0'>
                <div className='col-sm-3 p-0 pt-5'>
                  <div className=" text-left" style={{marginTop:'10px'}}>
                    <button className="md-btn md-raised indigo" onTouchTap={()=>{this.handleExtraDay("0.5")}}>Add Half Day</button>
                  </div>
                </div>
                <div className='col-sm-3 p-0'>
                  <div className="text-left" style={{marginTop:'10px'}}>
                    <button className="md-btn md-raised indigo" onTouchTap={()=>{this.handleExtraDay("1")}}>Add Full Day</button>
                  </div>
                </div>
                {
                  this.props.listLeaves.selectedLeave.extra_day == "0" ? null :
                  <div className='col-sm-4 p-0'>
                    <div className="text-left" style={{marginTop:'10px'}}>
                      <button className="md-btn md-raised red" onTouchTap={()=>{this.handleExtraDay("0")}}>Remove Extra Day</button>
                    </div>
                  </div>
                }
              </div>
            {/* {
              this.props.listLeaves.selectedLeave.doc_require === '0' ? null : <div className="text-left" style={{marginTop:'10px',border:"1px dotted green",width:"56%",padding:"11px 5px 5px",background:'#c8e4c8',color:'#0d7b2a',borderRadius:"7px"}}>
                  <label style={{fontWeight:"500"}}>{this.state.notifyMsg}</label>
                  </div>
            } */}
            <br/>
            {
              this.props.listLeaves.selectedLeave.comment === '' ?
              <div>
              <b>Enter message for employee</b><br/>
              <input type="text" className="md-input" onChange={ (e) => this.setState({ messagetouser : e.target.value}) } value={ this.state.messagetouser }/>
              <div className="text-right" style={{marginTop:'10px'}}>
                <button className="md-btn md-raised indigo" onTouchTap={this.handleComment}>Comment</button>
              </div>
            </div> : <div>
            <b>Comment</b><br/>
            <div className="text-left" style={{marginTop:'10px',border:"1px dotted #514eff",width:"56%",padding:"11px 5px 5px",background:'rgb(191, 195, 245)',color:'rgb(64, 78, 247)',borderRadius:"7px"}}>
               <label style={{fontWeight:"500"}}>{this.props.listLeaves.selectedLeave.comment}</label>
               </div>
            </div>
            }
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
