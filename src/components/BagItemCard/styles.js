import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    borderRadius: 5,
    marginTop:10,
  },
  anotherimage: {
    backgroundColor: 'red',
  },
  imageView: {
    flex: 0.3,
  },
  image: {
    height: 137, //158
    width: 87,
    borderRadius: 5,
  },
  txtMainView: {
    flex: 0.7,
    margin: 14,
  },
  txtView: {
    marginBottom: 7,
  },
  txtSecondView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sizeView: {
    borderWidth: 1,
    paddingHorizontal: 4,
    marginLeft: 7,
    borderRadius: 2,
  },
  btnTxt: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  btnStyle: {
    flex: 1,
    height: 35,
    borderRadius: 5,
    borderWidth: 3,
  },
  linearGradient: {
    position: 'absolute',
    width: 87,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 19,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  currencyPriceView: {
    flexDirection: 'row',
  },
  propCurrency: {
    textDecorationLine: 'line-through',
  },
  propCurrencyPriceView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
    flexDirection: 'row',
  },
  propPrice: {
    textDecorationLine: 'line-through',
    fontWeight: 'bold',
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editBtn: {
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconsView: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
