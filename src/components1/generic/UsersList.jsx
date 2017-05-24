import React from 'react';
import * as _ from 'lodash';
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
    let userid = user.user_Id
    let profileImae = disabledUser != undefined ? user.name.charAt(0) : user.slack_profile.image_72;
    let avatar = disabledUser != undefined ? <Avatar>{profileImae}</Avatar> : <img src={profileImae} />;
    let backgroundClass = styles.cursorPointer
    let arrow = ""
    if( selectedUserId == userid ){
      backgroundClass = styles.selectedUser
      arrow = <span className="arrow right b-blue"></span>
    }
    let param = disabledUser != undefined ? user : user.user_Id;
    return (
      <li className="list-item" key={key} onClick={() => onUserClick(param)}  style={backgroundClass}>
        {disabledUser != undefined ?
         <div>
          <div className="col-md-12">
            <div className="list-left">
              <span className="w-40 avatar">
                {avatar}
              </span>
            </div>
            <div className="list-body">
              <div>{user.name}</div>
              <small className="text-muted text-ellipsis">{user.jobtitle}</small>
              <small className="text-muted text-ellipsis"><b>Emp Id : {userid}</b></small>
            </div>
          </div>
        </div>
        :
        <div>
          <div className="list-left">
            <span className="w-40 avatar">
              {avatar}
            </span>
          </div>
          <div className="list-body">
            <div>{user.name}</div>
            <small className="text-muted text-ellipsis">{user.jobtitle}</small>
            <small className="text-muted text-ellipsis"><b>Emp Id : {userid}</b></small>
          </div>
        </div>
        }
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

export default UsersList
