import React from 'react';
import * as _ from 'lodash'
import User from '../../components/usersList/User'

class UsersList extends React.Component {
    constructor( props ){
        super( props );
    }
    render(){
      let usersList =  _.map( this.props.users , ( user, keyval ) => {
        return (
          <User user={user} key={keyval} {...this.props}/>
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

export default UsersList


