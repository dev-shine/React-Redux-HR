import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'

import * as actions_login from '../../actions/login/index'
import * as actions_salary from '../../actions/salary/index'

import ViewSalary from '../../components/salary/ViewSalary'

class Salary extends React.Component {
    constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
        
    }
    componentDidMount(){
      
    }
    componentWillMount(){
      this.props.onSalaryDetails()
    }
    componentWillReceiveProps( props ){
        if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            if( props.logged_user.role == 'Admin' || props.logged_user.role == 'Guest' ){
                this.props.router.push('/home');    
            }
        }
    }
    
    render(){

        return(
        	<div >
				    <Menu {...this.props}/>

        

  				<div id="content" className="app-content box-shadow-z0" role="main">
    				<div className="app-header white box-shadow">
						<div className="navbar">
    						<a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
      							<i className="material-icons">&#xe5d2;</i>
    						</a>
    						<div className="navbar-item pull-left h5" id="pageTitle">Salary</div>
						</div>
    				</div>
					<div className="app-footer">
  						<div></div>
					</div>
    				<div className="app-body" id="view">

            <div className="row"><div className="col-12"><LoadingIcon {...this.props}/></div></div>
              <div className="padding">
                  <div className="box">
                    <div className="box-divider m-a-0"></div>
                      <div className="box-body">
                        <ViewSalary salary={ this.props.salary }/>
                    </div>
                  </div>
                  </div>
              </div>
          </div>
          </div>

        )
    }
}


Salary.styles = {
  height100per: {
    'minHeight' : '150px'
  }
};

function mapStateToProps( state ){
    return {
        frontend : state.frontend.toJS(),
        logged_user : state.logged_user.toJS(),
        salary : state.salary.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onSalaryDetails : () => {
            return dispatch( actions_salary.getSalaryDetails(  ))
        }
    }
}

const VisibleSalary = connect(
  mapStateToProps,
  mapDispatchToProps
)( Salary )

const RouterVisibleSalary = withRouter( VisibleSalary )

export default RouterVisibleSalary