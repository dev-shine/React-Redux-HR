import React, {PropTypes} from 'react'

class FormClientDetails extends React.Component {
    constructor( props ){
		  super( props );
      this.state = {
        client_id : "",
        client_name : "",
        client_address : ""
      }
    }
    componentWillReceiveProps( props ){
      this.setState({
        client_name : props.clienDetails.name,
        client_address : props.clienDetails.address
      })
    }
    render(){
      
      return (
        <div>
	     	   <h6 className="text-center">Client Details</h6>
          <br/>

          <div className="form-group">
                <label>Client Name</label>
                <input type="text" className="form-control" value={ this.state.client_name } ref="name" onChange={ () => this.setState({ client_name : this.refs.client_name.value }) } />
              </div>

              <div className="form-group">
                <label>Client Address</label>
                <textarea className="form-control" rows="4" ref="client_address" onChange={ () => this.setState({ client_address : this.refs.client_address.value }) } value={ this.state.client_address }/>
              </div>
          
        </div>
	    )
    }
}

// FormClientDetails.propTypes = {
//     client: React.PropTypes.object.isRequired,
//     selectedClientId : React.PropTypes.string.isRequired,
// };

export default FormClientDetails


