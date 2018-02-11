import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './client/Root';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById('root')
)

if(module.hot) {
  module.hot.accept('./client/Root', () => {
    const NextRoot = require('./client/Root').default;
    ReactDOM.render(
      <AppContainer>
        <NextRoot/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

registerServiceWorker();
