// import React from 'react'
// import ReactDOM from 'react-dom'
// import createBrowserHistory from 'history/lib/createBrowserHistory'
// import { useRouterHistory } from 'react-router'
// import { syncHistoryWithStore } from 'react-router-redux'
// import createStore from './store/createStore'
// import AppContainer from './containers/AppContainer'

//--start---for HR APP by arun 
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { createStore, applyMiddleware, compose  } from 'redux'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';

import reducer from './reducers/index'

//pages
import Page_Login from './containers/user/login'
import Page_Home from './containers/user/home'
import Page_Logout from './containers/user/logout'
import Page_MonthlyAttendance from './containers/user/monthlyAttendance'
import Page_AttendanceSummary from './containers/user/attendanceSummary'
import Page_ManageWorkingHours from './containers/admin/manageWorkingHours'
import Page_Holidays from './containers/user/holidays'
import Page_ApplyLeave from './containers/user/applyLeave'



export class APP extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}


const logger = createLogger();

let store = createStore(reducer,  compose(
    //applyMiddleware( thunk, logger),
    applyMiddleware( thunk ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

//--end---for HR APP by arun 



// ========================================================
// Browser History Setup
// ========================================================
// const browserHistory = useRouterHistory(createBrowserHistory)({
//   basename: __BASENAME__
// })

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
// const initialState = window.___INITIAL_STATE__
// const store = createStore(initialState, browserHistory)
// const history = syncHistoryWithStore(browserHistory, store, {
//   selectLocationState: (state) => state.router
// })

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// ========================================================
// Render Setup
// ========================================================
// const MOUNT_NODE = document.getElementById('root')

// let render = (routerKey = null) => {
//   const routes = require('./routes/index').default(store)

//   ReactDOM.render(
//     <AppContainer
//       store={store}
//       history={history}
//       routes={routes}
//       routerKey={routerKey}
//     />,
//     MOUNT_NODE
//   )
// }

//--start----added by arun for HR app
let render = (routerKey = null) => { 
  ReactDOM.render((
     <Provider store={store}>
         <Router history={hashHistory} >
             <Route path="/" component={APP} >
                 <IndexRoute component={Page_Login} /> //this will be the default page which will opens when app starts
                 <Route path="home" component={Page_Home} />
                 <Route path="monthly_attendance" component={Page_MonthlyAttendance} />
                 <Route path="manage_working_hours" component={Page_ManageWorkingHours} />
                 <Route path="logout" component={Page_Logout} />
                 <Route path="holidays" component={Page_Holidays} />
                 <Route path="apply_leave" component={Page_ApplyLeave} />
                 
             </Route>
         </Router>
     </Provider>
  ), document.querySelector("#myApp"))
}
//--end------added by arun for HR app


// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
// if (__DEV__ && module.hot) {
//   const renderApp = render
//   const renderError = (error) => {
//     const RedBox = require('redbox-react').default

//     ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
//   }
//   render = () => {
//     try {
//       renderApp(Math.random())
//     } catch (error) {
//       renderError(error)
//     }
//   }
//   //module.hot.accept(['./routes/index'], () => render())
// }

// ========================================================
// Go!
// ========================================================
render()
