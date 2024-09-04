import {StyleSheet, Dimensions} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default StyleSheet.create({
  placeHolderLine1: {
    height: 55,
  },
  firstLoaderView: {
    margin: 18,
  },
  secondLoaderView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
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
  flatlistView: {
    paddingHorizontal: 16,
  },
  columnWrapperStyle: {
    justifyContent:'space-around',
    marginBottom: 20,
  },
  searchView: {
    marginVertical: 14,
  },
  countView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
    alignItems: 'center',
  },
  titles: {
    textTransform: 'uppercase',
  },
  filterView: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 12,
  },
  filterItem: {
    flex: 1,
    marginRight: 10,
  },
  cardsView: {paddingHorizontal: 16},
  loaderView: {
    position: 'absolute',
    bottom: 10,
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
