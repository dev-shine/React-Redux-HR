import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as _ from 'lodash'

import * as actions_login from '../../actions/login/index'


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
      let link_my_profile = <Link to='/monthly_attendance'>My Profile</Link>
      let link_my_calendar = <Link to='/monthly_attendance'>My Calendar</Link>
      let link_attendance_summary = <Link to='/attendance_summary'>Attendance Summary</Link>
      let link_logout = <Link to='/logout'>Logout</Link>


        
    return (
      <div id="aside" className="app-aside modal fade nav-dropdown" ng-className="{'folded': app.setting.folded}">
        <div className="left navside dark dk" layout="column">
          <div className="navbar no-radius">
          <a className="navbar-brand">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
              <path d="M 4 4 L 44 4 L 44 44 Z" fill="#F5F5F5"></path>
              <path d="M 4 4 L 34 4 L 24 24 Z" fill="rgba(0,0,0,0.15)"></path>
              <path d="M 4 4 L 24 4 L 4  44 Z" fill="#f44455"></path>
            </svg>
            <img src="" alt="." className="hide"/>
            <span className="hidden-folded inline">HR</span>
          </a>
      </div>
      <div flex="" className="hide-scroll">
          <nav className="scroll nav-light">
                        <ul className="nav" ui-nav="">
             

                        <li className="hidden-folded" ui-sref-active="active">
                
                  <span className="nav-text">{link_my_profile}</span>
                
              </li>

             <li className="hidden-folded" ui-sref-active="active">
                  
                  <span className="nav-text">{link_my_calendar}</span>
                  
              </li>

              <li className="hidden-folded" ui-sref-active="active">
                  
                    <span className="nav-text">{link_attendance_summary}</span>
                  
              </li>

              <li className="hidden-folded" ui-sref-active="active">
                  
                    <span className="nav-text">{link_logout}</span>
                  
              </li>

              

              
                

              </ul>
          </nav>
      </div>



      <div flex-no-shrink="" className="b-t">
        <div className="nav-fold">
  <a href="#/app/page/profile" ui-sref="app.page.profile">
      <span className="pull-left">
        <img src="http://www.iconsfind.com/wp-content/uploads/2015/10/20151012_561baed03a54e.png" alt="..." className="w-40 img-circle"/>
      </span>
      <span className="clear hidden-folded p-x">
        <span className="block _500">{ this.props.logged_user.name}</span>
        <i><span className="block _500">{ this.props.logged_user.role}</span></i>
        <i><span className="block _500">{ this.props.logged_user.jobtitle}</span></i>
      </span>
  </a>
</div>
      </div>





      
    </div>




  </div>
           
    )

    }
}

function mapStateToProps( state ){
    return {
    logged_user : state.logged_user.toJS()
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const VisibleMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)( Menu )



export default VisibleMenu


