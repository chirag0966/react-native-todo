import firestore from '@react-native-firebase/firestore';

import * as Constants from './../constants';

const usersCollection = firestore().collection(Constants.COLLECTION_USERS);

const getTodoItem = (id) => {
  return usersCollection
    .doc(Constants.DOCUMENT_DATA)
    .collection(Constants.COLLECTION_TODOS)
    .doc(id);
};

const getTodoItems = async () => {
  const snapshot = await usersCollection
    .doc(Constants.DOCUMENT_DATA)
    .collection(Constants.COLLECTION_TODOS)
    .get();
  const todos = [];
  snapshot.docs.forEach((todo) => todos.push({id: todo.id, ...todo.data()}));
  return todos;
};

const addTodoItem = async (itemName) => {
  usersCollection
    .doc(Constants.DOCUMENT_DATA)
    .collection(Constants.COLLECTION_TODOS)
    .add({itemName, isCompleted: false})
    .catch((error) => console.log(error));
};

const removeTodoItem = async (id) => {
  getTodoItem(id)
    .get()
    .then((docRef) => docRef.ref.delete())
    .catch((error) => console.log(error));
};

const toggleTodoItem = async (id) => {
  getTodoItem(id)
    .get()
    .then((docRef) => {
      docRef.ref.update({
        isCompleted: !docRef.data().isCompleted,
      });
    })
    .catch((error) => console.log(error));
};

export {getTodoItems, addTodoItem, removeTodoItem, toggleTodoItem};
