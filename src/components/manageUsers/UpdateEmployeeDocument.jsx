  import React from 'react';
  import * as _ from 'lodash'
  import {notify} from '../../services/index'

  import { DateField } from 'react-date-picker'
  import 'react-date-picker/index.css'

//--------
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

  class UpdateEmployeeDocument extends React.Component {
    constructor( props ){
      super( props );
      this.state={
        user_id:'',
        open:false,
        doc_type:"",
      }
      this.deleteDocument = this.deleteDocument.bind( this )
      this.handleOpen = this.handleOpen.bind( this )
      this.handleClose = this.handleClose.bind( this )
      this.callUpdateDocuments = this.callUpdateDocuments.bind( this )
    }
    componentWillReceiveProps( props ){
      if( typeof props.user_id != 'undefined' &&  props.user_id != null ){
        this.setState({
          user_id : props.user_id
        })
      }
    }
    handleOpen(){
      this.setState({
        open:true
      })
    }
    handleClose(){
      this.setState({
        open:false      
      })      
    }
     callUpdateDocuments(e){    
      let type = this.state.doc_type
      let link1 = this.refs.file.value 
      let stop = false
      if(this.state.user_id == ''){
        stop = true
        notify('User not selected')
      }else if(type == ''){
        stop = true
        notify('Please select document type')
      }else if(link1 == ''){
        stop = true
        notify('Please select a file')
      }else if(this.refs.declear.checked !== true){
        stop = true
        notify('Mark declearation before submit')
      }
      if(stop){
        e.preventDefault()
      }
    }
    deleteDocument( doc_id ){
      this.props.onDeleteDocument( doc_id ).then((msg)=>{
        this.props.onGetUserDocument( this.state.user_id )
        notify(msg.toString())
      }).catch((err)=>{
        notify(err.toString())
      })
    }
      render(){
        let page_url = window.location.href 
        let styles = _.cloneDeep(this.constructor.styles);
                  let user_doc = []
                  _.map(this.props.user_documents,(doc, key)=>{
                    user_doc.push(<li key={key} className="list-group-item">
                      <div  className="clear b-t p-t">
                      <div className="_500 block">{doc.document_type}
                      <span className="glyphicon glyphicon-remove-circle pull-right" style={{fontSize:'12px',cursor:'pointer'}} onClick={()=>{this.deleteDocument(doc.id)}}></span>
                      </div>
                     {typeof doc.link_1 == 'undefined'?'':<span className="text-muted"><div dangerouslySetInnerHTML={{__html:doc.link_1}}></div><br /></span>}
                   </div>
                   </li>)
                  })
                
        return (
          <div>
             <h6 className="text-center">Uploaded Documents</h6>
              <br/>
              <div>
              <ul className="list-group m-b">
                {user_doc.length == 0 ? <li className="list-group-item"><span>No document uploaded</span></li>:user_doc}
                     
              </ul>
              </div>
              <div className="text-center">
                <button className="btn info" onTouchTap={this.handleOpen} >Upload New Documents</button>
              </div>

              <Dialog
              title="Upload Employee Documents"
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              contentStyle={ {width: '75%',maxWidth: 'none'}}
              autoScrollBodyContent={true}
              > 
                 <div>
            <form action="http://excellencemagentoblog.com/slack_dev/hr/attendance/sal_info/upload_file.php" method="POST" encType="multipart/form-data">
            <div className="form-group">
              <label>Document Type</label>

          <select className="form-control" ref="doc_type" onChange={ () => this.setState({ doc_type : this.refs.doc_type.value }) } value={this.state.doc_type} >
            <option value="">---select doc type----</option>
            <option value="PAN Card">PAN Card</option>
            <option value="Address Proof">Address Proof</option>
            <option value="Photo">Photo</option>
            <option value="Offer Letter">Offer Letter</option>
            <option value="Appointment Letter">Appointment Letter</option>
            <option value="Previous Company Experiance Letter">Previous Company Experiance Letter</option>
            <option value="Previous Company Offer Letter">Previous Company Offer Letter</option>
            <option value="Previous Company Salary Slip">Previous Company Salary Slip</option>
            <option value="Previous Company Other Documents">Previous Company Other Documents</option>
            <option value="Qualification Certificate">Qualification Certificate</option>
            <option value="Other Documents">Other Documents</option>
          </select>
            </div>
            <input type="hidden" name="user_id" value={this.state.user_id} />
            <input type="hidden" name="document_type" value={this.state.doc_type} />
            <input type="hidden" name="page_url" value={page_url} />
            <div className="form-group">
              <label>Attachment </label>
              <input type="file" className="form-control" ref="file" name="link_1" />
            </div>
            <div className="form-group">
            <input style={styles.checkbox} type="checkbox" ref="declear" />
            <span style={styles.declearation}><b>*IMPORTANT:</b> By uploading this document you certify that these document are true and all information is correct</span>
            </div>
          <div className="form-group">
            <input  type="submit" name="submit" value="Upload" className="col-xs-12 md-btn md-raised indigo"  onClick={(e)=>{this.callUpdateDocuments(e)}}/>
          </div>
          </form>
          </div>
          </Dialog>

        </div>
        )
      }
}



UpdateEmployeeDocument.styles = {
  checkbox:{
    verticalAlign: 'middle',
  },
  declearation:{
    display: 'inline-flex',
    width: '90%',
    marginLeft: '10px'
  }
};



export default UpdateEmployeeDocument


