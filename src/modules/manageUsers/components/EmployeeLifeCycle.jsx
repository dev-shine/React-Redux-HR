import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const EmployeeLifeCycle = ({data, handleChangeSteps}) => {
  let list = data.employee_life_cycle;
  let display = _.map(list, (value, key) => {
    let steps = _.map(value.steps, (v, k) => {
      if (v.status === 1) {
        v.text = <span className="text-success">{v.text}</span>;
      }
      return (
        <div key={k}><input type="checkbox" value={v.text} checked={v.status} onChange={() => handleChangeSteps(v.id)} /> {v.text}<br /></div>
      );
    });
    return (
      <div className="col-xs p-xs" key={key}>
        <div className="box-row">
          <b>{value.text}</b>
          <hr className="m-t-xs m-b-sm" />
          <div>{steps}</div>
        </div>
      </div>
    );
  });
  return (
    <div className="col-md-12">
      <h6 className="text-center">Employee Life Cycle</h6>
      <div className="rowflex">
        {display}
      </div>
    </div>
  );
};

export default EmployeeLifeCycle;

EmployeeLifeCycle.PropTypes = {
  data: PropTypes.shape({
    error: PropTypes.number,
    data:  PropTypes.object.isRequired
  }).isRequired,
  handleChangeSteps: PropTypes.func.isRequired
};
