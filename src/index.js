import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

import auth from '@react-native-firebase/auth';

import Header from './components/base/Header';
import TodoList from './components/todo/TodoList';
import TDStatusBar from './components/base/TDStatusBar';
import Login from './components/Login';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (_user) => {
    setUser(_user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  if (initializing) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.appContainer}>
      <TDStatusBar />
      <SafeAreaView style={styles.appContainer}>
        <Header title="ToDo's" userImageURL={user ? user.photoURL : null} />
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
