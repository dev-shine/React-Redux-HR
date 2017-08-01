import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ListDocuments = ({myDocuments, deleteDocument}) => {
  let myDocs = _.map(myDocuments, (doc, key) => {
    return (<li key={key} className="list-group-item">
      <div className="clear b-t p-t">
        <div className="_500 block">{doc.document_type}
          <span className="glyphicon glyphicon-remove-circle pull-right pointer" onClick={() => { deleteDocument(doc.id); }}></span>
        </div>
       {typeof doc.link_1 === 'undefined' ? '' : <span className="text-muted"><div dangerouslySetInnerHTML={{__html: doc.link_1}}></div><br /></span>}
      </div>
    </li>);
  });
  if (_.isEmpty(myDocs)) {
    myDocs = <li className="list-group-item text-center"><span>No document uploaded</span></li>;
  }
  return (
    <div className="col-sm-6 p-a-md">
      <h6 className="text-center">Uploaded Documents</h6>
      <ul className="list-group m-b ">
        {myDocs}
      </ul>
    </div>
  );
};

ListDocuments.PropTypes = {
  myDocuments:    PropTypes.array.isRequired,
  deleteDocument: PropTypes.func.isRequired
};

export default ListDocuments;
