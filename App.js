import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Header from './components/Header';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <Header title="ToDo's" />
      <TodoList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    display: 'flex',
    flex: 1,
  },
});

export default App;
