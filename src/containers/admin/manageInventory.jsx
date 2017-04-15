import React from 'react'
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'

import {CONFIG} from '../../config/index'
import * as _ from 'lodash'
import {notify} from '../../services/index'

import * as actions_manageDevice from '../../actions/admin/inventory'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import Header from '../../components/generic/header'
import * as actions_login from '../../actions/login/index'

import FormAddNewInventory from '../../components/inventory/AddInventory'

class InventorySystem extends React.Component {
  constructor (props) {
    super(props)
    this.props.onIsAlreadyLogin()
    this.state = {
      firstArrow: 'show',
      secondArrow: 'hidden'
    }
    this.callAddNewMachine = this.callAddNewMachine.bind(this)
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0)

    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout')
    } else {
      if (props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.HR) {
      } else {
        this.props.router.push('/home')
      }
    }
  }

  callAddNewMachine (new_machine_details) {
    console.log('--------,')
    this.props.onAddNewMachine(new_machine_details).then((data) => {
      notify(data)
    }, (error) => {
      notify(error)
    })
  }

  render () {
    return (
        <div>
          <Menu {...this.props} />

          <div id="content" className="app-content box-shadow-z0" role="main">
            <Header pageTitle={'Inventory Management'} {...this.props} />
            <div className="app-footer">
              <div></div>
            </div>
            <div className="app-body" id="view">
              <div className="row">
                <div className="col-12">
                  <LoadingIcon {...this.props} />
                </div>
              </div>
              <div className="dker p-x">
                <div className="row">
                  <div className="col-sm-6 pull-sm-6">
                    <div className="p-y-md clearfix nav-active-primary">
                      <ul className="nav nav-pills nav-sm">
                        <li className={`nav-item ${this.state.active}`}>
                          <a className="nav-link"
                            href=""
                            data-toggle="tab"
                            data-target="#tab_1"
                            aria-expanded="true">Inventory</a>
                          <div className={this.state.firstArrow}><span className="arrow bottom b-accent"></span></div>
                        </li>
                        <li className="nav-item" style={{'marginLeft': '20px'}}>
                          <a className="nav-link" href=""
                            data-toggle="tab" data-target="#tab_2"
                            aria-expanded="false">Inventory Details</a>
                          <div className={this.state.secondArrow}><span className="arrow bottom b-accent"></span></div>
                        </li>
                      </ul>

                    </div>
                  </div>
                  <div className="col-md-offset-10" style={{marginTop: '2%'}}>
                  <FormAddNewInventory callAddNewMachine={this.callAddNewMachine} {...this.props}></FormAddNewInventory>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
  }

function mapStateToProps (state) {
  return {
    frontend: state.frontend.toJS(),
    logged_user: state.logged_user.toJS(),
    policy_documents: state.policyDocuments.toJS(),
    manageDevice: state.manageDevice.toJS()
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin())
    },
    onAddNewMachine: (new_machine_details) => {
      return dispatch(actions_manageDevice.addNewMachine(new_machine_details))
    }
  }
}

const VisibleInvetorySystem = connect(mapStateToProps, mapDispatchToProps)(InventorySystem)

const RouterVisibleInventorySystem = withRouter(VisibleInvetorySystem)

export default RouterVisibleInventorySystem
