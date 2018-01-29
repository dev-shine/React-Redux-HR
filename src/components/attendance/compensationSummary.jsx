import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const CompensationSummary = ({monthlyAttendance}) => {
  const {compensationSummary} = monthlyAttendance;
  const compensationDataLength = compensationSummary.compensation_break_up ? compensationSummary.compensation_break_up.length : 0;
  const firstHalf = [];
  const secondHalf = [];
  _.map(compensationSummary.compensation_break_up, (data, index) => {
    if (compensationDataLength / 2 > index) {
      firstHalf.push(<small className="text-muted">{data.text}</small>);
    } else {
      secondHalf.push(<small className="text-muted">{data.text}</small>);
    }
  });

  return (
    <div className="box">
      <div className="box-header">
        <h3>Time to be compensate: {compensationSummary.time_to_be_compensate}</h3>
        <small></small>
      </div>
      <div className="box-body">
        <div className="row no-gutter m-b text-xs l-h-1x compensation-data">
          <div className='col-xs-6'>
            {firstHalf}
          </div>
          <div className='col-xs-6'>
            {secondHalf}
          </div>
        </div>
      </div>
    </div>
  );
};

CompensationSummary.PropTypes = {
  monthlyAttendance: PropTypes.shape({
    compensationSummary: PropTypes.object.isRequired
  }).isRequired
};

export default CompensationSummary;
