import _ from 'lodash';
import React, {Fragment, Component} from 'react';
// import * as React from 'react';

import {StatusBar, NativeModules, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';
import RootNavigator from './navigator';
import {setNavigatorRef, push} from './services/NavigationService';
import singleton from './singleton';
import SplashScreen from 'react-native-splash-screen';
import {Colors, Metrics} from './theme';
import HttpServiceManager from './services/HttpServiceManager';
import constant from './constants';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import Spinner, {showSpinner, hideSpinner} from 'react-native-globalspinner';
import Reachability from 'react-native-reachability-popup';
import {NavigationContainer} from '@react-navigation/native';
import {Home, Demo} from './containers';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
export default class App extends Component {
  componentDidMount() {
    //   console.log()
    HttpServiceManager.initialize(constant.baseURL, {
      token: constant.applicationToken,
    });
    //set designedAtX verify it on Adobe XD Desgin file
    //Metrics.designedAtX = false;
  }

  state = {isReduxLoaded: false};

  onBeforeLift = () => {
    singleton.storeRef = store;

    this.setState({isReduxLoaded: true}, () => {
      SplashScreen.hide();
    });
  };
  getNavigator = () => {
    if (!this.state.isReduxLoaded) {
      return undefined;
    } else {
      //   return rootNavigator();
      return !_.isEmpty(store.getState().loginReducer.data);
    }
    console.log('ROOOT: ', rootNavigator());
    // return rootNavigator();
  };
  render() {
    // const Navigator = this.getNavigator();
    return (
      <Provider store={store}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.secondary.azure}
        />
        <PersistGate onBeforeLift={this.onBeforeLift} persistor={persistor}>
          <RootNavigator ref={ref => setNavigatorRef(ref)} userData={true} />
        </PersistGate>
        <FlashMessage position="top" />
        <Spinner color={Colors.primary.theme} />
        <Reachability />
      </Provider>
    );
  }
}
