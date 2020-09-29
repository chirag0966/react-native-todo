import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import {of} from 'await-of';
import Icon from 'react-native-vector-icons/Ionicons';

import {addTodoItem} from './../../services/FirestoreService';
import * as Theme from './../../theme';

const AddTodoItem = ({userId}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);

  const onChange = (textValue) => setTodoTitle(textValue);

  const performAddTodoItem = async () => {
    if (todoTitle !== '') {
      setAddButtonDisabled(true);
      Keyboard.dismiss();
      const [, error] = await of(addTodoItem(todoTitle, userId));
      // Enable button and reset input field
      setAddButtonDisabled(false);
      setTodoTitle('');

      if (error) {
        console.log(`Error occured while adding\n ERROR: ${error}`);
        return;
      }
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
        <TouchableOpacity
          style={styles.btn}
          onPress={performAddTodoItem}
          disabled={addButtonDisabled}>
          <Icon
            name="ios-add-circle-sharp"
            size={44}
            color={Theme.CONSTRUCTIVE_COLOR}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: Theme.PRIMARY_COLOR,
  },
  input: {
    flex: 1,
    padding: 16,
    color: Theme.PRIMARY_TEXT_COLOR,
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
