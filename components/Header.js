import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'darkslateblue',
    padding: 16,
  },
  title: {
    fontSize: 23,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Header;
