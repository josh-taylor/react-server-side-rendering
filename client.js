import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './app/containers/Root';
import configureStore from './app/store/configure-store';

const store = configureStore({
  todos: [{
    name: 'Test'
  }]
});
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
)

