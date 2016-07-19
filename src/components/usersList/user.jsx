import React from 'react';
class User extends React.Component {
    constructor( props ){
		super( props );
    }
    render(){
    	let styles = _.cloneDeep(this.constructor.styles);
		let userid = this.props.user.user_Id
    	let key = parseInt( userid )

    	return (
	     	<li className="list-item" key={key} onClick={ () => this.props.onUserClick( userid ) }  style={styles.cursorPointer}>
	            <div className="list-left">
	              <span className="w-40 avatar">
	                <img src="https://cdn3.iconfinder.com/data/icons/user-avatars-1/512/users-10-3-128.png" />
	                <i className="on b-white bottom"></i>
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
  }
};

const VisibleUser = User

export default VisibleUser


