import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
  },
  line: {
    height: 1,
    flex: 1,
    alignSelf: 'center',
    borderStyle: 'dashed',
    borderBottomWidth: 1.5,
  },
  text: {paddingHorizontal: 5},
});
