import {StyleSheet} from 'react-native';
import {BaseColor} from '../../config/theme';

export default StyleSheet.create({
  mainView: {
    marginTop: 23,
    height: 72,
    flexDirection: 'row',
    borderRadius: 5,
  },
  mainView2: {
    marginTop: 15,
    height: 100,
    flexDirection: 'row',
    borderRadius: 5,
  },
  imageView: {
    flex: 0.17,
  },
  imageView2: {
    flex: 0.25,
  },
  image: {
    height: 72,
    width: 47,
    borderRadius: 5,
  },
  image2: {
    height: 100,
    width: 65,
    borderRadius: 5,
  },
  textMainView2: {
    flex: 0.8,
    justifyContent: 'center',
  },
  textMainView: {
    alignSelf: 'center',
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textView: {
    flex: 0.8,
  },
  textView2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateView: {
    justifyContent: 'flex-end',
  },
});
