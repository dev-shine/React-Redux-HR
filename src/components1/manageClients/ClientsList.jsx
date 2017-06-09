import React from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import ClientListItem from './ClientListItem';

const ClientsList = ({clients, selectedClientId, onClientClick}) => {
  let clientsList = _.map(clients, (client, keyval) => {
    return (
      <ClientListItem client={client} key={keyval} selectedClientId={selectedClientId} onClientClick={onClientClick} />
    );
  });
  return (
    <div className="row">
      <div className="col-12">
        <div className="box">
          <ul className="list no-border p-b">
            {clientsList}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClientsList;

ClientsList.PropTypes = {
  clients: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  selectedClientId: PropTypes.string.isRequired,
  onClientClick: PropTypes.func.isRequired,
  clientsList: PropTypes.object.isRequired,
  keyval: PropTypes.number
};
