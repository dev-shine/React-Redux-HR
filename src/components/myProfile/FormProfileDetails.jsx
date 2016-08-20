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



        holding_from : "",
        holding_till : "",
        holding_amount : "",
        reason : ""
      }
      this.handleHoldingFrom = this.handleHoldingFrom.bind( this )
      this.handleHoldingTill = this.handleHoldingTill.bind( this )
    }
    handleHoldingFrom(date){
      this.setState({
        holding_from : date
      })
    }
    handleHoldingTill(date){
      this.setState({
        holding_till : date
      })
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


      // console.log( props )
      // console.log('-----')


      // let holding_from = ""
      // let holding_till = ""
      // let holding_amount = ""
      // let reason = "" 

      //   // if( typeof props.user_latest_salary_details.Basic != 'undefined' ){
      //   //   basic = props.user_latest_salary_details.Basic
      //   // }
        

      //   this.setState({
      //     user_id : props.userid,
      //     holding_from : holding_from,
      //     holding_till : holding_till,
      //     holding_amount : holding_amount,
      //     reason : reason
      //   })
    }
      
      render(){
        let styles = _.cloneDeep(this.constructor.styles);

        let date = this.state.applicable_from

        return (
          <div>
          <div className="row no-gutter">
            <div className="col-md-12 p-r">

          <div className="item">
                <div className="item-bg">
                  <img src="../assets/images/a1.jpg" className="blur opacity-3"/>
                </div>
                <div className="p-a-md">
                  <div className="row m-t">
                    <div className="col-sm-7">
                      <a href="" className="pull-left m-r-md">
                        <span className="avatar w-96">
                          <img src="../assets/images/a1.jpg"/>
                          <i className="on b-white"></i>
                        </span>
                      </a>
                      <div className="clear m-b">
                        <h3 className="m-a-0 m-b-xs">{this.state.name}</h3>
                        <p className="text-muted"><span className="m-r">{this.state.jobtitle}</span> </p>
                        <p className="text-muted"><span className="m-r">Joining Date : {this.state.dateofjoining}</span></p>
                        
                        
                      </div>
                    </div>

                    <div className="col-sm-5">
                      <p className="text-muted"><span className="m-r">Gender : <b>{this.state.gender}</b></span></p>
                      <p className="text-muted"><span className="m-r">Date Of Birth : <b>{this.state.dob}</b></span></p>
                      <p className="text-muted"><span className="m-r">Work Email : <b>{this.state.work_email}</b></span></p>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>

            </div>

             <div className="row no-gutter">

            
            
                <div className="col-xs-6 p-r">
                  <h6 className="text-center">Personal Details</h6>
          

          <div className="form-group">
          <label>Maritial Status</label>
          <input type="text" className="form-control" ref="holding_amount" onChange={ () => this.setState({ holding_amount : this.refs.holding_amount.value }) } value={ this.state.holding_amount }/>
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





          </div>


          <div className="col-xs-6 p-r">


          
<h6 className="text-center">Bank Details</h6>

          <div className="form-group">
          <label>Bank Account Number</label>
          <input type="text" className="form-control" ref="holding_amount" onChange={ () => this.setState({ holding_amount : this.refs.holding_amount.value }) } value={ this.state.holding_amount }/>
          </div>

          <div className="form-group">
          <label>Pan Card Number</label>
          <input type="text" className="form-control" ref="holding_amount" onChange={ () => this.setState({ holding_amount : this.refs.holding_amount.value }) } value={ this.state.holding_amount }/>
          </div>

                
                </div>
                </div>

                <div className="row no-gutter">
                <div className="col-xs-12 p-r">
                <button  className="col-xs-12 md-btn md-raised indigo" onClick={ () => this.props.callAddUserHolding( this.state ) } >Add Holding</button>
                </div>
                </div>


          </div>
          )
}
}

FormProfileDetails.styles = {
  leaveDiv: {
    'marginBottom' : '10px'
  }
};



export default FormProfileDetails


