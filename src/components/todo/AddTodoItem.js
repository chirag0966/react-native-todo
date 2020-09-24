import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {addTodoItem} from './../../services/FirestoreService';

const AddTodoItem = ({userId}) => {
  const [todoTitle, setTodoTitle] = useState('');

  const onChange = (textValue) => setTodoTitle(textValue);

  const performAddTodoItem = () => {
    if (todoTitle !== '') {
      Keyboard.dismiss();
      addTodoItem(todoTitle, userId)
        .then(() => setTodoTitle(''))
        .catch((error) =>
          console.log(`Error occured while adding\n ERROR: ${error}`),
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Enter todo item name"
          onChangeText={onChange}
          autoCorrect={false}
          value={todoTitle}
        />
        <TouchableOpacity style={styles.btn} onPress={performAddTodoItem}>
          <Icon name="ios-add-circle-sharp" size={44} color="#4ECDC4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#292F36',
  },
  input: {
    flex: 1,
    padding: 16,
    color: '#777',
    fontSize: 17,
  },
  btn: {
    padding: 8,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 999,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

export default AddTodoItem;
