import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    bottom: 0,
    width: width,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 2,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconsView: {
    width: '30%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    marginRight: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    height: height / 1.5,
    width: width,
    marginBottom: 29,
  },
  valuesView: {
    marginTop: 10,
  },
  productDetailsView: {
    marginHorizontal: 14,
  },
  headerIcons: {
    position: 'absolute',
    top: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 3,
  },
  txtView: {
    marginBottom: 14,
  },
  flatListView: {
    marginBottom: 30,
  },
  cardTrendingView: {
    // marginRight: 16,
  },
  cardTrendingStyle: {
    width: '130%',
  },
  scrollView: {
    flexDirection: 'row',
  },
  card: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorFlatList: {
    marginBottom: 30,
  },
  btn: {
    width: '65%',
  },
  bannerView: {
    marginTop: 34,
    marginBottom: 27,
  },
  productDetailsTxtView: {
    marginBottom: 13,
  },
  htmlRenderMainView: {
    marginTop: 34,
  },
  selectedItemStyle: {
    height: 40,
    width: 75,
  },
  selectedItemView: {
    marginRight: 6,
  },

  firstView: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
  },
  colorTxtView: {
    flex: 0.5,
  },
  colorView: {
    flex: 0.5,
  },
});
