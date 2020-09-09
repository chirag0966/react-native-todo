import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TodoListItem = ({item, deleteTodoItem, toggleTodoItemCompletion}) => {
  const topValue = useState(new Animated.Value(0))[0];

  function performDelete() {
    Animated.timing(topValue, {
      toValue: 999,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      deleteTodoItem(item.id);
    });
  }

  return (
    <Animated.View style={[styles.animatedContainer, {top: topValue}]}>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => toggleTodoItemCompletion(item.id)}>
        <Text
          style={
            item.isCompleted
              ? styles.listItemCompletedText
              : styles.listItemText
          }>
          {item.text}
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
});

export default TodoListItem;
