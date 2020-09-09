import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {Buffer} from 'buffer';
global.Buffer = Buffer; // very important

import uuid from 'react-native-uuid';
import TodoListItem from './TodoListItem';
import AddTodoItem from './AddTodoItem';

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);

  const addTodoItem = (text) => {
    setTodoItems((previousItems) => {
      return [{id: uuid.v4(), text}, ...previousItems];
    });
  };

  const deleteTodoItem = (id) => {
    setTodoItems((previousItems) => {
      return previousItems.filter((item) => item.id !== id);
    });
  };

  const renderItem = ({item}) => (
    <TodoListItem item={item} deleteTodoItem={deleteTodoItem} />
  );

  return (
    <View style={styles.container}>
      <AddTodoItem addTodoItem={addTodoItem} />
      <FlatList
        style={styles.list}
        data={todoItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default TodoList;
