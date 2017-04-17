import React from 'react'
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as _ from 'lodash'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import Paper from 'material-ui/Paper'
var moment = require('moment')
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import { CONFIG } from '../../config/index'

class InventoryList extends React.Component {
  constructor (props) {
    super(props)
    this.props.onIsAlreadyLogin()
    this.state = {
    }
  }
  componentWillMount () {
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0)

    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout')
    } else {
      if (props.logged_user.role == CONFIG.ADMIN) {

      } else {
        this.props.router.push('/home')
      }
    }
  }
  componentDidUpdate () {
  }
  render () {
    let rows = []
    _.map(this.props.manageDevice.device, (device, i) => {
      rows.push(<tr key={i}><td>{device.id}</td>
            <td>{device.machine_type}</td>
            <td>{device.machine_name}</td>
            <td>{device.operating_system}</td>
            <td>{moment(device.date_of_purchase).format('Do MMMM YYYY')}</td>
            <td>{device.mac_address}</td>
            <td>{device.serial_number}</td>
            <td>{device.status}</td>
            <td>{device.comments}</td>
            <td><i className="fa fa-lg fa-pencil-square-o" style={{color: '#3f51b5'}} aria-hidden="true"></i></td>
          </tr>)
    })
    return (
        <div className="app-body" id="view">
          <div className="col-xs-12 col-sm-12" style={{ 'float': 'right'}}>
            <div className="row">
              <div className="col-xs-12">
                <div className='row'>
                  <div className='col-xs-12'>
                    <div style={{'marginTop': '8%'}}>
                      <Paper zDepth={1} style={{marginBottom: '10px'}} >
                        <table className="table table-striped table-hover">
                          <thead>
                            <tr>
                                <h4 style={{float: 'left',
                                  'marginLeft': '0%',
                                  'paddingTop': '1%',
                                  'paddingBottom': '1%',
                                  'paddingLeft': '5%',
                                  'paddingRight': '3%',
                                  'fontWeight': 'bold'}}>
                                  Device List
                                </h4>
                            </tr>
                            <tr>
                              <th>ID</th>
                              <th>Device Type</th>
                              <th>Name</th>
                              <th>OS</th>
                              <th>Date Of Purchase</th>
                              <th>Mac Address</th>
                              <th>Serial No</th>
                              <th>Status</th>
                              <th>Comments</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows}
                          </tbody>
                        </table>
                        </Paper>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
  }
}

export default InventoryList
