import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Avatar from 'material-ui/Avatar';

const styles = {
  cursorPointer: {'cursor': 'pointer'},
  selectedUser: {'background': '#03a9f4', 'color': 'white'}
};

const UsersRolesList = ({}) => {

  return (
    <div className="row">
      <div className="col-12">
        <div className="box">
          <ul className="list no-border p-b">

          </ul>
        </div>
      </div>
    </div>
  );
};

UsersRolesList.PropTypes = {
  users: PropTypes.array.isRequired,
  selectedUserId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onUserClick: PropTypes.func.isRequired,
  disabledUser: PropTypes.bool
};

export default UsersRolesList;
