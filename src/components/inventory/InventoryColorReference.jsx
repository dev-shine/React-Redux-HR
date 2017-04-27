import React from 'react'
import * as _ from 'lodash'

class InventoryColorReference extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    let styles = _.cloneDeep(this.constructor.styles)

    	return (

        <div className="">

        <div className="">
          <div className="row no-gutter m-b text-xs l-h-1x">

           <div className="col-xs-4 text-center" style={styles.cursor} >
              <div className="p-a blue-100">
                <h4></h4>
                <div className="text-u-c _600 text-sm" >New</div>
              </div>
            </div>

            <div className="col-xs-4 text-center" style={styles.cursor}>
              <div className="p-a green-A200">
                <h4></h4>
                <div className=" text-u-c _600 text-sm" >Working</div>

              </div>
            </div>

            <div className="col-xs-4 text-center" style={styles.cursor}>
              <div className="p-a red-500">
                <h4></h4>
                <div className="text-u-c _600 text-sm" >Not Working</div>
              </div>
            </div>

          </div>
        </div>
      </div>

	    )
  }
}

InventoryColorReference.styles = {
  cursor: {
    'cursor': 'Pointer'
  }
}

export default InventoryColorReference
