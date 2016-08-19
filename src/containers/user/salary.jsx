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

import SalaryDetails from '../../components/salary/SalaryDetails'
import SalaryHistory from '../../components/salary/SalaryHistory'

class Salary extends React.Component {
    constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()

        this.viewSalarySummary = this.viewSalarySummary.bind( this )

        this.state = {
          view_salary_id : false,
          salary_details : {},
          salary_history : []
        }
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


        if( this.state.view_salary_id == false  ){
          if( typeof props.salary.salary_history != 'undefined' && props.salary.salary_history.length > 0 ){
            let viewSalaryInfo = props.salary.salary_history[0]
            this.setState({
              'salary_details' : viewSalaryInfo,
              'salary_history' : props.salary.salary_history
            })
          }
        }
        
        
    }
    viewSalarySummary( id ){
      let new_details = this.state.salary_details
      _.forEach( this.state.salary_history, ( d, k )=> {
        if( d.test.id == id ){
          new_details = d
        }
      })
      this.setState({
        'salary_details' : new_details
      })
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
                <div className="row no-gutter">
                  <div className="col-12">
                    <LoadingIcon {...this.props}/>
                  </div>
                </div>
              </div>


					
    				<div className="app-body" id="view">

            
              <div className="padding">
                  <div className="box">
                    <div className="box-divider m-a-0"></div>
                      <div className="box-body">


                    <div className="row">
                      <div className="col-sm-8">
                        <h6>Salary Details</h6>

                        <SalaryDetails data={this.state.salary_details} />
                      </div>

                      <div className="col-sm-4">
                        <h6>Salary Revisions</h6>

                        
                        <SalaryHistory data={this.props.salary.salary_history} viewSalarySummary={this.viewSalarySummary}/>


                      </div>

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