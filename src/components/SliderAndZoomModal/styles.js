import { Platform } from 'react-native';
import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: width,
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
  modalText: {},
  buttonView: {flexDirection: 'row', justifyContent: 'space-between'},
  containerStyle: {
    position: 'absolute',
    bottom: 0,
    width: width,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  inactiveDotStyles: {
    borderWidth: 1,
  },
  sliderImageStyle: {
    height: height / 1.7,
    width: width,
  },
  headerIcons: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 105  : 50,
    alignSelf: 'flex-end',
    right: 24,
    backgroundColor:'red',
    borderRadius:15,
    height:25,
    width:25,
    justifyContent:'center',
    alignItems:'center',
  },
  card: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
