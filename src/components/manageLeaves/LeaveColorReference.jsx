import React from 'react';

import * as _ from 'lodash'

class LeaveColorReference extends React.Component {
    constructor( props ){
		super( props );
    }
    render(){

      let styles = _.cloneDeep(this.constructor.styles);

    	return (

        <div className="">
        
        <div className="">
          <div className="row no-gutter m-b text-xs l-h-1x">
           

           <div className="col-xs-4 col-sm-3 col-md-2 col-lg-1 text-center" style={styles.cursor}>
              <div className="p-a blue">
                <h4></h4>
                <div className="text-u-c _600 text-sm" onClick={ () => this.props.onApplyFilter('Pending') } >Pending</div>
              </div>
            </div>

            <div className="col-xs-4 col-sm-3 col-md-2 col-lg-1  text-center" style={styles.cursor}>
              <div className="p-a green-A200">
                <h4></h4>
                <div className=" text-u-c _600 text-sm" onClick={ () => this.props.onApplyFilter('Approved') }>Approved</div>

              </div>
            </div>
           
            <div className="col-xs-4 col-sm-3 col-md-2 col-lg-1  text-center" style={styles.cursor}>
              <div className="p-a red-500">
                <h4></h4>
                <div className="text-u-c _600 text-sm" onClick={ () => this.props.onApplyFilter('Rejected') }>Rejected</div>
              </div>
            </div>

            
            
          </div>
        </div>
      </div>

	    )
    }
}

LeaveColorReference.styles = {
  cursor: {
    'cursor' : 'Pointer'
  }
};

export default LeaveColorReference


