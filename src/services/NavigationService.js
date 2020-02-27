//

import {
  NavigationContainer,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';

let navigatorRef;

const setNavigatorRef = ref => (navigatorRef = ref);
const getNavigatorRef = () => navigatorRef;

const push = (routeName, params = {}) =>
  navigatorRef.dispatch(NavigationActions.navigate({routeName, params}));

const pop = (popCount = 1, params = {}) =>
  navigatorRef.dispatch(
    StackActions.pop(({n: popCount, params} = {n: 1, params: {}})),
  );

const popToTop = () => navigatorRef.dispatch(StackActions.popToTop());
const reset = () => {
  const actionToDispatch = StackActions.reset({
    index: 0,
    key: 'Auth', //Stack name
    actions: [NavigationActions.navigate({routeName: 'your route name'})],
  });
  navigatorRef.dispatch(actionToDispatch);
};
const openDrawer = () => navigatorRef.dispatch(DrawerActions.openDrawer());
const closeDrawer = () => navigatorRef.dispatch(DrawerActions.closeDrawer());

export {
  setNavigatorRef,
  getNavigatorRef,
  push,
  pop,
  openDrawer,
  closeDrawer,
  popToTop,
  reset,
};
