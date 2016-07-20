import React from 'react';
class LoggedUserInfo extends React.Component {
    constructor( props ){
		super( props );
    }
    render(){

    	let profileImage = this.props.logged_user.profileImage
    	return (

      <div flex-no-shrink="" className="b-t">
      	<div className="nav-fold">
      	<span className="pull-left">
	      <img src={profileImage} className="w-40 img-circle"/>
	    </span>
      	</div>

<br/>
        <div className="nav-fold">
        	
	    


      <span className="clear hidden-folded">
        <span className="block _500">{ this.props.logged_user.name}</span>
        <i><span className="block _500">{ this.props.logged_user.role}</span></i>
        <i><span className="block _500">{ this.props.logged_user.jobtitle}</span></i>
      </span>
  
</div>
      </div>
	    )
    }
}



export default LoggedUserInfo


