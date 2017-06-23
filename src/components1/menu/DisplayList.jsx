import React from 'react';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Link} from 'react-router';
import createFragment from 'react-addons-create-fragment';

const DisplayList = ({data, user, click}) => {
  let links = '';
  if( user === "Admin"){
    // Filter and sort by priority for Admin only Objects
    let admin = _.orderBy(_.filter(data, function(li){ return li.access[user] !== undefined; }), function(li){ return li.access[user].priority; });

    // Find biggest group id for iteration
    let groupIndex = _.maxBy(admin, function(value){ return value.access[user].group; });
    groupIndex = groupIndex.access[user].group;

    let groupKey = -1;
    let linkList = <div></div>;
    links = _.map(admin, (list, key) => {
      let id = list.id;
      // console.log(list, 'list');
      let listAccessUserGroup = list.access[user].group;
      if(groupKey === -1){
        // The first iteration
        // linkList = createFragment(<li id={id}><a><span className='nav-caret text-muted'><i className='fa fa-caret-down'></i></span><span className='nav-text'>{label}</span></a><ul className='nav-sub'>);
        // groupKey = 1;
        {/* console.log(groupKey, "The first iteration"); */}
      }
      {/* else if(groupKey === groupIndex){
        // only when grouped li completes and groupkey becomes biggest group key 7
        // linkList = createFragment(</ul></li><li>);
        groupKey = 0;
        groupIndex =0;
        console.log(groupKey, "last grouped iteration 7");
      } */}
      elseif (groupKey === listAccessUserGroup){
        linkList = createFragment(<li className="hidden-folded" key={key}><span><Link to={list.path}>{list.label}</Link></span></li>);
        // console.log(groupKey, "The middle Group iterations iteration");
      }
      else {
        linkList = createFragment(</ul></li><li id={id}><a><span className='nav-caret text-muted'><i className='fa fa-caret-down'></i></span><span className='nav-text'>{label}</span></a><ul className='nav-sub'>);
        groupKey++;
        console.log(groupKey, "when iteration needed to be incremented");
      }
      console.log(linkList)
      return( <div>{linkList}</div> );
    });
  }
  if( user === "Guest" || user === "General" ){
    let guest = _.orderBy(_.filter(data, function(li){ return li.access[user] !== undefined; }), function(li){ return li.access[user]; });
    links = _.map(guest, (list, key) => ( <li className="hidden-folded" key={key}><span><Link to={list.path}>{list.label}</Link></span></li> ));
  }
  return( <ul className="nav">{links}</ul> );
}

export default DisplayList;

DisplayList.PropTypes = {
  data: PropTypes.shape({

  }).isRequired,
  user: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired
};
