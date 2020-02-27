import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Home, Demo} from '../containers';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const _loginStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Demo" component={Demo} />
    </Stack.Navigator>
  );
};

const rootNavigator = props => {
  return <NavigationContainer>{_loginStack()}</NavigationContainer>;
};

export default rootNavigator;
