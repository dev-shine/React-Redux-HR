import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {syncHistoryWithStore} from 'react-router-redux';
import {hashHistory} from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import rootSaga from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, thunk];
console.log('========================store============');
const store = createStore(
  rootReducer,
  composeEnhancers(
   applyMiddleware(...middleware),
 ),
);

sagaMiddleware.run(rootSaga);

// export const history = syncHistoryWithStore(hashHistory, store);

export default store;
