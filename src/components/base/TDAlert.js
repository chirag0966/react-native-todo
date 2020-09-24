import {Alert} from 'react-native';

const dismissButton = {
  text: 'Ok',
  style: 'cancel',
};

const TDAlert = {
  error: (errorMessage) => {
    Alert.alert('Error', errorMessage, [dismissButton]);
  },
};

export default TDAlert;
