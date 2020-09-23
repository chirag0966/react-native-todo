import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.loader} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loader: {
    borderRadius: 10,
    width: 64,
    aspectRatio: 1,
  },
});

export default Loader;
