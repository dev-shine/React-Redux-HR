import React from 'react'
import * as _ from 'lodash'

class LeavesListLeave extends React.Component {
  constructor (props) {
		  super(props)
  }
  _leaveStatusSelectBoxOptions (status) {
    let statusList = [ 'Approved', 'Pending', 'Rejected', 'Cancelled' ]

    let soptions = _.map(statusList, (s, k) => {
      let selected = ''
      if (s == status) {
        selected = 'selected'
      }
      return <option value={s} key={k} >{s}</option>
    })

    return soptions
  }

  _getChangeStatusButtons (leaveid, status) {
    let statusList = [ 'Approved', 'Pending', 'Rejected', 'Cancelled' ]

    let soptions = _.map(statusList, (s, k) => {
      let leaveStatusColor = ''

      if (s == 'Approved') {
        leaveStatusColor = 'green-A200'
      } else if (s == 'Pending') {
        leaveStatusColor = 'blue'
      } else if (s == 'Rejected') {
        leaveStatusColor = 'red-500'
      } else if (s == 'Cancelled') {
        leaveStatusColor = 'red-100'
      }

      if (s == status) {

      } else {
        return <div key={k}><button className={`md-btn md-raised ${leaveStatusColor}`} onClick={() => this.props.doLeaveStatusChange(leaveid, s)} >Mark {s}</button> <br /><br /> </div>
      }
    })

    return soptions
  }

  _getLastAppliedLeaves (dd) {
    return _.map(dd, (d, k) => {
      return (
            <div key={k}>
              {d.status} - {d.from_date} - {d.to_date} - {d.no_of_days} - {d.reason}
              <hr />
            </div>
      )
    })
  }

  render () {
    let styles = _.cloneDeep(this.constructor.styles)

    let leaveStatusColor = ''
    if (this.props.leave.status == 'Approved') {
      leaveStatusColor = 'green-A200'
    } else if (this.props.leave.status == 'Pending') {
      leaveStatusColor = 'blue'
    } else if (this.props.leave.status == 'Rejected') {
      leaveStatusColor = 'red-500'
    } else if (this.props.leave.status == 'Cancelled') {
      leaveStatusColor = 'red-100'
    }

    let changeStatusButton = this._getChangeStatusButtons(this.props.leave.id, this.props.leave.status)

    let status_select_box_options = this._leaveStatusSelectBoxOptions(this.props.leave.status)

    let sel_box = <select defaultValue={this.props.leave.status} ref="leavestatus" onChange={() => this.props.doLeaveStatusChange(this.props.leave.id, this.refs.leavestatus.value)}>{status_select_box_options}</select>

    let key = parseInt(this.props.keyval)

    let last_applied_leaves_html = this._getLastAppliedLeaves(this.props.leave.last_applied_leaves)

    return (

            <div className={`row p-a ${leaveStatusColor}`} key={key} style={styles.leaveDiv}>
              <div className="col-md-2">
                  <h5>{this.props.leave.status}</h5>
                  <hr />
                  {changeStatusButton}
              </div>
              <div className="col-md-2">

                  <div className="nav-fold">

                        <span className="pull-left">
                          <img src={this.props.leave.user_profile_image} className="w-40 img-circle" />
                        </span>
                        <span className="clear hidden-folded p-x">
                          <span className="block _500">{this.props.leave.user_profile_name}</span>
                          <small className="block text-muted">{this.props.leave.user_profile_jobtitle}</small>
                        </span>

                  </div>

              </div>
              <div className="col-md-1">
                <h6>{this.props.leave.applied_on}</h6>
              </div>
              <div className="col-md-3">
                <h6>{this.props.leave.from_date} TO {this.props.leave.to_date}</h6>
                <br />
                <h6>No. of days - {this.props.leave.no_of_days}</h6>
                <br />
                <h6>Reason - {this.props.leave.reason}</h6>
              </div>

              <div className="col-md-4">
                {last_applied_leaves_html}
              </div>

            </div>

	    )
  }
}

LeavesListLeave.styles = {
  leaveDiv: {
    'marginBottom': '10px'
  }
}

export default LeavesListLeave
