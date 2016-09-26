import React, {PropTypes} from 'react'

class ClientListItem extends React.Component {
    constructor( props ){
		super( props );
    }
    render(){
      let selectedClientId = this.props.selectedClientId
      let styles = _.cloneDeep(this.constructor.styles);
		  
      let clientId = this.props.client.id

      let clientName = this.props.client.name
      let fc_name = clientName.charAt(0)
    	
      let backgroundClass = styles.cursorPointer
    	if( selectedClientId == clientId ){
    		backgroundClass = styles.selectedUser
    	}
      
    	return (
	     	<li className="list-item" onClick={ () => this.props.onClientClick( clientId ) }  style={backgroundClass}>
	            <div className="list-left">
	              <span className="w-40 r-2x _600 text-lg accent">
                    {fc_name}
                </span>
	            </div>
	            <div className="list-body">
	              <div>{this.props.client.name}</div>
	              <small className="text-muted text-ellipsis"></small>
	            </div>
	      	</li>
	    )
    }
}

ClientListItem.styles = {
  cursorPointer: {
    'cursor' : 'pointer'
  },
  selectedUser : {
  	'background' : '#03a9f4',
  	'color' : 'white'
  }
};

ClientListItem.propTypes = {
    client: React.PropTypes.object.isRequired,
    selectedClientId : React.PropTypes.string.isRequired,
};

export default ClientListItem


