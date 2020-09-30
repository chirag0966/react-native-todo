import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {logout} from '../services/AuthenticationService';
import * as Theme from '../theme';

const Header = ({title, userImageURL}) => {
  return (
    <View style={styles.header}>
      {userImageURL && (
        <Image style={styles.userImage} source={{uri: userImageURL}} />
      )}
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => logout()}>
        <Icon name="power-off" size={30} color={Theme.DESTRUCTIVE_COLOR} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Theme.PRIMARY_COLOR,
    padding: 16,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 23,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  userImage: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 40,
  },
});

export default Header;
