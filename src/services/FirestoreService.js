import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {of} from 'await-of';

import * as Constants from './../constants';

const usersCollection = firestore().collection(Constants.COLLECTION_USERS);

const useTodos = (userId) => {
  const [todosData, setTodosData] = useState({
    error: null,
    loading: true,
    todos: [],
  });
  useEffect(() => getTodosData(userId, (data) => setTodosData(data)), [userId]);
  return todosData;
};

const getTodosData = (userId, onCompletion) => {
  return usersCollection
    .doc(userId)
    .collection(Constants.COLLECTION_TODOS)
    .onSnapshot(
      (snapshot) => {
        onCompletion({
          error: null,
          loading: false,
          todos: snapshot.docs.map((todoDoc) => {
            return {id: todoDoc.id, ...todoDoc.data()};
          }),
        });
      },
      (error) =>
        onCompletion({
          error: error,
          loading: false,
          todos: null,
        }),
    );
};

const getTodoItem = (id, userId) => {
  return usersCollection
    .doc(userId)
    .collection(Constants.COLLECTION_TODOS)
    .doc(id);
};

const addTodoItem = async (itemName, userId) => {
  return usersCollection
    .doc(userId)
    .collection(Constants.COLLECTION_TODOS)
    .add({itemName, isCompleted: false});
};

const removeTodoItem = async (id, userId) => {
  const [docRef, error] = await of(getTodoItem(id, userId).get());
  if (error) {
    console.log(`removeTodoItem Error: ${error}`);
    return;
  }
  docRef.ref.delete();
};

const toggleTodoItem = async (id, userId) => {
  const [docRef, error] = await of(getTodoItem(id, userId).get());
  if (error) {
    console.log(`toggleTodoItem Error: ${error}`);
    return;
  }
  docRef.ref.update({isCompleted: !docRef.data().isCompleted});
};

export {useTodos, addTodoItem, removeTodoItem, toggleTodoItem};
