import React,{ Component } from 'react';
import { connect } from 'react-redux'
import {notify} from '../../services/index'

import LoadingIcon from '../../components/generic/LoadingIcon'

import SalaryDetails from './SalaryDetails'
import SalaryHistory from './SalaryHistory'

class ViewSalary extends React.Component {
    constructor( props ){
      super( props );
    }
    componentDidMount(){
      
    }
	componentWillReceiveProps( props ){
		
		
    }
    render(){
      return (
      	<div className="row">
            <div className="col-sm-6">
              <h6>Salary Details</h6>

              <SalaryDetails data={this.props.salary.salary_details} />
            </div>

            <div className="col-sm-6">
              <h6>Salary Revisions</h6>

              
              <SalaryHistory data={this.props.salary.salary_history} />


            </div>

           </div>

      )
    }
}

export default ViewSalary





