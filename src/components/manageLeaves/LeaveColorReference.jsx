import React from 'react'
import * as _ from 'lodash'
import {CONFIG} from '../../config/index'

class LeaveColorReference extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    let styles = _.cloneDeep(this.constructor.styles)

    return (
        <div className="">

        <div className="">
          {this.props.logged_user.role == CONFIG.ADMIN
            ? <div className="row no-gutter m-b text-xs l-h-1x">

             <div className="col-xs-3 text-center" style={styles.cursor}
               onClick={() => this.props.onApplyFilter('Pending by HR')} >
                <div className="p-a blue">
                  <h4></h4>
                  <div className="text-u-c _600 text-sm" >Not Approved By HR</div>
                </div>
              </div>

              <div className="col-xs-3 text-center" style={styles.cursor}
                onClick={() => this.props.onApplyFilter('HR')} >
                <div className="p-a yellow-A200">
                  <h4></h4>
                  <div className=" text-u-c _600 text-sm" >Approved By HR</div>
                </div>
              </div>

              <div className="col-xs-3 text-center" style={styles.cursor}
                onClick={() => this.props.onApplyFilter('Approved')} >
                <div className="p-a green-A200">
                  <h4></h4>
                  <div className=" text-u-c _600 text-sm" >Approved</div>
                </div>
              </div>

              <div className="col-xs-3 text-center" style={styles.cursor}
                onClick={() => this.props.onApplyFilter('Rejected')} >
                <div className="p-a red-500">
                  <h4></h4>
                  <div className="text-u-c _600 text-sm" >Rejected</div>
                </div>
              </div>
            </div>
            : <div className="row no-gutter m-b text-xs l-h-1x">

              <div className="col-xs-4 text-center" style={styles.cursor}
                onClick={() => this.props.onApplyFilter('Pending')} >
                <div className="p-a blue">
                  <h4></h4>
                  <div className="text-u-c _600 text-sm" >Pending Leave Requests</div>
                </div>
              </div>

            </div>
          }
        </div>
      </div>
	   )
  }
}

LeaveColorReference.styles = {
  cursor: {
    'cursor': 'Pointer'
  }
}

export default LeaveColorReference
