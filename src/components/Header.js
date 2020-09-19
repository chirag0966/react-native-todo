import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const Header = ({title, userImageURL}) => {
  return (
    <View style={styles.header}>
      <Image style={styles.userImage} source={{uri: userImageURL}} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#292F36',
    padding: 16,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    marginLeft: 16,
  },
  userImage: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 40,
  },
});

export default Header;
