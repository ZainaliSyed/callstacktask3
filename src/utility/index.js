import {Alert, Linking} from 'react-native';
class utility {
  isPlatformAndroid = () => Platform.OS === 'android';
  isPlatformIOS = () => Platform.OS === 'ios';

  validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };
  alerts = (title, description, onPress) => {
    Alert.alert(
      title,
      description,
      [
        {text: 'OK', onPress: onPress},
        {text: 'Cancel', onPress: () => {}},
      ],
      {
        cancelable: false,
      },
    );
  };
}

export default new utility();
