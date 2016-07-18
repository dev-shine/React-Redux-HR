import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as actions_userDaySummary from '../../actions/user/userDaySummary'
import * as _ from 'lodash'
import {notify} from '../../services/index'

import VisibleHeader from '../../containers/generic/header'
import VisibleMenu from '../../containers/generic/menu'
import VisibleLoadingIcon from '../../containers/generic/loadingIcon'

import * as actions_login from '../../actions/login/index'


class UserDaySummary extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            current_userid : '',
            current_date : '',
            form_entry_time : '',
            form_exit_time : ''
        }
        this.doUpdateDaySummary = this.doUpdateDaySummary.bind(this);
    }
    componentWillMount(){
        if( this.props.onIsAlreadyLogin() == false ){
          this.props.router.push('/');
        }else{
        }
        
        let user_id =  this.props.params.userid
        let date = this.props.params.date
        
        this.setState({
            current_userid : user_id,
            current_date : date,
        })

        this.props.onUserDaySummary( user_id, date  )
    }

    componentWillReceiveProps( props ){

        if( props.userDaySummary.status_message != ''){
            notify( props.userDaySummary.status_message );    
        }
        
        this.setState({
            form_entry_time : props.userDaySummary.entry_time,
            form_exit_time : props.userDaySummary.exit_time,
        })


        

    }
  
    doUpdateDaySummary( evt ){
        evt.preventDefault();
        this.props.onUpdateDaySummary( this.state.current_userid , this.state.current_date, this.state.form_entry_time, this.state.form_exit_time ).then( 
        (data) => {
            
        },(error) => {
            notify( error );
        })
    }
    render(){
      let styles = _.cloneDeep(this.constructor.styles);
      
        return(
        	<div >
				<VisibleMenu/>

        

  				<div id="content" className="app-content box-shadow-z0" role="main">
    				<div className="app-header white box-shadow">
						<div className="navbar">
    						<a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
      							<i className="material-icons">&#xe5d2;</i>
    						</a>
    						<div className="navbar-item pull-left h5" ng-bind="$state.current.data.title" id="pageTitle"> 
                  User Day Summary  - { this.state.current_date } ( { this.props.userDaySummary.day } )
                </div>
						</div>
    				</div>
					
    				<div ui-view className="app-body" id="view">

<div className="row"><div className="col-12"><VisibleLoadingIcon/></div></div>

<div className="padding">
    
    <div className="fullcalendar fc fc-ltr fc-unthemed">

      
      <div className="box">
        <div className="box-header">
          <h2> <span className="label label-lg success">{ this.props.userDaySummary.name } - Worked for { this.props.userDaySummary.total_working }</span> </h2>
        </div>
        <div className="box-divider m-a-0"></div>
        <div className="box-body">
          <i>*Entry / Exit time must be like - e.g 10:30 AM, 07:30 PM</i>
          <br/>
          <form role="form" onSubmit={this.doUpdateDaySummary}>

            <div className="form-group row">
              <label className="col-sm-1 form-control-label">Entry Time</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" ref="entry_time" value={ this.state.form_entry_time } onChange={ () => this.setState( { form_entry_time : this.refs.entry_time.value } ) }/>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-1 form-control-label" >Exit Time</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" ref="exit_time" value={ this.state.form_exit_time } onChange={ () => this.setState( { form_exit_time : this.refs.exit_time.value } ) }/>
              </div>
            </div>

            <div className="form-group row m-t-md">
              <div className="col-sm-offset-1 col-sm-10">
                <button type="submit" className="md-btn md-raised m-b-sm w-xs green">Update</button>
              </div>
            </div>
          </form>
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


UserDaySummary.styles = {
  height100per: {
    'minHeight' : '120px'
  }
};

function mapStateToProps( state ){
	return {
        frontend : state.frontend.toJS(),
        logged_user : state.logged_user.toJS(),
        userDaySummary : state.userDaySummary.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onUserDaySummary : ( userid, date ) => {
            return dispatch( actions_userDaySummary.getUserDaySummary( userid, date ))
        },
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onUpdateDaySummary : ( userid, date, entry_time, exit_time ) => {
            return dispatch( actions_userDaySummary.updateUserDaySummary( userid, date, entry_time, exit_time ) )
        }
    }
}

const VisibleUserDaySummary = connect(
  mapStateToProps,
  mapDispatchToProps
)( UserDaySummary )

const RouterVisibleUserDaySummary= withRouter( VisibleUserDaySummary )

export default RouterVisibleUserDaySummary