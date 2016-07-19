import React from 'react';
class UserDaySummary extends React.Component {
    constructor( props ){
    super( props );
    }
    componentWillReceiveProps( props ){
      console.log('********')
      console.log( props )
    }

    render(){
      return (
        <div id="modalUserDaySummary" className="modal" data-backdrop="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Day Summary </h5>
              </div>
              <div className="modal-body text-center p-lg">
                <p>Are you sure to execute this action?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn dark-white p-x-md" data-dismiss="modal">No</button>
                <button type="button" className="btn danger p-x-md" data-dismiss="modal">Yes</button>
              </div>
            </div>
          </div>
        </div>        
      )
    }
}

const VisibleUserDaySummary = UserDaySummary

export default VisibleUserDaySummary





