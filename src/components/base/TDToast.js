import Toast from 'react-native-root-toast';

const TDToast = (message) => {
  Toast.show(message, {
    position: Toast.positions.BOTTOM - 30,
  });
};

export default TDToast;
