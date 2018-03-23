import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class InventoryItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            
          };
        }
    
    render(){
    return(
        <div>
            <h1>hello</h1>
        </div>
    )
}
}

function mapStateToProps (state){
    return{

    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        
    };
}

const VisibleInventoryItem = connect(mapStateToProps, mapDispatchToProps)(InventoryItem);

const RouterVisibleInventoryItem = withRouter(VisibleInventoryItem);

export default RouterVisibleInventoryItem;