import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

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
      addTodoItem(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter todo item name"
        onChangeText={onChange}
        ref={textInputRef}
      />
      <TouchableOpacity style={styles.btn} onPress={performAddTodoItem}>
        <Text style={styles.btnText}>
          <Icon name="plus-circle" size={30} color="#3CB371" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#eee',
  },
  input: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    color: '#666666',
    borderRadius: 999,
  },
  btn: {
    height: '100%',
    padding: 8,
  },
  btnText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default AddTodoItem;
