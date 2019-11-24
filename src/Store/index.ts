import logger from 'redux-logger';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'
// All redux reducers (rolled into one mega-reducer)
import rootReducer from './reducers';

import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

// Load middleware
let middleware = [
  logger,// Allows action creators to return functions (not just plain objects)
  sagaMiddleware
];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
)
sagaMiddleware.run(rootSaga)

export default store
export * from "./types"


///https://redux.js.org/recipes/configuring-your-store