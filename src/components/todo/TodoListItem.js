import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as Constants from '../../constants';

import {removeTodoItem, toggleTodoItem} from '../../services/FirestoreService';

const TodoListItem = ({item}) => {
  const topValue = useState(new Animated.Value(0))[0];

  const performDelete = () => {
    Animated.timing(topValue, {
      toValue: 999,
      duration: Constants.DURATION_TODO_DELETE,
      useNativeDriver: true,
    }).start(() => removeTodoItem(item.id));
  };

  return (
    <Animated.View
      style={[styles.animatedContainer, {transform: [{translateX: topValue}]}]}>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => toggleTodoItem(item.id)}>
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
        <Icon name="trash" size={24} color="#FF6B6B" />
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
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  },
  listItem: {
    flex: 1,
  },
  listItemText: {
    fontSize: 16,
    flex: 1,
    color: '#666666',
  },
  listItemCompletedText: {
    fontSize: 16,
    flex: 1,
    color: '#c8c8c8',
    textDecorationLine: 'line-through',
  },
  btn: {
    paddingLeft: 16,
  },
});

export default TodoListItem;
