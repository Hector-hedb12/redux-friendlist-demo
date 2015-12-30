import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { createStore, renderDevTools } from '../store_enhancers/devTools';

import FriendListApp from './FriendListApp';
import { default as reducer } from '../reducers/index';

const store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <FriendListApp /> }
        </Provider>

        {renderDevTools(store)}
      </div>
    );
  }
}
