import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import Header from './components/Header';
import Login from './components/Login';
import TDStatusBar from './components/common/TDStatusBar';
import TDLoader from './components/common/TDLoader';
import TodoList from './components/todo/TodoList';

import {useAuthentication} from './services/AuthenticationService';

const App = () => {
  const {loading, data} = useAuthentication();

  if (loading) {
    return <TDLoader />;
  }

  return (
    <View style={styles.appContainer}>
      <TDStatusBar />
      <SafeAreaView style={styles.appContainer}>
        {data ? (
          <View style={styles.appContainer}>
            <Header title="ToDo's" userImageURL={data.photoURL} />
            <TodoList userId={data.uid} />
          </View>
        ) : (
          <Login />
        )}
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
