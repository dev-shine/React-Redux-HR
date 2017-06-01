import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import {Card, CardHeader} from 'material-ui/Card';

const ListAllPolicyDocument = ({policyDocuments, submitNewListofDocs}) => {
  const deleteDocument = (delDoc) => {
    let newList = [];
    _.map(policyDocuments, (doc,i)=>{
      if(doc.name !== delDoc.name){
        newList.push(doc);
      }
    })
    submitNewListofDocs(newList);
  }
  let allDocuments = _.map(policyDocuments, (doc, i) => (
    <Card key={i}>
      <CardHeader
        title={doc.name}
        subtitle={<a href={doc.link} target="_blanck">{doc.link}</a>}
        children={
          <IconButton
          tooltip="Delete Document"
          tooltipPosition="top-center"
          style={{float:'right'}}
          iconStyle={{"color":"#B71C1C"}}
          children={<Delete color='#B71C1C'/>}
          onClick= {(evt) => {
            evt.stopPropagation();
            deleteDocument(doc)
            }
          }
          />
        }
        textStyle={{width:'310px',paddingRight:'0px'}}
        style={{marginTop:'10px'}}
        titleStyle={{color:'#000000' , fontSize:'18px'}}
        subtitleStyle={{fontSize:'12px',fontStyle:'italic',overflow:'hidden',textOverflow:'ellipsis'}}
      />
    </Card>
  ))
  return(
    <div className="row" style={{margin:'0px 4px 0px'}}>
      <div className="col-xs-12">
        <Card>
          <CardHeader title="Policy Documents List" />
        </Card>
        {allDocuments}
      </div>
    </div>
  )
}

ListAllPolicyDocument.PropTypes = {
  policyDocuments: PropTypes.array.isRequired,
  submitNewListofDocs: PropTypes.func.isRequired
}

export default ListAllPolicyDocument;
