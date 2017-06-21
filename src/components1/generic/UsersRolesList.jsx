import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Avatar from 'material-ui/Avatar';

const styles = {
  cursorPointer: {'cursor': 'pointer'}
};

const UsersRolesList = ({ users, onChange }) => {
  let usersList = '';
  if(users.users_list !== undefined ){
    let data = users.users_list.data;
    let roleName = users.roles;
    usersList = _.map(data, (user, key) => {
      let avatar = '';
      let profileImae = '';
      let backgroundClass = styles.cursorPointer;
      let userId = user.user_Id;
      let roleId = user.role_id;
      let select = 0;
      if( roleId !== undefined && roleId !== null ){ select = roleId; }
      else { select = 0; }
      if (!_.isEmpty(user.slack_profile)) {
        profileImae = user.slack_profile.image_72;
        avatar = <img src={profileImae} />;
      } else {
        profileImae = user.name.charAt(0);
        avatar = <Avatar>{profileImae}</Avatar>;
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
  }
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
  users: PropTypes.shape({
    users_list: PropTypes.Object
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default UsersRolesList;
