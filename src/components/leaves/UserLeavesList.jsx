import React from 'react'
import * as _ from 'lodash'
import LeavesListLeave from './LeavesListLeave'
import { Calendar } from 'react-date-range'
import {notify} from '../../services/index'
import {CONFIG} from '../../config/index'
import Dialog from 'material-ui/Dialog'

class UserLeavesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      id: '',
      user_token: ''
    }
    this.cancelLeave = this.cancelLeave.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.callUpdateDocuments = this.callUpdateDocuments.bind(this)
  }

  componentWillReceiveProps (props) {
    let token = localStorage.getItem('hr_logged_user')
    this.setState({user_token: token})
  }

  cancelLeave (userId, from_date) {
    this.props.onCancelLeave(userId, from_date).then((data) => {
      notify(data)
    }).catch((err) => {
      notify(err)
    })
  }

  handleOpen (id) {
    this.setState({open: true, id: id})
  }
  handleClose () {
    this.setState({open: false})
  }

  _getLeavesList (d) {
    return _.map(d, (leave, keyval) => {
      let s = leave.status
      let f_char = s.charAt(0)
      let leaveStatusColor = ''
      if (s == 'Approved') {
        leaveStatusColor = 'green-A200'
      } else if (s == 'Pending') {
        leaveStatusColor = 'blue'
      } else if (s == 'Rejected') {
        leaveStatusColor = 'red-500'
      } else if (s == 'Cancelled Request') {
        leaveStatusColor = 'red-100'
      }

      return (
            <div key={keyval} className={`list-item b-l b-l-2x b-${leaveStatusColor}`}>
            <div className="list-left">
              <span className={`w-40 avatar ${leaveStatusColor}`}>
                {f_char}
              </span>
            </div>
            <div className="list-body">
              <div className="pull-right text-muted text-xs">
              </div>
              <div>
                <span className="_500">Status : {leave.status}</span>
              </div>

              <div>
                <span className="_500">Apply on : {leave.applied_on}</span>
              </div>
              <div>
                <span className="_500">From {leave.from_date} to {leave.to_date}</span>
                &nbsp;&nbsp;&nbsp;<span className="label cyan">{leave.no_of_days} Day</span>
                <span className="label cyan" style={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => this.cancelLeave(leave.user_Id, leave.from_date)}>Cancel</span>
              </div>
              <div className="text-ellipsis text-muted text-sm">Reason : {leave.reason}</div>
              {
                leave.leave_type != ''
                ? <div className="text-ellipsis text-muted text-sm">Leave Type : {leave.leave_type}</div>
                : null
              }
              {
                leave.late_reason != ''
                ? <div className="text-ellipsis text-muted text-sm">Reason For Late Applying : {leave.late_reason}</div>
                : null
              }
              {
                leave.comment != ''
                ? <div className="text-ellipsis text-muted text-sm">comment : {leave.comment}</div>
                : null
              }
            </div>
            {
              leave.doc_require != '0'
              ? <div className='row m-0'>
                <div className='col-sm-3 p-0 pt-5'>
                  <div className="text-right" style={{marginTop: '10px'}}>
                    <button className="btn info" onTouchTap={() => { this.handleOpen(leave.id) }}>Upload Leave Documents</button>
                  </div>
                </div>
                <div className='col-sm-3 p-0'>
                  {
                    leave.doc_link == '' ? null : <form method="get" target="_blank" action={leave.doc_link}>
                      <div className=" text-left" style={{marginTop: '10px'}}>
                        <button className="md-btn md-raised indigo" >View Document</button>
                      </div>
                    </form>
                  }
                </div>
              </div>
            : null
            }
          </div>
      )
    })
  }

  callUpdateDocuments (e) {
    let docProof = this.refs.file.value
    let stop = false
    if (docProof == '') {
      stop = true
      notify('Please select a file')
    }
    if (stop) {
      e.preventDefault()
    }
  }

  render () {
    let page_url = window.location.href
    let leavesList = this._getLeavesList(this.props.userLeaves.leaves)
    return (
        <div className="row">
          <Dialog title="Upload Leave Document" modal={false} open={this.state.open} onRequestClose={this.handleClose} contentStyle={{
            width: '45%',
            maxWidth: 'none'
          }} autoScrollBodyContent>
            <div>
              <form action={CONFIG.upload_leave_url} method="POST" encType="multipart/form-data">
                <input type="hidden" name="token" value={this.state.user_token} />
                <input type="hidden" name="leaveid" value={this.state.id} />
                <input type="hidden" name="page_url" value={page_url} />
                <div className="form-group">
                  <label>Attachment
                  </label>
                  <input type="file" className="form-control" ref="file" name="docProof" />
                </div>
                <div className="form-group">
                  <input type="submit" name="submit" value="Upload" className="col-xs-12 md-btn md-raised indigo" onClick={(e) => {
                    this.callUpdateDocuments(e)
                  }} />
                </div>
              </form>
            </div>
          </Dialog>
            <div className="row-col">
              <div className="list white">
                {leavesList}
              </div>
            </div>
        </div>
    )
  }
}

export default UserLeavesList
