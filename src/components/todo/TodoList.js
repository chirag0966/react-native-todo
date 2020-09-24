import React from 'react';
import {StyleSheet, View, SectionList, Text} from 'react-native';

import TodoListItem from './TodoListItem';
import AddTodoItem from './AddTodoItem';
import Loader from './../base/Loader';
import TDToast from './../base/TDToast';

import {useTodos} from './../../services/FirestoreService';
import {TITLE_COMPLETED, TITLE_INCOMPLETED} from './../../constants';

const TodoList = ({userId}) => {
  const {error, loading, todos} = useTodos(userId);

  const renderItem = ({item}) => <TodoListItem item={item} userId={userId} />;

  const itemsForSectionList = () => {
    const reduceTodos = (accumulator, currentValue) => {
      const title = currentValue.isCompleted
        ? TITLE_COMPLETED
        : TITLE_INCOMPLETED;
      accumulator.find((data) => data.title === title) ||
        accumulator.push({title, data: []});

      accumulator.find((data) => data.title === title).data.push(currentValue);

      return accumulator;
    };

    return todos.reduce(reduceTodos, []);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    TDToast(error);
  }

  return (
    <View style={styles.container}>
      <AddTodoItem userId={userId} />
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
