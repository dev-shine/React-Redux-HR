import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {confirm} from 'src/services/notify';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import {Card, CardHeader} from 'material-ui/Card';

const ListAllPolicyDocument = ({policyDocuments, submitNewListofDocs}) => {
  const deleteDocument = (delDoc) => {
    let newList = _.filter(policyDocuments, function (o) { return o.name !== delDoc.name; });
    confirm('Are you sure ?', 'Do you want to delete this Document ?', 'warning').then((res) => {
      if (res) {
        submitNewListofDocs(newList);
      }
    });
  };
  let allDocuments = _.map(policyDocuments, (doc, i) => {
    let docName = <h4 className="m-y-xs"> doc.name </h4>;
    return (
      <Card key={i} className="m-y-sm">
        <CardHeader
          title={docName}
          subtitle={<a href={doc.link} target="_blank"><small><i>{doc.link}</i></small></a>}
          children={
            <IconButton
              tooltip="Delete Document"
              tooltipPosition="top-center"
              className="pull-right"
              children={<Delete color='#B71C1C' />}
              onClick={(evt) => {
                evt.stopPropagation();
                deleteDocument(doc);
              }
            }
            />
          }
        />
      </Card>
    );
  });
  return (
    <div className="row m-x-sm">
      <div className="col-xs-12">
        <Card>
          <CardHeader title="Policy Documents List" />
        </Card>
        {allDocuments}
      </div>
    </div>
  );
};

ListAllPolicyDocument.PropTypes = {
  policyDocuments:     PropTypes.array.isRequired,
  submitNewListofDocs: PropTypes.func.isRequired
};

export default ListAllPolicyDocument;
