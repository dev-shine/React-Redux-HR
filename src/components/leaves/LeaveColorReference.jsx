import React from 'react';
class LeaveColorReference extends React.Component {
    constructor( props ){
		super( props );
    }
    render(){
    	return (

        <div className="">
        
        <div className="">
          <div className="row no-gutter m-b text-xs l-h-1x">
           

           <div className="col-xs-4 col-sm-3 col-md-2 col-lg-1">
              <div className="p-a blue">
                <h4></h4>
                <div className="text-u-c _600 text-sm">Pending</div>
              </div>
            </div>

            <div className="col-xs-4 col-sm-3 col-md-2 col-lg-1">
              <div className="p-a green-A200">
                <h4></h4>
                <div className=" text-u-c _600 text-sm">Approved</div>

              </div>
            </div>
           
           

            <div className="col-xs-4 col-sm-3 col-md-2 col-lg-1">
              <div className="p-a red-100">
                <h4></h4>
                <div className="text-u-c _600 text-sm">Cancelled</div>
              </div>
            </div>

            <div className="col-xs-4 col-sm-3 col-md-2 col-lg-1">
              <div className="p-a red-500">
                <h4></h4>
                <div className="text-u-c _600 text-sm">Rejected</div>
              </div>
            </div>

            
            
          </div>
        </div>
      </div>

	    )
    }
}

export default LeaveColorReference


