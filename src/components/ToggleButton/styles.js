import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainView: {
    height: 50,
    width: 320,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
  },
  firstBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  secondBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
});
