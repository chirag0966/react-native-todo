import React, {useState} from 'react';
import {StyleSheet, View, SectionList, Text} from 'react-native';

import {Buffer} from 'buffer';
global.Buffer = Buffer; // very important

import uuid from 'react-native-uuid';
import TodoListItem from './TodoListItem';
import AddTodoItem from './AddTodoItem';

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);

  const addTodoItem = (text) => {
    setTodoItems((previousItems) => {
      return [{id: uuid.v4(), text, isCompleted: false}, ...previousItems];
    });
  };

  const deleteTodoItem = (id) => {
    setTodoItems((previousItems) => {
      return previousItems.filter((item) => item.id !== id);
    });
  };

  const toggleTodoItemCompletion = (id) => {
    setTodoItems((previousItems) => {
      return previousItems.map((item) => {
        if (item.id === id) {
          item.isCompleted = !item.isCompleted;
        }
        return item;
      });
    });
  };

  const renderItem = ({item}) => (
    <TodoListItem
      item={item}
      deleteTodoItem={deleteTodoItem}
      toggleTodoItemCompletion={toggleTodoItemCompletion}
    />
  );

  const itemsForSectionList = () => {
    const completedItems = todoItems.filter((item) => {
      return item.isCompleted;
    });

    const incompletedItems = todoItems.filter((item) => {
      return !item.isCompleted;
    });

    const allItems = [];

    if (incompletedItems != null && incompletedItems.length !== 0) {
      allItems.push({
        title: 'Incompleted',
        data: incompletedItems,
      });
    }

    if (completedItems != null && completedItems.length !== 0) {
      allItems.push({
        title: 'Completed',
        data: completedItems,
      });
    }

    return allItems;
  };

  return (
    <View style={styles.container}>
      <AddTodoItem addTodoItem={addTodoItem} />
      <SectionList
        style={styles.list}
        sections={itemsForSectionList()}
        renderItem={renderItem}
        keyExtractor={(item, index) => index + item.id}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
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
  sectionHeader: {
    fontSize: 17,
    fontWeight: '500',
    padding: 16,
    backgroundColor: '#FAF9F9',
    color: '#292F36',
  },
});

export default TodoList;
