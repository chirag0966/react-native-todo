import React from 'react';
import {Alert, View} from 'react-native';

const dismissButton = {
  text: 'Ok',
  style: 'cancel',
};

const TDAlert = {
  error: (errorMessage) => {
    return <View>{Alert.alert('Error', errorMessage, [dismissButton])}</View>;
  },
};

export default TDAlert;
