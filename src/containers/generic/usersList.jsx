import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as _ from 'lodash'

import * as actions_login from '../../actions/login/index'


class UsersList extends React.Component {
    constructor( props ){
        super( props );
    }

    _getUsersListHtml( users ){
      return _.map( users, ( user, key ) => {
        let monthly_attendance_link = "/home/" + user.user_Id;
        return (
                  <li className="list-item" key={key}>
                      <Link to={monthly_attendance_link}>
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
                      </Link>

                  </li>
        )
      })
    }

    render(){

      let usersList = this._getUsersListHtml( this.props.users )

      // usersList = _.map( this.props.users , ( user, key ) => {
      //   console.log( key )
      //   console.log( user  )
        
      
                
      // }
        
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

function mapStateToProps( state ){
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const VisibleUsersList = connect(
  mapStateToProps,
  mapDispatchToProps
)( UsersList )



export default VisibleUsersList


