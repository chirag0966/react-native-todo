import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TodoListItem = ({item, deleteTodoItem, toggleTodoItemCompletion}) => {
  return (
    <View style={styles.container}>
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
      <TouchableOpacity
        style={styles.btn}
        onPress={() => deleteTodoItem(item.id)}>
        <Icon name="trash" size={30} color="#FA8072" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItem: {
    flex: 1,
  },
  listItemText: {
    fontSize: 17,
    flex: 1,
    color: '#666666',
  },
  listItemCompletedText: {
    fontSize: 17,
    flex: 1,
    color: '#c8c8c8',
    textDecorationLine: 'line-through',
  },
  btn: {
    height: '100%',
  },
});

export default TodoListItem;
