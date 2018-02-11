import { createStore, applyMiddleware, compose } from 'redux';
import penderMiddleware from 'redux-pender';

import modules from './modules';

const isDevelopment = process.env.NODE_ENV === 'development';

// 개발모드에서만 리덕스 개발자도구 적용
const composeEnhancers = isDevelopment ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ) : compose;

const configureStore = (initState) => {
  const store = createStore(modules, initState, composeEnhancers(
    applyMiddleware(penderMiddleware())
  ));

  // hot-reloading 를 위한 코드
  if(module.hot) {
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore;