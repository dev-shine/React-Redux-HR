import React from 'react';
import { connect } from 'react-redux'
import * as actions_userDaySummary from '../../actions/user/userDaySummary'
import {notify} from '../../services/index'

import LoadingIcon from '../../components/generic/LoadingIcon'

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
    componentWillReceiveProps( props ){

      //console.log('************')
      //console.log( props )

      let user_id =  props.userid
      let date = props.date
      
      this.setState({
          current_userid : props.userDaySummary.userid,
          current_date : props.date,
          form_entry_time : props.userDaySummary.entry_time,
          form_exit_time : props.userDaySummary.exit_time,
      })

      //this.props.onUserDaySummary( user_id, date  )

    }

    doUpdateDaySummary( evt ){
        evt.preventDefault();
        this.props.onUpdateDaySummary( this.state.current_userid, this.state.current_date, this.state.form_entry_time, this.state.form_exit_time ).then( 
        (data) => {
            
        },(error) => {
            notify( error );
        })
    }


    render(){
      return (
        <div id="modalUserDaySummary" className="modal" data-backdrop="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <LoadingIcon {...this.props}/>
                <div className="row">
                  <div className="col-xs-11">
                    <h5 className="modal-title">User Day Summary - { this.props.userDaySummary.name } - { this.props.date }</h5>
                  </div>
                  <div className="col-xs-1">
                    <button className="btn btn-icon white"  data-dismiss="modal"><i className="fa fa-remove"></i></button>
                  </div>
                </div>
              </div>
              <div className="modal-body p-lg">




                <i>*Entry / Exit time must be like - e.g 10:30 AM, 07:30 PM</i>
                <br/>
          <br/>
          <form role="form" onSubmit={ this.doUpdateDaySummary }>

            <div className="form-group row">
              <label className="col-sm-2 form-control-label">Entry Time</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" ref="entry_time" value={ this.state.form_entry_time } onChange={ () => this.setState( { form_entry_time : this.refs.entry_time.value } ) }/>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 form-control-label" >Exit Time</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" ref="exit_time" value={ this.state.form_exit_time } onChange={ () => this.setState( { form_exit_time : this.refs.exit_time.value } ) }/>
              </div>
            </div>

            <div className="form-group row m-t-md">
              <div className="col-sm-10">
                <button type="submit" className="md-btn md-raised m-b-sm w-xs green">Update</button>
              </div>
            </div>
          </form>



                
              </div>
            </div>
          </div>
        </div>        
      )
    }
}

export default UserDaySummary





