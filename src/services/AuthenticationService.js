import {useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';

const useAuthentication = () => {
  const [userData, setUserData] = useState({
    loading: true,
    data: null,
  });
  useEffect(() => checkAuthentication((data) => setUserData(data)), []);
  return userData;
};

const checkAuthentication = (onCompletion) => {
  return auth().onAuthStateChanged((userData) => {
    onCompletion({
      loading: false,
      data: userData,
    });
  });
};

const logout = () => {
  return auth().signOut();
};

export {useAuthentication, logout};
