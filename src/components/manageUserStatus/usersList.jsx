import React from 'react';
import * as _ from 'lodash'
import Avatar from 'material-ui/Avatar';

class UsersList extends React.Component {
    constructor( props ){
        super( props );
    }

    
    render(){
      let styles = _.cloneDeep(this.constructor.styles);

      let disabled_users = this.props.disabled_users

      let usersList = []
       _.map( disabled_users , ( user, keyval ) => {
        let f_char = user.name.charAt(0)
        f_char = f_char.toUpperCase();
        usersList.push (
          <li className="list-item b-t" key={user.user_Id}   >
            <div className="col-md-8">
              <div className="list-left">
                <span className="w-40 avatar">
                  <Avatar>{f_char}</Avatar>
                </span>
              </div>
              <div className="list-body">
                <div>{user.name}</div>
                <small className="text-muted text-ellipsis">{user.jobtitle}</small>
              </div>
            </div>
            <div className="col-md-4 text-right">  
                <button className="btn btn-fw btn-link" onTouchTap={()=>this.props.changeEmployeeStatus( user.user_Id, 'Enabled' )} >Enable</button>
            </div>
          </li>
         )
      })
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
}

UsersList.styles = {
  cursorPointer: {
    'cursor' : 'pointer'
  },
  selectedUser : {
    'background' : '#03a9f4',
    'color' : 'white'
  }
};
export default UsersList


