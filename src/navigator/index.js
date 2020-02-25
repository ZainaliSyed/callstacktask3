//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:14:05 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Home, Demo} from '../containers';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

// const HomeStack = createStackNavigator({
//   home: {
//     screen: Home,
//   },
//   demo: {
//     screen: Demo,
//   },
// });

const _homeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Demo">
      <Stack.Screen name="Home" component={Demo} />
      <Stack.Screen name="Demo" component={Demo} />
    </Stack.Navigator>
  );
};
const _loginStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Demo" component={Demo} />
    </Stack.Navigator>
  );
};

const rootNavigator = props => {
  return (
    <NavigationContainer>
      {props.userData ? _loginStack() : _homeStack()}
    </NavigationContainer>
  );
};
// const rootNavigator = isUserLoggedIn =>
//   createAppContainer(
//     createSwitchNavigator(
//       {
//         HomeStack,
//       },
//       {
//         initialRouteName: isUserLoggedIn ? 'HomeStack' : 'HomeStack',
//       },
//     ),
//   );

export default rootNavigator;
