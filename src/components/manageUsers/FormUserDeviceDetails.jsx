  import React from 'react'
  import * as _ from 'lodash'
  import 'react-date-picker/index.css'

  export default class FormUserDeviceDetails extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        machine_type: '',
        machine_name: '',
        mac_address: '',
        assign_date: ''
      }
    }
    componentWillReceiveProps (props) {
      if (props.user_assign_machine != null) {
        this.setState({
          machine_type: props.user_assign_machine.machine_type,
          machine_name: props.user_assign_machine.machine_name,
          mac_address: props.user_assign_machine.mac_address,
          assign_date: props.user_assign_machine.assign_date
        })
      } else {
        this.setState({
          machine_type: '',
          machine_name: '',
          mac_address: '',
          assign_date: ''
        })
      }
    }

    render () {
      return (
          <div>
            <h6 className="text-center">Asssigned Device Details</h6>
            <br />

            <ul className="list-group m-b">

            <li className="list-group-item">
            <div className="clear">
            <div className="_500 block">{this.state.machine_type}</div>
            <span className="text-muted">Device Type</span>
          </div>
        </li>

        <li className="list-group-item">
          <div className="clear">
            <div className="_500 block">{this.state.machine_name}</div>
            <span className="text-muted">Device Name</span>
          </div>
        </li>

         <li className="list-group-item">
          <div className="clear">
            <div className="_500 block">{this.state.mac_address}</div>
            <span className="text-muted">Mac Adress</span>
          </div>
        </li>

        <li className="list-group-item">

          <div className="clear">
            <div className="_500 block">{this.state.assign_date}</div>
            <span className="text-muted">Assign Date</span>
          </div>
        </li>

      </ul>

      </div>

      )
    }
}
