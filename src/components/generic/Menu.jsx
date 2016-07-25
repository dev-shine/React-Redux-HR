import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as _ from 'lodash'

import * as actions_login from '../../actions/login/index'

import LoggedUserInfo from '../../components/menu/LoggedUserInfo'


const styles = {
  headerMain : {
    background : '#3EA8F5'
  },
  textWhite : {
    color : 'white'
  }
};

//module.exports = menu;

class Menu extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            role : props.logged_user.role,
        }
    }
    render(){
      let link_users_list = <Link to='/home'>Users</Link>
      let link_my_calendar = <Link to='/monthly_attendance'>My Calendar</Link>
      let link_attendance_summary = <Link to='/attendance_summary'>Attendance Summary</Link>
      let link_logout = <Link to='/logout'>Logout</Link>

      let link_manage_working_hours= <Link to='/manage_working_hours'>Manage Working Hours</Link>

      let link_holidays= <Link to='/holidays'>Holidays</Link>


      let links_to_show = <ul className="nav" >
        <li className="hidden-folded" ><span className="nav-text">{link_my_calendar}</span></li>
        <li className="hidden-folded" ><span className="nav-text">{link_holidays}</span></li>
        <li className="hidden-folded" ><span className="nav-text">{link_logout}</span></li>
      </ul>

      if( this.props.logged_user.role == 'Admin' || this.props.logged_user.role == 'Guest' ){
          links_to_show = <ul className="nav" >
            <li className="hidden-folded" ><span className="nav-text">{link_users_list}</span></li>
            <li className="hidden-folded" ><span className="nav-text">{link_manage_working_hours}</span></li>
            <li className="hidden-folded" ><span className="nav-text">{link_holidays}</span></li>
            <li className="hidden-folded" ><span className="nav-text">{link_logout}</span></li>
          </ul>                          
      }


        
    return (
      <div id="aside" className="app-aside modal fade nav-dropdown" >
        <div className="left navside dark dk">
          <div className="navbar no-radius">
          <a className="navbar-brand">
            <svg viewBox="0 0 48 48" width="24" height="24">
              <path d="M 4 4 L 44 4 L 44 44 Z" fill="#F5F5F5"></path>
              <path d="M 4 4 L 34 4 L 24 24 Z" fill="rgba(0,0,0,0.15)"></path>
              <path d="M 4 4 L 24 4 L 4  44 Z" fill="#f44455"></path>
            </svg>
            <img src="" alt="." className="hide"/>
            <span className="hidden-folded inline">HR</span>
          </a>
      </div>
      <div className="hide-scroll">
          <nav className="scroll nav-light">
              {links_to_show}
          </nav>
      </div>

      <LoggedUserInfo {...this.props}/>






      
    </div>




  </div>
           
    )

    }
}

export default Menu

