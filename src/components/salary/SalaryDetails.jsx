import React,{ Component } from 'react';
import { connect } from 'react-redux'
import {notify} from '../../services/index'

import LoadingIcon from '../../components/generic/LoadingIcon'


class SalaryDetails extends React.Component {
    constructor( props ){
      super( props );
    }
    componentDidMount(){
      
    }
	componentWillReceiveProps( props ){
		
		

    }
    render(){
    	let F_total_salary = ""
    	let F_leaves_allocated = ""
    	let F_applicable_from = ""
    	if( typeof typeof this.props.data != 'undefined' && typeof this.props.data.test != 'undefined' ){
    		F_total_salary = this.props.data.test.total_salary
    		F_leaves_allocated = this.props.data.test.leaves_allocated
    		F_applicable_from = this.props.data.test.applicable_from
    	}

    	
    	return (
    		<div>



    			<div className="row">
				    <div className="col-xs-4 col-sm-4">
				          <div className="box p-a">
				            <div className="pull-left m-r">
				              <span className="w-48 rounded  accent">
				                <i className="material-icons"></i>
				              </span>
				            </div>
				            <div className="clear">
				              <h4 className="m-a-0 text-lg _300">
				              {F_total_salary} <span className="text-sm"> </span></h4>
				              <small className="text-muted"> Total Salary  </small>
				            </div>
				          </div>
				      </div>
				      <div className="col-xs-4 col-sm-4">
				          <div className="box p-a">
				            <div className="pull-left m-r">
				              <span className="w-48 rounded primary">
				                <i className="material-icons"></i>
				              </span>
				            </div>
				            <div className="clear">
				              <h4 className="m-a-0 text-lg _300">
				              {F_leaves_allocated}<span className="text-sm"></span></h4>
				              <small className="text-muted">Leaves Allocated</small>
				            </div>
				          </div>
				      </div>
				      <div className="col-xs-44 col-sm-4">
				          <div className="box p-a">
				            <div className="pull-left m-r">
				              <span className="w-48 rounded warn">
				                <i className="material-icons"></i>
				              </span>
				            </div>
				            <div className="clear">
				              <h4 className="m-a-0 text-lg _300">
				              {F_applicable_from} <span className="text-sm"></span></h4>
				              <small className="text-muted">Applicable From</small>
				            </div>
				          </div>
				      </div>
				  </div>

				  <hr/>





	      		<div className="row">
				    <div className="col-xs-6 col-sm-4">
				        <div className="box p-a">
							<div className="clear">
				            	<h5 className="m-a-0 _500"> { this.props.data.Basic }<span className="text-sm"> </span></h5>
				              	<small className="text-muted"> Basic  </small>
				            </div>
				        </div>
				    </div>
				    <div className="col-xs-6 col-sm-4">
				        <div className="box p-a">
							<div className="clear">
				            	<h5 className="m-a-0 _500"> { this.props.data.EPF }<span className="text-sm"> </span></h5>
				              	<small className="text-muted"> EPF  </small>
				            </div>
				        </div>
				    </div>
				</div>

				<div className="row">
				    <div className="col-xs-6 col-sm-4">
				        <div className="box p-a">
							<div className="clear">
				            	<h5 className="m-a-0 _500"> { this.props.data.HRA }<span className="text-sm"> </span></h5>
				              	<small className="text-muted"> HRA  </small>
				            </div>
				        </div>
				    </div>
				    <div className="col-xs-6 col-sm-4">
				        <div className="box p-a">
							<div className="clear">
				            	<h5 className="m-a-0 _500"> { this.props.data.Loan }<span className="text-sm"> </span></h5>
				              	<small className="text-muted"> Loan  </small>
				            </div>
				        </div>
				    </div>
				</div>

				<div className="row">
				    <div className="col-xs-6 col-sm-4">
				        <div className="box p-a">
							<div className="clear">
				            	<h5 className="m-a-0 _500"> { this.props.data.Conveyance }<span className="text-sm"> </span></h5>
				              	<small className="text-muted"> Conveyance  </small>
				            </div>
				        </div>
				    </div>
				    <div className="col-xs-6 col-sm-4">
				        <div className="box p-a">
							<div className="clear">
				            	<h5 className="m-a-0 _500"> { this.props.data.Advance }<span className="text-sm"> </span></h5>
				              	<small className="text-muted"> Advance  </small>
				            </div>
				        </div>
				    </div>
				</div>

				<div className="row">
				    <div className="col-xs-6 col-sm-4">
				        <div className="box p-a">
							<div className="clear">
				            	<h5 className="m-a-0 _500"> { this.props.data.Medical_Allowance }<span className="text-sm"> </span></h5>
				              	<small className="text-muted"> Medical Allowance  </small>
				            </div>
				        </div>
				    </div>
				    <div className="col-xs-6 col-sm-4">
				        <div className="box p-a">
							<div className="clear">
				            	<h5 className="m-a-0 _500"> { this.props.data.Misc_Deductions }<span className="text-sm"> </span></h5>
				              	<small className="text-muted"> Misc Deductions  </small>
				            </div>
				        </div>
				    </div>
				</div>

				<div className="row">
				    <div className="col-xs-6 col-sm-4">
				        <div className="box p-a">
							<div className="clear">
				            	<h5 className="m-a-0 _500"> { this.props.data.Special_Allowance }<span className="text-sm"> </span></h5>
				              	<small className="text-muted"> Special Allowance </small>
				            </div>
				        </div>
				    </div>
				    <div className="col-xs-6 col-sm-4">
				        <div className="box p-a">
							<div className="clear">
				            	<h5 className="m-a-0 _500"> { this.props.data.TDS }<span className="text-sm"> </span></h5>
				              	<small className="text-muted"> TDS </small>
				            </div>
				        </div>
				    </div>
				</div>

				<div className="row">
				    <div className="col-xs-6 col-sm-4">
				        <div className="box p-a">
							<div className="clear">
				            	<h5 className="m-a-0 _500"> { this.props.data.Arrears }<span className="text-sm"> </span></h5>
				              	<small className="text-muted"> Arrears </small>
				            </div>
				        </div>
				    </div>
				</div>
					 
			</div>
      	)
    }
}

export default SalaryDetails





