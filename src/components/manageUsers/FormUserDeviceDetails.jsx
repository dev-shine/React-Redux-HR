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
      let machine = this.props.user_assign_machine
      let machineData = machine.map((val, i) => {
        return (<tr key={i}>
              <td>{val.machine_type}</td>
              <td>{val.machine_name}</td>
              <td>{val.mac_address}</td>
              <td>{val.assign_date}</td>
            </tr>)
      })
      return (
          <div>
            <h6 className="text-center">Asssigned Device Details</h6>
            <br />
            <ul className="list-group m-b">
            <li className="list-group-item">
            <div className="clear">
              {
                machineData.length > 0
                ? <table key='' style={{fontSize: '9px'}}className="table table-striped table-hover">
                  <thead>
                    <tr>
                    </tr>
                    <tr>
                      <th>Device Type</th>
                      <th>Name</th>
                      <th>Mac Address</th>
                      <th>Assign Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {machineData}
                  </tbody>
                </table>
                : <h6>{'Device Not Asssigned'}</h6>
              }
          </div>
        </li>
      </ul>
  </div>

      )
    }
}
