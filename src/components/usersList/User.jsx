import React from 'react';
class User extends React.Component {
    constructor( props ){
		super( props );
    }
    render(){
      let selectedUserId = this.props.selectedUserId

    	let styles = _.cloneDeep(this.constructor.styles);
		let userid = this.props.user.user_Id
    	let key = parseInt( userid )

    	let profileImae = this.props.user.slack_profile.image_72

    	let backgroundClass = styles.cursorPointer
    	if( selectedUserId == userid ){
    		backgroundClass = styles.selectedUser
    	}

    	return (
	     	<li className="list-item" key={key} onClick={ () => this.props.onUserClick( userid ) }  style={backgroundClass}>
	            <div className="list-left">
	              <span className="w-40 avatar">
	                <img src={profileImae} />
	                </span>
	            </div>
	            <div className="list-body">
	              <div>{this.props.user.name}</div>
	              <small className="text-muted text-ellipsis">{this.props.user.jobtitle}</small>
	            </div>
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


