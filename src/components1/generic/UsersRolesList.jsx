import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Avatar from 'material-ui/Avatar';

const styles = {
  cursorPointer: {'cursor': 'pointer'}
};

const UsersRolesList = ({users, onChange, disabledUser, roleName, assignedRole}) => {
  let usersList = _.map(users, (user, key) => {
    let avatar = '';
    let param = '';
    let profileImae = '';
    let backgroundClass = styles.cursorPointer;
    let userId = user.user_Id;
    let preSetUserId = _.result(_.find(assignedRole, function(obj) {  return obj.user_Id == userId; }), 'user_Id');
    let select = null;
    if( preSetUserId == userId ){ select = _.result(_.find(assignedRole, function(obj) {  return obj.user_Id == userId; }), 'role_Id'); }
    if (_.isUndefined(disabledUser)) {
      profileImae = user.slack_profile.image_72;
      avatar = <img src={profileImae} />;
      param = user.user_Id;
    } else {
      profileImae = user.name.charAt(0);
      avatar = <Avatar>{profileImae}</Avatar>;
      param = user;
    }
    let optionMenu = _.map(roleName, (name, index) => {
      return( <option key={index} value={name.id} >{name.name}</option> );
    });
    let selectMenu = <select name={userId} onChange={(e) => {onChange(userId, e.target.value);}} defaultValue={select} ><option key={userId} value="0"> SELECT ROLE </option>{optionMenu}</select>;
    return (
      <li className="list-item" key={key} style={backgroundClass}>
          <div className="list-left"><span className="w-40 avatar">{avatar}</span></div>
          <div className="list-body">
            <div>{user.name}</div>
            <small className="text-muted text-ellipsis">{user.jobtitle}</small>
            <small className="text-muted text-ellipsis"><b>Role : </b>{selectMenu}</small>
          </div>
      </li>
    );
  });
  return (
    <div className="row">
      <div className="col-12">
        <div className="box">
          <ul className="list no-border p-b">
            {usersList}
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
  disabledUser: PropTypes.bool
};

export default UsersRolesList;
