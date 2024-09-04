import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  firstLoaderView: {
    marginTop: 23,
    marginHorizontal: 16,
  },
  placeHolderLine1: {
    height: 180,
    width: width - 32,
  },
  placeHolderLine2: {
    height: 180,
    width: width - 32,
    marginBottom: 16,
  },
  secondLoaderView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  placeHolderLine3: {
    height: 250,
    width: width / 2 - 24,
  },
  placeHolderLine4: {
    height: 70,
    width: width / 2 - 24,
  },
  viewstyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageConatiner: {
    height: 280,
    width: width / 2,
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedItem: {
    marginRight: 25,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  notSelectedItem: {
    marginRight: 25,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  main: {
    marginVertical: 0,
  },
  carousel: {
    marginTop: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredCard: {
    marginTop: 26,
  },
  seperator: {
    marginVertical: 25,
  },
  flatlistView: {
    marginTop: 13,
  },
  arivalFeaturedCard: {
    marginTop: 30,
  },
  subscribeView: {
    marginTop: 20,
  },
  subscribeInput: {
    marginTop: 14,
  },
  sliderText: {
    alignItems: 'center',
  },
  listHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});
