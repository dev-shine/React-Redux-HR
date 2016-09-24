  import React from 'react';
  import * as _ from 'lodash'

  import { DateField } from 'react-date-picker'
  import 'react-date-picker/index.css'


  class FormUserBankDetails extends React.Component {
    constructor( props ){
      super( props );
      this.state = {
        user_id : "",
        bank_account_no : "",
        bank_name : "",
        bank_address : "",
        ifsc : ""
      }
    }
    componentWillReceiveProps( props ){

      this.setState({
        bank_account_no : props.user_bank_detail.bank_account_no,
        bank_name : props.user_bank_detail.bank_name,
        bank_address : props.user_bank_detail.bank_address,
        ifsc : props.user_bank_detail.ifsc,
      })
    }
      
      render(){

        return (
          <div>
            <h6 className="text-center">Bank Details</h6>
            <br/>

            <ul className="list-group m-b">

            <li className="list-group-item">
            <div className="clear">
            <div className="_500 block">{ this.state.bank_name }</div>
            <span className="text-muted">Bank Name</span>
          </div>
        </li>
        
        <li className="list-group-item">
          <div className="clear">
            <div className="_500 block">{this.state.bank_account_no}</div>
            <span className="text-muted">Bank Account Number</span>
          </div>
        </li>

         <li className="list-group-item">
          <div className="clear">
            <div className="_500 block">{this.state.ifsc}</div>
            <span className="text-muted">IFSC Code</span>
          </div>
        </li>
       

        <li className="list-group-item">
          
          <div className="clear">
            <div className="_500 block">{ this.state.bank_address }</div>
            <span className="text-muted">Bank Address</span>
          </div>
        </li>
        
        
        
      </ul>


      </div>







            
            
        )
      }
}

export default FormUserBankDetails


