import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('screen').width;

export default StyleSheet.create({
  card: {
    borderRadius: 5,
    height: 183,
  },
  card1: {
    flex: 1,
    paddingLeft: 15,
    paddingVertical: 15,
    justifyContent: 'center',
    paddingHorizontal:16
  },
  card2: {
    flex: 0.5,
  },
  text1: {
    marginBottom: 7,
  },
  text2: {
    marginBottom: 9,
  },
  imageStyle: {
    height: 183,
    width: '100%',
    borderRadius: 5,
  },
  imageStyle2: {
    height: 183,
    width: '100%',
    borderRadius: 5,
  },
});
