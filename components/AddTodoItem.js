import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const AddTodoItem = ({addTodoItem}) => {
  const [text, setText] = useState('');
  const textInputRef = useRef(null);

  const onChange = (textValue) => {
    setText(textValue);
  };

  const performAddTodoItem = () => {
    if (text !== '') {
      setText('');
      textInputRef.current.clear();
      Keyboard.dismiss();
      addTodoItem(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Enter todo item name"
          onChangeText={onChange}
          ref={textInputRef}
          autoCorrect={false}
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
    backgroundColor: '#292F36',
  },
  input: {
    flex: 1,
    padding: 20,
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
