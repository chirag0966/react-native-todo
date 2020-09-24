import {useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';

const useAuthentication = () => {
  const [userData, setUserData] = useState(createUserData());
  useEffect(() => checkAuthentication((data) => setUserData(data)), []);
  return userData;
};

const createUserData = (value) => {
  const userData = {
    loading: true,
    data: null,
  };
  // Initial state
  if (value === undefined) {
    return userData;
  }
  // loading stops
  userData.loading = false;
  // value is an object
  if (value instanceof Object) {
    userData.data = value;
    return userData;
  }
  return userData;
};

const checkAuthentication = (onCompletion) => {
  return auth().onAuthStateChanged((userData) => {
    onCompletion(createUserData(userData));
  });
};

const logout = () => {
  return auth().signOut();
};

export {useAuthentication, logout};
