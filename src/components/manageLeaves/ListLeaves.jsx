import React from 'react'
import * as _ from 'lodash'
import ListLeavesLeave from './ListLeavesLeave'
import { CONFIG } from '../../config/index'

class ListLeaves extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLeave: ''
    }
  }
  // componentWillReceiveProps (props) {
  //   if (props.listLeaves.selectedLeave.id !== this.state.selectedLeave) {
  //     this.props.onSelectLeave(props.listLeaves.leaves.selectedLeave.id)
  //     this.setState({
  //       selectedLeave: props.listLeaves.selectedLeave.id
  //     })
  //   }
  // }
  render () {
    let LeavesList = _.map(this.props.listLeaves.leaves, (leave, keyval) => {
      if (leave.option_select) {
      }
      return (
            <ListLeavesLeave leave={leave} key={keyval} keyval={keyval} {...this.props} />
      )
    })
    return (
        <div className="row-col">
            <div className="list inset">
              {LeavesList}
            </div>
        </div>
    )
  }
}

export default ListLeaves
