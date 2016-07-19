import React from 'react';
import { connect } from 'react-redux'
import * as actions_userDaySummary from '../../actions/user/userDaySummary'

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

      console.log('************')
      console.log( props )

      let user_id =  props.userid
      let date = props.date
      
      this.setState({
          current_userid : props.userDaySummary.entry_time,
          current_date : props.userDaySummary.exit_time,
      })

      //this.props.onUserDaySummary( user_id, date  )

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
      return (
        <div id="modalUserDaySummary" className="modal" data-backdrop="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Day Summary </h5>
              </div>
              <div className="modal-body text-center p-lg">




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
              <div className="modal-footer">
                <button type="button" className="btn dark-white p-x-md" data-dismiss="modal">No</button>
                <button type="button" className="btn danger p-x-md" data-dismiss="modal">Yes</button>
              </div>
            </div>
          </div>
        </div>        
      )
    }
}

const VisibleUserDaySummary = UserDaySummary

export default VisibleUserDaySummary





