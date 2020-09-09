import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TodoListItem = ({item, deleteTodoItem}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.listItem}>{item.text}</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => deleteTodoItem(item.id)}>
        <Icon name="trash" size={20} color="#FA8072" />
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
    fontSize: 17,
    flex: 1,
    color: '#666666',
  },
  btn: {
    height: '100%',
  },
});

export default TodoListItem;
