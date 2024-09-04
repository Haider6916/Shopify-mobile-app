import {StyleSheet, Dimensions} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default StyleSheet.create({
  flatlistView: {
    paddingHorizontal: 16,
  },
  columnWrapperStyle: {
    marginBottom: 20,
  },
  searchView: {
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  countView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 26,
  },
  cardsView: {
    paddingHorizontal: 16,
  },
    placeHolderLine1: {
    height: 55,
  },
  placeHolderLine2: {
    height: 250,
    width: width / 2 - 24,
  },
  placeHolderLine3: {
    height: 70,
    width: width / 2 - 24,
    top: -8,
  },
  firstLoaderView: {
    margin: 18,
  },
  secondLoaderView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
  },
});
