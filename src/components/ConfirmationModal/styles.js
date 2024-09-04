import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: width - 32,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    flex: 1,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
  },
  button2: {
    flex: 1,
    paddingVertical: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  buttonView: {flexDirection: 'row', justifyContent: 'space-between'},
});
