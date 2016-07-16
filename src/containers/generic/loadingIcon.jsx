import React from 'react';
import { connect } from 'react-redux'
import * as _ from 'lodash'

class LoadingIcon extends React.Component {
    constructor( props ){
        super( props );
    }
    render(){
      let styles = _.cloneDeep(this.constructor.styles);

      let show_loading = '';

      if( this.props.frontend.show_loading == 1 ){
        show_loading = <div className="progress progress-striped active">
            <div className="progress-bar info" style={styles.progressWidth}></div>
        </div>
      }
      return (
        <div>
          {show_loading}
        </div>
      )

    }
}

LoadingIcon.styles = {
  progressWidth: {
    'width' : '100%'
  }
};

function mapStateToProps( state ){
    return {
      frontend : state.frontend.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const VisibleLoadingIcon = connect(
  mapStateToProps,
  mapDispatchToProps
)( LoadingIcon )



export default VisibleLoadingIcon


