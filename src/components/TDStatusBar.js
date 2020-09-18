import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {NativeModules} from 'react-native';

const {StatusBarManager} = NativeModules;

const TDStatusBar = () => {
  return (
    <View style={styles.StatusBar}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  StatusBar: {
    height: StatusBarManager.HEIGHT,
    backgroundColor: '#292F36',
  },
});

export default TDStatusBar;
