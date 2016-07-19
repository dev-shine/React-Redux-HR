import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as _ from 'lodash'

import * as actions_login from '../../actions/login/index'


class UsersList extends React.Component {
    constructor( props ){
        super( props );
    }
    _getUsersListHtml( styles, users ){
        return _.map( users, ( user, key ) => {
        let userid = user.user_Id
        return (
                  <li className="list-item" key={key} onClick={ () => this.props.onUserClick( userid ) } style={styles.cursorPointer}>
                      
                        <div className="list-left">
                          <span className="w-40 avatar">
                            <img src="../assets/images/a4.jpg" alt="..."/>
                            <i className="on b-white bottom"></i>
                            </span>
                        </div>
                        <div className="list-body">
                          <div>{user.name}</div>
                          <small className="text-muted text-ellipsis">{user.jobtitle}</small>
                        </div>
                      

                  </li>
        )
      })
    }

    render(){

      let styles = _.cloneDeep(this.constructor.styles);

      let usersList = this._getUsersListHtml( styles, this.props.users )

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
  }
};

const VisibleUsersList = UsersList



export default VisibleUsersList


