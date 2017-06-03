import React from 'react'
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'
import {CONFIG} from '../../config/index'
import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import Header from '../../components/generic/header'
import FormAddNewInventory from '../../components/inventory/AddInventory'
import InventoryList from '../../components/attendance/InventoryList'

class ShowUsers extends React.Component {
  constructor (props) {
    super(props)
  }
  render(){
    return(
      <h2>userlist</h2>
    )
  }
const VisibleShowUsers = connect(mapStateToProps, mapDispatchToProps)(ShowUsers)

const RouterVisibleShowUsers = withRouter(VisibleShowUsers)

export default RouterVisibleShowUsers
