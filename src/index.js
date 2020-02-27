import _ from 'lodash';
import React, {Fragment, Component} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';
import RootNavigator from './navigator';
import {setNavigatorRef} from './services/NavigationService';
import singleton from './singleton';
import SplashScreen from 'react-native-splash-screen';
import {Colors} from './theme';
import HttpServiceManager from './services/HttpServiceManager';
import constant from './constants';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import Spinner, {showSpinner, hideSpinner} from 'react-native-globalspinner';
import Reachability from 'react-native-reachability-popup';

export default class App extends Component {
  componentDidMount() {
    HttpServiceManager.initialize(constant.baseURL, {
      token: constant.applicationToken,
    });
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
      return !_.isEmpty(store.getState().loginReducer.data);
    }
  };
  render() {
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
