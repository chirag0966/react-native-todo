import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import Header from './components/Header';
import TodoList from './components/TodoList';
import TDStatusBar from './components/TDStatusBar';

import Login from './components/Login';
import auth from '@react-native-firebase/auth';

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(_user) {
    console.log(_user);
    setUser(_user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  if (initializing) {
    return null;
  }

  return (
    <View style={styles.appContainer}>
      <TDStatusBar />
      <SafeAreaView style={styles.appContainer}>
        <Header title="ToDo's" userImageURL={user.photoURL} />
        {user ? <TodoList /> : <Login />}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    display: 'flex',
    flex: 1,
  },
  statusBar: {
    height: '100',
  },
});

export default App;
