import React, {PropTypes} from 'react';
import * as _ from 'lodash'
import ClientListItem from './ClientListItem'

class ClientsList extends React.Component {
    constructor( props ){
        super( props );
    }
    render(){

      let clientsList =  _.map( this.props.clients , ( client, keyval ) => {
        return (
          <ClientListItem client={client} key={keyval} selectedClientId={this.props.selectedClientId} {...this.props}/>
        )
      })
      return (
        <div className = "row">
          <div className="col-12">
            <div className="box">
              <ul className="list no-border p-b">
                {clientsList}
              </ul>
            </div>
          </div>
        </div>
      )
    }
}

ClientsList.propTypes = {
    clients: React.PropTypes.array.isRequired,
    selectedClientId : React.PropTypes.any.isRequired,
};

export default ClientsList


