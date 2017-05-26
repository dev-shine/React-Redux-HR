import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Avatar from 'material-ui/Avatar';

const styles = {
  cursorPointer: {
    'cursor': 'pointer'
  },
  selectedUser: {
    'background': '#03a9f4',
    'color': 'white'
  }
};

const UsersList = ({users, selectedUserId, onUserClick, disabledUser}) => {
  let usersList =  _.map(users, (user, key) => {
    let avatar = '';
    let param = '';
    let arrow = '';
    let profileImae = '';
    let backgroundClass = styles.cursorPointer;
    if (selectedUserId == user.user_Id) {
      backgroundClass = styles.selectedUser;
      arrow = <span className="arrow right b-blue"></span>;
    }
    if (_.isUndefined(disabledUser)) {
      profileImae = user.slack_profile.image_72;
      avatar = <img src={profileImae} />;
      param = user.user_Id;
    } else {
      profileImae = user.name.charAt(0);
      avatar = <Avatar>{profileImae}</Avatar>;
      param = user;
    }
    return (
      <li className="list-item" key={key} onClick={() => onUserClick(param)}  style={backgroundClass}>
        <div>
          <div className="list-left">
            <span className="w-40 avatar">
              {avatar}
            </span>
          </div>
          <div className="list-body">
            <div>{user.name}</div>
            <small className="text-muted text-ellipsis">{user.jobtitle}</small>
            <small className="text-muted text-ellipsis"><b>Emp Id : {user.user_Id}</b></small>
          </div>
        </div>
        {arrow}
      </li>
    )
  });
  return (
    <div className = "row">
      <div className="col-12">
        <div className="box">
          <ul className="list no-border p-b">
            {usersList}
          </ul>
        </div>
      </div>
    </div>
  )
}

UsersList.PropTypes = {
  users: PropTypes.array.isRequired,
  selectedUserId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onUserClick: PropTypes.func.isRequired,
  disabledUser: PropTypes.bool
}

export default UsersList;
