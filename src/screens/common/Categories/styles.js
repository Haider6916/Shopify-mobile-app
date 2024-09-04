import {StyleSheet, Dimensions} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default StyleSheet.create({
  columnWrapperStyle: {
    marginBottom: 26,
  },
  placeHolderLine1: {
    height: 50,
    width: '100%',
    marginBottom: 24,
    marginTop: 16,
  },
  subscribeInput: {
    marginTop: 14,
    marginBottom: 50,
  },
  listHeader: {
    marginVertical: 30,
  },
  loaderView: {
    position: 'absolute',
    bottom: 200,
    alignSelf: 'center',
    borderRadius: 50,
  },
  crossIcon: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
