import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'

import * as actions_login from '../../actions/login/index'
import * as actions_apply_leave from '../../actions/leave/applyLeave'


import UserMonthlyAttendance from '../../components/attendance/UserMonthlyAttendance'

class ApplyLeave extends React.Component {
    constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()

        this.state = {
            form_from_date : '',
            form_to_date : '',
            form_no_of_days : '',
            form_reason : '',
        }
        this.doApplyLeave = this.doApplyLeave.bind(this)
    }
    componentDidMount(){
      $('#two-inputs').dateRangePicker({
        startDate: new Date(),
        stickyMonths: true,
        autoClose: true,
        getValue: function(){
          if ($('#date-range200').val() && $('#date-range201').val() )
            return $('#date-range200').val() + ' to ' + $('#date-range201').val();
          else
            return '';
        },
        setValue: function(s,s1,s2){
          $('#date-range200').val(s1);
          $('#date-range201').val(s2);
          $("#date-range200").trigger('change');
          $("#date-range201").trigger('change');
        } 
      });
    }
    componentWillMount(){
    }
    componentWillReceiveProps( props ){
      console.log( props )
      console.log('-------')
        if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            if( props.logged_user.role == 'Admin' || props.logged_user.role == 'Guest' ){
                this.props.router.push('/home');    
            }
        }
    }
    doApplyLeave( evt ){
        evt.preventDefault();
        let from_date = $('#date-range200').val()
        let to_date = $('#date-range201').val()

        this.props.onApplyLeave( from_date, to_date, this.state.form_no_of_days, this.state.form_reason ).then( 
        (data) => {
            
        },(error) => {
            notify( error );
        })
    }
    render(){

      let status_message = ""
      if( this.props.applyLeave.status_message != '' ){
        status_message = <span className="label label-lg primary pos-rlt m-r-xs">
          <b className="arrow left b-primary"></b>{this.props.applyLeave.status_message}</span>
      }

        return(
        	<div >
				<Menu {...this.props}/>

        

  				<div id="content" className="app-content box-shadow-z0" role="main">
    				<div className="app-header white box-shadow">
						<div className="navbar">
    						<a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
      							<i className="material-icons">&#xe5d2;</i>
    						</a>
    						<div className="navbar-item pull-left h5" id="pageTitle">Apply For Leaves &nbsp;&nbsp;&nbsp; {status_message} </div>
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


          <form role="form"  onSubmit={this.doApplyLeave}>

            <span id="two-inputs">

              <div className="form-group row">
                <label  className="col-sm-2 form-control-label">From</label>
                <div className="col-sm-10">
                  <input type="text" id="date-range200" className="timepickerInput form-control" ref="from_date" onChange={ () => this.setState({ form_from_date : this.refs.from_date.value }) } value={ this.state.form_from_date } />
                </div>
              </div>
              <div className="form-group row">
                <label  className="col-sm-2 form-control-label">To</label>
                <div className="col-sm-10">
                  <input type="text" id="date-range201" className="form-control" ref="to_date" onChange={ () => this.setState({ form_to_date : this.refs.to_date.value }) } value={ this.state.form_to_date } />
                </div>
              </div>

              </span>



              <div className="form-group row">
                <label  className="col-sm-2 form-control-label">No. of days</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" ref="no_of_days" onChange={ () => this.setState({ form_no_of_days : this.refs.no_of_days.value }) } value={ this.state.form_no_of_days } />
                </div>
              </div>
              <div className="form-group row">
                <label  className="col-sm-2 form-control-label">Reason</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" ref="reason" onChange={ () => this.setState({ form_reason : this.refs.reason.value }) } value={ this.state.form_reason } />
                </div>
              </div>

            <div className="form-group row m-t-md">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn green">Apply</button>
              </div>
            </div>
          </form>



        </div>
      </div>
                  </div>

              </div>

          </div>

    </div>

        )
    }
}


ApplyLeave.styles = {
  height100per: {
    'minHeight' : '150px'
  }
};

function mapStateToProps( state ){
	return {
        frontend : state.frontend.toJS(),
        logged_user : state.logged_user.toJS(),
        applyLeave : state.applyLeave.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onApplyLeave : ( from_date, to_date, no_of_days, reason ) => {
            return dispatch( actions_apply_leave.apply_leave( from_date, to_date, no_of_days, reason  ))
        }
    }
}

const VisibleApplyLeave = connect(
  mapStateToProps,
  mapDispatchToProps
)( ApplyLeave )

const RouterVisibleApplyLeave = withRouter( VisibleApplyLeave )

export default RouterVisibleApplyLeave