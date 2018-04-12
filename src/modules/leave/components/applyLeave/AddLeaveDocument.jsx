import React from 'react'
import Dialog from 'material-ui/Dialog';

export default class AddLeaveDocument extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render(){
        return(
            <Dialog title="Upload Leave Document"
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          contentClassName="dialog-content"
          autoScrollBodyContent>
          <div>
            <form  method="POST" encType="multipart/form-data">
              <input type="hidden" name="token"  />
              <input type="hidden" name="leaveid"  />
              <input type="hidden" name="page_url" />
              <div className="form-group">
                <label>Attachment</label>
                <input type="file" className="form-control" ref="file" name="docProof" />
              </div>
              <div className="form-group">
                <input type="submit" name="submit" value="Upload" className="col-xs-12 md-btn md-raised indigo" />
              </div>
            </form>
          </div>
        </Dialog>
        )
    }
}