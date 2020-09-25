import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as Constants from '../../constants';
import * as Theme from '../../theme';

import {removeTodoItem, toggleTodoItem} from '../../services/FirestoreService';

const TodoListItem = ({item, userId}) => {
  const topValue = useState(new Animated.Value(0))[0];

  const performDelete = () => {
    Animated.timing(topValue, {
      toValue: 999,
      duration: Constants.DURATION_TODO_DELETE,
      useNativeDriver: true,
    }).start(() => removeTodoItem(item.id, userId));
  };

  return (
    <Animated.View
      style={[styles.animatedContainer, {transform: [{translateX: topValue}]}]}>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => toggleTodoItem(item.id, userId)}>
        <Text
          style={
            item.isCompleted
              ? styles.listItemCompletedText
              : styles.listItemText
          }>
          {item.itemName}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={performDelete}>
        <Icon name="trash" size={24} color={Theme.DESTRUCTIVE_COLOR} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomColor: Theme.SECONDARY_COLOR,
    borderBottomWidth: 1,
  },
  listItem: {
    flex: 1,
  },
  listItemText: {
    fontSize: 16,
    flex: 1,
    color: Theme.PRIMARY_TEXT_COLOR,
  },
  listItemCompletedText: {
    fontSize: 16,
    flex: 1,
    color: Theme.SECONDARY_TEXT_COLOR,
    textDecorationLine: 'line-through',
  },
  btn: {
    paddingLeft: 16,
  },
});

export default TodoListItem;
