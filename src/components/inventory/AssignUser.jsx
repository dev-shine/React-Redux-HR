import React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { CONFIG } from '../../config/index'

export default class AssignUser extends React.Component {
  constructor (props) {
    super(props)
    this.props.onIsAlreadyLogin()
    this.state = {
      id: '',
      openSnackbar: false,
      user: ''
    }

    this.handleAssign = this.handleAssign.bind(this)
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0)

    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout')
    } else {
      if (props.logged_user.role === CONFIG.ADMIN || props.logged_user.role === CONFIG.HR) {

      } else {
        this.props.router.push('/home')
      }
    }
    if (props.manageDevice.status_message !== this.state.status_message) {
      this.setState({
        openSnackbar: true
      })
    } else {
      this.setState({
        openSnackbar: false
      })
    }
  }

  handleAssign (id, userId) {
    this.setState({user: userId})
    this.props.callAssign(id, userId)
  }

  render () {
    let userList = this.props.usersList.users.map((val, i) => {
      return <option key={val.id} id={i} value={val.user_Id} >{val.name}</option>
    })
    return (
          <div>
            <select className="form-control" style={{marginTop: '4%'}}
              onChange={(e) => {
                let id = e.target.value
                this.handleAssign(device.id, id)
              }}>
              <option value=''>--select user--</option>
              {userList}
            </select>
          </div>
    )
  }
      }
