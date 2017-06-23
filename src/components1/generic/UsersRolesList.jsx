import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Avatar from 'material-ui/Avatar';

const styles = { cursorPointer: {'cursor': 'pointer'} };

let UsersRolesList = ({ users, onChange }) => {
  let usersList = '';
  if (users.users_list !== undefined) {
    let data = users.users_list.data;
    let rolesName = users.roles;
    usersList = _.map(data, (user, key) => {
      let avatar = '';
      let profileImae = '';
      let backgroundClass = styles.cursorPointer;
      let userId = user.user_Id;
      let roleName = user.role_name;
      let roleLabelValue = <span className="text-success text-sm"><b>Role</b> : {roleName} {' '}<span onClick={() => { onChange(userId, '0'); }} className='glyphicon glyphicon-remove text-danger' title="Remove Role"></span></span>;
      if (roleName === null || roleName === 0) {
        roleLabelValue = <span className="text-danger text-sm"><b>Role</b> : -- </span>;
      }
      if (!_.isEmpty(user.slack_profile)) {
        profileImae = user.slack_profile.image_72;
        avatar = <img src={profileImae} />;
      } else {
        profileImae = user.name.charAt(0);
        avatar = <Avatar>{profileImae}</Avatar>;
      }
      let optionMenu = _.map(rolesName, (name, index) => {
        return (<option key={index} value={name.id} >{name.name}</option>);
      });
      let selectMenu = <select key={userId} name={userId} onChange={(e) => { onChange(userId, e.target.value); }} className="form-control"><option value="-1"> CHANGE ROLE </option>{optionMenu}</select>;
      return (
        <li className="list-item" key={key} style={backgroundClass}>
            <div className="list-left"><span className="w-40 avatar">{avatar}</span></div>
            <div className="list-body">
              <div>{user.name}</div>
              <small className="text-muted text-ellipsis">{user.jobtitle}</small>
              <span>{roleLabelValue}</span>
              <small className="text-muted text-ellipsis">{selectMenu}</small>
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

export default UsersRolesList;

UsersRolesList.PropTypes = {
  users: PropTypes.shape({
    users_list: PropTypes.Object
  }).isRequired,
  onChange: PropTypes.func.isRequired
};
