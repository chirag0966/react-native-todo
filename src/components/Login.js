import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

const Login = () => {
  GoogleSignin.configure({
    webClientId:
      '436445967056-58acg2o4fjtqoee0m8idaafjnt5gpsdd.apps.googleusercontent.com',
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }>
        <Text>Login with google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  loginBtn: {
    fontSize: 23,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Login;
