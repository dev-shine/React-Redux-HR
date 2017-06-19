import React from 'react'
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'
import { CONFIG } from '../../config/index'
import Menu from 'components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import TeamDetails from '../../components/attendance/TeamDetails'
import * as actions_login from 'appRedux/auth/actions/index';
import * as actions_getTeamData from '../../actions/admin/teamList'
import TeamList from '../../components/attendance/TeamList'
// import * as actions_salary from '../../actions/salary/index'

class ViewTeam extends React.Component {
  constructor (props) {
    super(props)
    this.props.onIsAlreadyLogin()
    this.state = {
      empList: [],
      all_Teams: '',
      active: 'active',
      addNewTeam: 'row',
      viewTeam: 'hidden',
      firstArrow: 'show',
      secondArrow: 'hidden'
    }
    this.openPage = this.openPage.bind(this)
  }
  componentWillMount () {
    this.props.onFetchTeam()
    this.props.onFetchUserDetails('')
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
  openPage (toDisplay) {
    if (toDisplay == 'add_new_team') {
      this.setState({
        addNewTeam: 'row',
        viewTeam: 'hidden',
        firstArrow: 'show',
        secondArrow: 'hidden'
      })
    } else {
      this.setState({
        addNewTeam: 'hidden',
        viewTeam: 'row',
        firstArrow: 'hidden',
        secondArrow: 'show'
      })
    }
  }
  render () {
    let view_team = <TeamDetails {...this.props} />
    let add_new_team = <TeamList {...this.props} />
    return (
        <div>
            <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <div className="app-header white box-shadow">
                <div className="navbar">
              <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
                 <i className="material-icons">&#xe5d2;</i>
            </a>
              <div className="navbar-item pull-left h5" id="pageTitle">
                 View Team
              </div>
          </div>
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
                    <li onClick={() => { this.openPage('add_new_team') }} className={`nav-item ${this.state.active}`}>
                      <a className="nav-link" href="" data-toggle="tab" data-target="#tab_1" aria-expanded="true">All Team</a>
                      <div className={this.state.firstArrow}><span className="arrow bottom b-accent"></span></div>
                    </li>
                    <li onClick={() => { this.openPage('view_team') }} className="nav-item" style={{'marginLeft': '20px'}}>
                      <a className="nav-link" href="" data-toggle="tab" data-target="#tab_2" aria-expanded="false">Team Details</a>
                      <div className={this.state.secondArrow}><span className="arrow bottom b-accent"></span></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="padding">
            <div className={this.state.addNewTeam}>
                {add_new_team}
            </div>
            <div className={this.state.viewTeam}>
              <div className="col-xs-12 p-t p-r b-r">
                {view_team}
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
    usersList: state.usersList.toJS(),
    employee: state.empSalaryList.toJS(),
    teamList: state.teamList.toJS()
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin())
    },
    onFetchTeam: () => {
      return dispatch(actions_getTeamData.get_all_team())
    },
    onFetchUserDetails: (selectedTeam) => {
      return dispatch(actions_getTeamData.get_team_candidate(selectedTeam))
    },
    onSaveTeam: (teams) => {
      return dispatch(actions_getTeamData.saveTeam(teams))
    }
  }
}

const VisibleViewTeam = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewTeam)

const RouterVisibleViewTeam = withRouter(VisibleViewTeam)

export default RouterVisibleViewTeam
