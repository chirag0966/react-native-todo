import React from 'react';
import {StyleSheet, View, SectionList, Text} from 'react-native';

import TodoListItem from './TodoListItem';
import AddTodoItem from './AddTodoItem';
import Loader from './../base/Loader';
import TDToast from './../base/TDToast';

import {useTodos} from './../../services/FirestoreService';

const TodoList = () => {
  const {error, loading, todos} = useTodos();

  const renderItem = ({item}) => <TodoListItem item={item} />;

  const itemsForSectionList = () => {
    const allItems = [];
    const completedItems = todos.filter((item) => item.isCompleted);
    const incompletedItems = todos.filter((item) => !item.isCompleted);

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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    TDToast(error);
  }

  return (
    <View style={styles.container}>
      <AddTodoItem />
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
    backgroundColor: '#F0EFEF',
    color: '#aaa',
  },
});

export default TodoList;
