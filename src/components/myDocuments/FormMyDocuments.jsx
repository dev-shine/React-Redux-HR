  import React from 'react';
  import * as _ from 'lodash'

  import { DateField } from 'react-date-picker'
  import 'react-date-picker/index.css'
  import ContentAdd from 'material-ui/svg-icons/content/add';
  import FloatingActionButton from 'material-ui/FloatingActionButton';

  class FormMyDocuments extends React.Component {
    constructor( props ){
      super( props );
      this.state={
        doc_type:"",
        doc_link:"",
        doc_link1:"",
        doc_link2:"",
      }
      this.callUpdateDocuments = this.callUpdateDocuments.bind( this )
    }
    callUpdateDocuments(){
      
      let links = []
      let link1 = this.state.doc_link.trim()
      let link2 = this.state.doc_link1.trim()
      let link3 = this.state.doc_link2.trim()
      let re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
      let tmp = true
      if(link1 !== ''){
        if(re.test(link1)){
          links.push(link1)
        }else{
          tmp = false
          alert('Link 1 invalid')
        }
      }
      if(link2 !== ''){
        if(re.test(link2)){
          links.push(link2)
        }else{
          tmp = false
          alert('Link 2 invalid')
        }
      }
      if(link3 !== ''){
        if(re.test(link3)){
          links.push(link3)
        }else{
          tmp = false
          alert('Link 3 invalid')
        }
      }
      if(this.refs.declear.checked !== true){
        tmp = false
        alert('Mark declearation before submit')
      }
      if(tmp){
      let link_data = {
        doc_type:this.state.doc_type.trim(),
        doc_link:links,
        declearation:'*IMPORTANT: Upload documents in your company google drive account. Make sure that the link is not private and document is shared with hr@excellencetechnologies.in . Also make hr@excellencetechnologies.in owner of the document.   Also by uploading this document you certify that these document are true and all information is certified'
      }
      this.props.callUpdateDocuments(link_data).then((msg)=>{
          alert(msg.toString())
          this.setState({
            doc_link : '',
            doc_link1 : '',
            doc_link2  : ''
          })
      }).catch((err)=>{
        alert(err.toString())
      })
    }
    }
      
      render(){
        let styles = _.cloneDeep(this.constructor.styles);
        return (
          <div>
            <div className="row">
            <div className="col-xs-6">
          <h6 className="text-center">Uploaded Documents</h6>
          </div>
            <div className="col-xs-6">
            <h6 className="text-center">Upload New Documents</h6>
            <form>
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
            <div className="form-group">
              <label>Google drive Link 1</label>

              <input type="url" className="form-control" ref="doc_link" onChange={(e) => this.setState({ doc_link : e.target.value })} value={this.state.doc_link}/>
            </div>
            <div className="form-group">
              <label>Google drive Link 2</label>

              <input type="url" className="form-control" ref="doc_link1" onChange={(e) => this.setState({ doc_link1 : e.target.value })} value={this.state.doc_link1}/>
            </div>
            <div className="form-group">
              <label>Google drive Link 3</label>

              <input type="url" className="form-control" ref="doc_link2" onChange={(e) => this.setState({ doc_link2 : e.target.value })} value={this.state.doc_link2}/>
            </div>
            <div className="form-group">
            <input style={styles.checkbox} type="checkbox" ref="declear" /><span style={styles.declearation}><b>*IMPORTANT:</b> Upload documents in your company google drive account. Make sure that the link is not private and document is shared with hr@excellencetechnologies.in . Also make hr@excellencetechnologies.in owner of the document.   Also by uploading this document you certify that these document are true and all information is certified</span>
            </div>
          <div className="form-group">
            <button  className="col-xs-12 md-btn md-raised indigo" onClick={()=>{this.callUpdateDocuments()}} >Update Your Documents</button>
          </div>
          </form>
          </div>          
          </div>
          </div>
        )
      }
}


FormMyDocuments.styles = {
  checkbox:{
    verticalAlign: 'middle',
  },
  declearation:{
    display: 'inline-flex',
    width: '90%',
    marginLeft: '10px'
  }
};


export default FormMyDocuments


