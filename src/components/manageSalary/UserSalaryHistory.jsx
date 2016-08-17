import React,{ Component } from 'react';
import { connect } from 'react-redux'
import {notify} from '../../services/index'

import LoadingIcon from '../../components/generic/LoadingIcon'


class UserSalaryHistory extends React.Component {
    constructor( props ){
    	super( props )
    }
    componentDidMount(){
      
    }
	componentWillReceiveProps( props ){

		
    }

    render(){
    	let salaryHistoryHtml = _.map( this.props.data, ( d,k ) => {
			return (
					<div className="sl-item b-info"  key={k}  onClick={ () => this.props.viewSalarySummary( d.test.id ) } style={{'cursor':"pointer"}}>
	              		<div className="sl-content">
	                		<div className="sl-date text-muted">  Applicable From  : {d.test.applicable_from}</div>
	                		<div className="sl-date text-muted"> Updated on : {d.test.last_updated_on} </div>
	                		<div>
	                  			 <b>Rs.{d.test.total_salary} </b> 
	                		</div>
	              		</div>
	            	</div>
			)
		})

      	return (
      		<div>
      			<div className="box-body">
      				<div className="streamline b-l m-l">
      					{salaryHistoryHtml}
      				</div>
      			</div>
      		</div>
      	)
    }
}

export default UserSalaryHistory





