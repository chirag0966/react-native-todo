import React from 'react';
import {StyleSheet, Text} from 'react-native';

import * as Theme from '../../theme';

const TDError = ({error}) => {
  return <Text style={styles.text}>{error}</Text>;
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: Theme.DESTRUCTIVE_COLOR,
    color: 'white',
    padding: 4,
    textAlign: 'center',
  },
});

export default TDError;
