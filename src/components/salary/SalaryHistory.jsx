import React,{ Component } from 'react';
import { connect } from 'react-redux'
import {notify} from '../../services/index'

import LoadingIcon from '../../components/generic/LoadingIcon'


class SalaryHistory extends React.Component {
    constructor( props ){
      super( props );
    }
    componentDidMount(){
      
    }
	componentWillReceiveProps( props ){

    }

    _getSalaryHistoryHtml( dd ){

    	let salaryHistory = _.map( dd, ( d,k ) => {
			return (
					<div className="sl-item b-info"  key={k}>
	              		<div className="sl-content">
	                		<div className="sl-date text-muted">  Applicable From  : {d.test.applicable_from}</div>
	                		<div className="sl-date text-muted">  <b>Rs.{d.test.total_salary} </b> </div>
	                		<div>
	                  			Updated on : {d.test.last_updated_on} 
	                		</div>
	              		</div>
	            	</div>
			)
		})

	      return (

	             <div className="box-body">
	            <div className="streamline b-l m-l">
	                {salaryHistory}
	                
	            </div>
	        </div>

	        )
    }

    render(){
    	let leavesHistoryHtml = this._getSalaryHistoryHtml( this.props.data )
      return (
      	<div>{leavesHistoryHtml}</div>

      )
    }
}

export default SalaryHistory





