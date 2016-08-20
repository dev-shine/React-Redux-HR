  import React from 'react';
  import * as _ from 'lodash'

  import { DateField } from 'react-date-picker'
  import 'react-date-picker/index.css'


  class FormProfileDetails extends React.Component {
    constructor( props ){
      super( props );
      this.state = {
        user_id : "",
        name : "",
        jobtitle : "",
        dateofjoining : "",
        dob : "",
        gender : "",
        marital_status : "",
        address1 : "",
        address2 : "",
        city : "",
        state : "",
        zip_postal : "",
        country : "",
        home_ph : "",
        mobile_ph : "",
        work_email : "",
        other_email : "",
      }
    }
    componentWillReceiveProps( props ){
      this.setState({
        name : props.user_profile_detail.name,
        jobtitle : props.user_profile_detail.jobtitle,
        dateofjoining : props.user_profile_detail.dateofjoining,
        dob : props.user_profile_detail.dob,
        gender : props.user_profile_detail.gender,
        marital_status : props.user_profile_detail.marital_status,
        address1 : props.user_profile_detail.address1,
        address2 : props.user_profile_detail.address2,
        city : props.user_profile_detail.city,
        state : props.user_profile_detail.state,
        zip_postal : props.user_profile_detail.zip_postal,
        country : props.user_profile_detail.country,
        home_ph : props.user_profile_detail.home_ph,
        mobile_ph : props.user_profile_detail.mobile_ph,
        work_email : props.user_profile_detail.work_email,
        other_email : props.user_profile_detail.other_email,
     })
    }
      
      render(){

        return (
          <div>
                
                  <h6 className="text-center">Personal Details</h6>
          

          <div className="form-group">
          <label>Marital Status</label>

          <select className="form-control" ref="marital_status" onChange={ () => this.setState({ marital_status : this.refs.marital_status.value }) } value={this.state.marital_status} >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Other">Other</option>
          </select>
          
          </div>
          
          <div className="row no-gutter">
            <div className="col-md-6 p-r">
              <div className="form-group">
                <label>Address Street 1</label>
                <input type="text" className="form-control" ref="address1" onChange={ () => this.setState({ address1 : this.refs.address1.value }) } value={ this.state.address1 }/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Address Street 2</label>
                <input type="text" className="form-control" ref="address2" onChange={ () => this.setState({ address2 : this.refs.address2.value }) } value={ this.state.address2 }/>
              </div>
            </div>
          </div>

          <div className="row no-gutter">
            <div className="col-md-6 p-r">
              <div className="form-group">
                <label>City</label>
                <input type="text" className="form-control" ref="city" onChange={ () => this.setState({ city : this.refs.city.value }) } value={ this.state.city }/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>State</label>
                <input type="text" className="form-control" ref="state" onChange={ () => this.setState({ state : this.refs.state.value }) } value={ this.state.state }/>
              </div>
            </div>
          </div>

           <div className="row no-gutter">
            <div className="col-md-6 p-r">
              <div className="form-group">
                <label>Zip Code</label>
                <input type="text" className="form-control" ref="zip_postal" onChange={ () => this.setState({ zip_postal : this.refs.zip_postal.value }) } value={ this.state.zip_postal }/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Country</label>
                <input type="text" className="form-control" ref="country" onChange={ () => this.setState({ country : this.refs.country.value }) } value={ this.state.country }/>
              </div>
            </div>
          </div>

          <div className="row no-gutter">
            <div className="col-md-6 p-r">
              <div className="form-group">
                <label>Home Phone</label>
                <input type="text" className="form-control" ref="home_ph" onChange={ () => this.setState({ home_ph : this.refs.home_ph.value }) } value={ this.state.home_ph }/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Mobile</label>
                <input type="text" className="form-control" ref="mobile_ph" onChange={ () => this.setState({ mobile_ph : this.refs.mobile_ph.value }) } value={ this.state.mobile_ph }/>
              </div>
            </div>
          </div>

          <div className="form-group">
          <label>Other Email</label>
          <input type="text" className="form-control" ref="other_email" onChange={ () => this.setState({ other_email : this.refs.other_email.value }) } value={ this.state.other_email }/>
          </div>



<button  className="col-xs-12 md-btn md-raised indigo" onClick={ () => this.props.callUpdateProfileDetails( this.state ) } >Update Profile Details</button>

          


                </div>



          
          )
}
}


export default FormProfileDetails


