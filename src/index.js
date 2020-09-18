import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import Header from './components/Header';
import TodoList from './components/TodoList';
import TDStatusBar from './components/TDStatusBar';

const App = () => {
  return (
    <View style={styles.appContainer}>
      <TDStatusBar />
      <SafeAreaView style={styles.appContainer}>
        <Header title="ToDo's" />
        <TodoList />
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
