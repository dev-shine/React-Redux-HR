  import React from 'react';
  import * as _ from 'lodash'

  
  class FormUserProfileDetails extends React.Component {
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
      let user_id = ""
      let name = ""
      let jobtitle = ""
      let dateofjoining = ""
      let dob = " "
      let gender= " "
      let marital_status= " "
      let address1 = " "
      let address2 = " "
      let city = " "
      let state = " "
      let zip_postal = " "
      let country = " "
      let home_ph = " "
      let mobile_ph = " "
      let work_email = " "
      let other_email = " "



      if( typeof props.user_profile_detail.user_Id != 'undefined' &&  props.user_profile_detail.user_Id != null ){
        user_id = props.user_profile_detail.user_Id
      }
      if( typeof props.user_profile_detail.name != 'undefined' &&  props.user_profile_detail.name != null ){
        name = props.user_profile_detail.name
      }
      if( typeof props.user_profile_detail.jobtitle != 'undefined' &&  props.user_profile_detail.jobtitle != null ){
        jobtitle = props.user_profile_detail.jobtitle
      }
      if( typeof props.user_profile_detail.dateofjoining != 'undefined' &&  props.user_profile_detail.dateofjoining != null ){
        dateofjoining = props.user_profile_detail.dateofjoining
      }
      if( typeof props.user_profile_detail.dob != 'undefined' &&  props.user_profile_detail.dob != null ){
        dob = props.user_profile_detail.dob
      }
      if( typeof props.user_profile_detail.gender != 'undefined' &&  props.user_profile_detail.gender != null ){
        gender = props.user_profile_detail.gender
      }
      if( typeof props.user_profile_detail.marital_status != 'undefined' &&  props.user_profile_detail.marital_status != null ){
        marital_status = props.user_profile_detail.marital_status
      }
      if( typeof props.user_profile_detail.address1 != 'undefined' &&  props.user_profile_detail.address1 != null ){
        address1 = props.user_profile_detail.address1
      }
      if( typeof props.user_profile_detail.address2 != 'undefined' &&  props.user_profile_detail.address2 != null ){
        address2 = props.user_profile_detail.address2
      }
      if( typeof props.user_profile_detail.city != 'undefined' &&  props.user_profile_detail.city != null ){
        city = props.user_profile_detail.city
      }
      if( typeof props.user_profile_detail.state != 'undefined' &&  props.user_profile_detail.state != null ){
        state = props.user_profile_detail.state
      }
      if( typeof props.user_profile_detail.zip_postal != 'undefined' &&  props.user_profile_detail.zip_postal != null ){
        zip_postal = props.user_profile_detail.zip_postal
      }
      if( typeof props.user_profile_detail.country != 'undefined' &&  props.user_profile_detail.country != null ){
        country = props.user_profile_detail.country
      }
      if( typeof props.user_profile_detail.home_ph != 'undefined' &&  props.user_profile_detail.home_ph != null ){
        home_ph = props.user_profile_detail.home_ph
      }
      if( typeof props.user_profile_detail.mobile_ph != 'undefined' &&  props.user_profile_detail.mobile_ph != null ){
        mobile_ph = props.user_profile_detail.mobile_ph
      }
      if( typeof props.user_profile_detail.work_email != 'undefined' &&  props.user_profile_detail.work_email != null ){
        work_email = props.user_profile_detail.work_email
      }
      if( typeof props.user_profile_detail.other_email != 'undefined' &&  props.user_profile_detail.other_email != null ){
        other_email = props.user_profile_detail.other_email
      }


      this.setState({
        user_id : user_id,
        name : name,
        jobtitle : jobtitle,
        dateofjoining : dateofjoining,
        dob : dob,
        gender : gender,
        marital_status : marital_status,
        address1 : address1,
        address2 : address2,
        city : city,
        state : state,
        zip_postal : zip_postal,
        country : country,
        home_ph : home_ph,
        mobile_ph : mobile_ph,
        work_email : work_email,
        other_email : other_email,
     })
    }
      
      render(){


        return (
          <div>
                
                  <h6 className="text-center">Personal Details</h6>
                  <br/>
                  <div className="row no-gutter">
                    <div className="col-md-6">
                      Employee Id : <b>{this.state.user_id}</b>
                    </div>
                  </div>
                  <hr/>
                  <div className="row no-gutter">
                    <div className="col-md-6 p-r">
                      <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" ref="name" onChange={ () => this.setState({ name : this.refs.name.value }) } value={ this.state.name }/>
                      </div>
                    </div>
                    <div className="col-md-6">
                      
                    <div className="form-group">
                <label>Job Title</label>
                <input type="text" className="form-control" ref="jobtitle" onChange={ () => this.setState({ jobtitle : this.refs.jobtitle.value }) } value={ this.state.jobtitle }/>
              </div>

                      
                    </div>
                  </div>

                  <div className="row no-gutter">
            <div className="col-md-6 p-r">
            <div className="form-group">
                <label>Date Of Joining ( eg. 2016-12-30 )</label>

                <input type="text" className="form-control" ref="dateofjoining" onChange={ () => this.setState({ dateofjoining : this.refs.dateofjoining.value }) } value={ this.state.dateofjoining }/>
              </div>
              
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Work Email</label>
                <input type="text" className="form-control" ref="work_email" onChange={ () => this.setState({ work_email : this.refs.work_email.value }) } value={ this.state.work_email }/>
              </div>
            </div>
          </div>

           <div className="row no-gutter">
            <div className="col-md-6 p-r">

            <div className="form-group">
                        <label>Gender</label>
                          <select className="form-control" ref="gender" onChange={ () => this.setState({ gender : this.refs.gender.value }) } value={this.state.gender} >
                          <option value="">--Select gender--</option>
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
              
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Date Of Birth ( eg. 2016-12-30 )</label>
                <input type="text" className="form-control" ref="dob" onChange={ () => this.setState({ dob : this.refs.dob.value }) } value={ this.state.dob }/>
              </div>
            </div>
          </div>

          

          <div className="form-group">
          <label>Marital Status</label>

          <select className="form-control" ref="marital_status" onChange={ () => this.setState({ marital_status : this.refs.marital_status.value }) } value={this.state.marital_status} >
            <option value="">--Select marital status--</option>
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



<button  className="col-xs-12 md-btn md-raised indigo" onClick={ () => this.props.callUpdateUserProfileDetails( this.state ) } >Update Profile Details</button>

          


                </div>



          
          )
}
}


export default FormUserProfileDetails


