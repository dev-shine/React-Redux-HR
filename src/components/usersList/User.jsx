import React from 'react';
import Avatar from 'material-ui/Avatar';
class User extends React.Component {
    constructor( props ){
		super( props );
    }
    render(){
      let selectedUserId = this.props.selectedUserId

    	let styles = _.cloneDeep(this.constructor.styles);
		let userid = this.props.user.user_Id
    	let key = parseInt( userid )

    	let profileImae = (this.props.disabledUser != undefined ?this.props.user.name.charAt(0):this.props.user.slack_profile.image_72)
      let avatar = (this.props.disabledUser != undefined ?<Avatar>{profileImae}</Avatar>:<img src={profileImae} />)

    	let backgroundClass = styles.cursorPointer
      let arrow = ""
    	if( selectedUserId == userid ){
    		backgroundClass = styles.selectedUser
        arrow = <span className="arrow right b-blue"></span>
    	}
      let param = (this.props.disabledUser != undefined ?this.props.user:this.props.user.user_Id)
    	return (
	     	<li className="list-item" key={key} onClick={ () => this.props.onUserClick( param ) }  style={backgroundClass}>
            {this.props.disabledUser != undefined ? <div><div className="col-md-12">
              <div className="list-left">
                <span className="w-40 avatar">
                  {avatar}
                </span>
              </div>
              <div className="list-body">
                <div>{this.props.user.name}</div>
                <small className="text-muted text-ellipsis">{this.props.user.jobtitle}</small>
                <small className="text-muted text-ellipsis"><b>Emp Id : {userid}</b></small>
              </div>
            </div>
              <div className="col-md-12 text-right">
                <button className="btn btn-fw btn-success" onTouchTap={()=>this.props.changeEmployeeStatus( userid, 'Enabled' )}>Enable</button>
              </div></div>:<div><div className="list-left">
                <span className="w-40 avatar">
                  {avatar}
                </span>
              </div>
              <div className="list-body">
                <div>{this.props.user.name}</div>
                <small className="text-muted text-ellipsis">{this.props.user.jobtitle}</small>
                <small className="text-muted text-ellipsis"><b>Emp Id : {userid}</b></small>
              </div></div>}
              {arrow}
	      	</li>
	    )
    }
}

User.styles = {
  cursorPointer: {
    'cursor' : 'pointer'
  },
  selectedUser : {
  	'background' : '#03a9f4',
  	'color' : 'white'
  }
};

export default User


