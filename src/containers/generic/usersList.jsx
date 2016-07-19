import React from 'react';
import * as _ from 'lodash'
import VisibleUser from '../../components/usersList/user'

class UsersList extends React.Component {
    constructor( props ){
        super( props );
    }
    render(){
      let usersList =  _.map( this.props.users , ( user, keyval ) => {
        return (
          <VisibleUser user={user} key={keyval} {...this.props}/>
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

const VisibleUsersList = UsersList

export default VisibleUsersList


