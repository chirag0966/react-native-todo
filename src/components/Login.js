import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

import configFile from './../../config.json';
import * as Constants from './../constants';

const config = JSON.parse(JSON.stringify(configFile));

const onGoogleButtonPress = async () => {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // Sign-in the user with the credential
  auth().signInWithCredential(googleCredential);
};

const Login = () => {
  GoogleSignin.configure({
    webClientId: config.webClientId,
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          onGoogleButtonPress()
            .then(() => console.log('Signed in with Google!'))
            .catch((error) => console.log(`GOOGLE SIGNING ERROR: ${error}`))
        }>
        <Image
          style={styles.loginImg}
          source={{uri: Constants.IMAGE_URL_LOGIN}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  loginImg: {
    height: 100,
    aspectRatio: 1,
  },
});

export default Login;
