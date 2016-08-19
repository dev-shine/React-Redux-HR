import React,{ Component } from 'react';
import { connect } from 'react-redux'
import {notify} from '../../services/index'

import LoadingIcon from '../../components/generic/LoadingIcon'


class UserHoldingHistory extends React.Component {
    constructor( props ){
    	super( props )
    }
    componentDidMount(){
      
    }
	componentWillReceiveProps( props ){

		
    }

    render(){
    	let holdingHistoryHtml = _.map( this.props.data, ( d,k ) => {

      return (
					<div className="sl-item b-info"  key={k} >
	              		<div className="sl-content">
	                		<div className="sl-date text-muted">  Holding Amount  : <b>Rs.{d.holding_amt}</b></div>
                      <div className="sl-date text-muted">  Start : {d.holding_start_date}</div>
	                		<div className="sl-date text-muted">  End : {d.holding_end_date} </div>
                      <div className="sl-date text-muted">  Reason : {d.reason} </div>
                      <div className="sl-date text-muted">  Updated on : {d.last_updated_on} </div>
	              		</div>
	            	</div>
			)
		})

      	return (
      		<div>
      			<div className="box-body">
      				<div className="streamline b-l m-l">
      					{holdingHistoryHtml}
      				</div>
      			</div>
      		</div>
      	)
    }
}

export default UserHoldingHistory





