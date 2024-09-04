import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('screen');
export default StyleSheet.create({
  mediaPlayer: {
    borderRadius: 5,
    height: 180,
    width: width - 32,
    backgroundColor: 'black',
  },
  txtFirstView: {
    position: 'absolute',
    height: 180,
    width: width - 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    letterSpacing: 3.65,
    lineHeight: 25,
  },
});
