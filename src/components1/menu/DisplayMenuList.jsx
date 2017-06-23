import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Link} from 'react-router';

const DisplayMenuList = ({data, user, click}) => {
  let links = '';

  if (user === 'Admin') {
    let admin = _.orderBy(_.filter(data, function (li) { return li.access[user] !== undefined; }), function (li) { return li.access[user].priority; });
    let groupIndex = _.groupBy(admin, function (value) { return value.access[user].group; });
    let lastSection = _.maxBy(admin, function (value) { return value.access[user].group; });

    links = _.map(groupIndex, (parent, k) => {
      classForList = {'fontSize': 11, 'fontWeight': 600};
      let linkList = _.map(parent, (child, key) => {
        return (
          <li key={key} className="hidden-folded">
            <span style={classForList}>
              <Link to={child.path}>{child.label}</Link>
            </span>
          </li>
        );
      });

      let classForList = {'fontSize': 11, 'fontWeight': 600};
      let output = <li key={k} id={parent[0].id} onClick={() => { click(parent[0].id); }} className="">
        <a>
          <span className="nav-caret text-muted"><i className="fa fa-caret-down"></i></span>
          <span className="nav-text">{parent[0].access[user].label}</span>
        </a>
        <ul className="nav-sub">{linkList}</ul>
      </li>;
      if (parent[0].access[user].group === lastSection.access[user].group) {
        classForList = {};
        output = linkList;
      }
      return (output);
    });
  }

  if (user === 'Guest' || user === 'Employee') {
    let guest = _.orderBy(_.filter(data, function (li) { return li.access[user] !== undefined; }), function (li) { return li.access[user]; });
    links = _.map(guest, (list, key) => (
      <li className="hidden-folded" key={key}>
        <span><Link to={list.path}>{list.label}</Link></span>
      </li>
    ));
  }

  return (<ul className="nav">{links}</ul>);
};

export default DisplayMenuList;

DisplayMenuList.PropTypes = {
  data: PropTypes.shape({

  }).isRequired,
  user: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired
};
