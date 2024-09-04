import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  firstView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  productDesView: {
    marginBottom: 4,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountView: {
    marginLeft: 9,
  },
  discountTxt: {
    textDecorationLine: 'line-through',
  },
  selectSizeMainView: {
    flexDirection: 'row',
  },
  heartIconView: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  heartIcon: {
    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 0.8,
  },
});
