import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import PropTypes from 'prop-types';

const EmployeeLifeCycle = ({data, handleChangeSteps}) => {
  let list = data.employee_life_cycle;
  let display = _.map(list, (value, key) => {
    let collapseLink = 'collapse' + key;
    let steps = _.map(value.steps, (v, k) => {
      return (
        <div key={k}><input type="checkbox" value={v.text} checked={v.status} onChange={() => handleChangeSteps(value.id, v.id)} /> {v.text}<br /></div>
      );
    });
    return (
      <div className="panel panel-default" style={{'border': 0}} key={key}>
        <div className="panel-heading p-b-lg">
          <div className="panel-title p-b-md">
            <span className="col-xs-9">
              <Link data-toggle="collapse" data-parent="#accordion" to={collapseLink} >
                <h4 className="m-b-xs text-lg col-sm-10">{value.stage}</h4>
                <span className="col-xs-12 text-sm">{value.text}</span>
              </Link>
            </span>
            {/* <Link to="/manage_roles" className="col-sm-3 m-t-sm p-t-sm text-sm text-danger" onClick={() => { if (confirm('Do you want to Delete the Role ?')) { handleDelete(rolesId); } }}><i>Delete Role</i></Link> */}
          </div>
        </div>
        <div id={collapseLink} className="table-responsive p-r p-l panel-collapse collapse">
          <div className="panel-body" style={{'border': 0}}>
            <table className="table table-condensed">
              <thead><tr><th>Steps</th></tr></thead>
              <tbody><tr><td>{steps}</td></tr></tbody>
            </table>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="col-md-12 panel-group" id="accordion">
      <h6 className="text-center">Employee Life Cycle</h6>
      <br />
      {display}
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
