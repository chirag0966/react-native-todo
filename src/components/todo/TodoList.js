import React from 'react';
import {StyleSheet, View, SectionList, Text} from 'react-native';

import TodoListItem from './TodoListItem';
import AddTodoItem from './AddTodoItem';
import TDLoader from '../common/TDLoader';
import TDError from '../common/TDError';

import * as Theme from '../../theme';
import * as Validator from './../../utilities/validations';

import {useTodos} from './../../services/FirestoreService';
import {TITLE_COMPLETED, TITLE_INCOMPLETED} from './../../constants';

const TodoList = ({userId}) => {
  const {error, loading, todos} = useTodos(userId);

  const renderItem = ({item}) => <TodoListItem item={item} userId={userId} />;

  const itemsForSectionList = () => {
    return todos
      .reduce(
        (accumulator, currentValue) => {
          const title = currentValue.isCompleted
            ? TITLE_COMPLETED
            : TITLE_INCOMPLETED;
          accumulator
            .find((data) => data.title === title)
            .data.push(currentValue);
          return accumulator;
        },
        [
          {
            title: TITLE_INCOMPLETED,
            data: [],
          },
          {
            title: TITLE_COMPLETED,
            data: [],
          },
        ],
      )
      .filter((item) => !Validator.isEmpty(item.data));
  };

  if (loading) {
    return <TDLoader />;
  }

  if (error) {
    return <TDError error={error} />;
  }

  return (
    <View style={styles.container}>
      <AddTodoItem userId={userId} />
      <SectionList
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
  sectionHeader: {
    fontSize: 17,
    fontWeight: '500',
    padding: 16,
    backgroundColor: Theme.SECONDARY_COLOR,
    color: Theme.SECONDARY_TEXT_COLOR,
  },
});

export default TodoList;
