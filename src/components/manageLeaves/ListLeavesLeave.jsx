import React from 'react'
import * as _ from 'lodash'

class LeavesListLeave extends React.Component {
  constructor (props) {
    super(props)
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
    }

    let key = parseInt(this.props.keyval)

    let isSelectedDiv = 0
    let selectedDivClass = ''
    if (typeof this.props.leave.option_select !== 'undefined') {
      isSelectedDiv = this.props.leave.option_select
      if (isSelectedDiv == 1) {
        selectedDivClass = 'yellow'
      }
    }

    return (
      <div className={`list-item pointer b-l b-l-2x b-${leaveStatusColor} ${selectedDivClass}`} key={key} style={styles.leaveDiv} onClick={() => this.props.onSelectLeave(this.props.leave.id)}>
            <div className="list-left">
              <span className="w-40 avatar">
                <img src={this.props.leave.user_profile_image} className="img-circle" />
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
    'marginBottom': '10px'
  }
}

export default LeavesListLeave
