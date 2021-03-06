import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import AppNavigator from './navigators/AppNavigator';
import ErrorModalContainer from './containers/ErrorModalContainer';
import ServiceManager from './services/ServiceManager';
import getAppWithNavigationState from './getAppWithNavigationState';
import createStore from './createStore';

const navReducer = (state, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const store = createStore(navReducer);
const AppWithNavigationState = getAppWithNavigationState();

export default class App extends Component {
  constructor() {
    super(...arguments);
    this._services = new ServiceManager(store);
  }

  componentDidMount() {
    this._services.start();
  }

  componentWillUnmount() {
    this._services.stop();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <AppWithNavigationState />
          <ErrorModalContainer />
        </View>
      </Provider>
    );
  }
}
