import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import * as Constants from './../constants';

const usersCollection = firestore().collection(Constants.COLLECTION_USERS);

const useTodos = () => {
  const [todosData, setTodosData] = useState(createTodosData());
  useEffect(() => getTodosData((data) => setTodosData(data)), []);
  return todosData;
};

const createTodosData = (data) => {
  const todosData = {
    error: null,
    loading: true,
    todos: [],
  };
  // Initial state
  if (data === undefined) {
    return todosData;
  }
  // loading stops
  todosData.loading = false;
  // Data is error
  if (typeof data === 'string') {
    todosData.error = data;
    return todosData;
  }
  // Data is an array
  if (data instanceof Array) {
    todosData.todos = data;
    return todosData;
  }
};

const getTodosData = (onCompletion) => {
  return usersCollection
    .doc(Constants.DOCUMENT_DATA)
    .collection(Constants.COLLECTION_TODOS)
    .onSnapshot(
      (snapshot) => {
        const todos = [];
        snapshot.docs.forEach((todoDoc) =>
          todos.push({id: todoDoc.id, ...todoDoc.data()}),
        );
        onCompletion(createTodosData(todos));
      },
      (error) => onCompletion(createTodosData(error)),
    );
};

const getTodoItem = (id) => {
  return usersCollection
    .doc(Constants.DOCUMENT_DATA)
    .collection(Constants.COLLECTION_TODOS)
    .doc(id);
};

const addTodoItem = async (itemName) => {
  return usersCollection
    .doc(Constants.DOCUMENT_DATA)
    .collection(Constants.COLLECTION_TODOS)
    .add({itemName, isCompleted: false});
};

const removeTodoItem = async (id) => {
  getTodoItem(id)
    .get()
    .then((docRef) => docRef.ref.delete())
    .catch((error) => console.log(`removeTodoItem Error: ${error}`));
};

const toggleTodoItem = async (id) => {
  getTodoItem(id)
    .get()
    .then((docRef) =>
      docRef.ref.update({isCompleted: !docRef.data().isCompleted}),
    )
    .catch((error) => console.log(`toggleTodoItem Error: ${error}`));
};

export {useTodos, addTodoItem, removeTodoItem, toggleTodoItem};
