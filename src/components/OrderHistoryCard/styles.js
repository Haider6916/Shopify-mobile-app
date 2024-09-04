import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth:1,
    marginBottom:14,
    paddingLeft:16,
    paddingRight:16,
  },
  orderNameView:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: 13,
  },
  orderIdMainView:{
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  orderIdView:{
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  totalPriceView:{
    flexDirection: 'row',
    marginBottom: 12,
    // justifyContent: 'space-between',
  },
  btnTxtStyle:{
    fontSize: 14, 
    fontWeight: '800',
  },
  btnStyle:{
    width: '37%'
  },
  mapMainView:{
    height: 130,
    flexDirection: 'row',
    paddingTop: 16,
    paddingRight: 16,
    borderTopWidth: 1,
  },
  imageView:{
    flex: 0.7
  },
  imageStyle:{
    height: 98, 
    width: 98
  },
  txtStyle:{
    flex: 1
  },
  sizeColorTxt:{
    marginTop: 5, 
    marginBottom: 5
  },
  priceMainView:{
    flexDirection: 'row'
  },
  quantityTxtView:{
    flex: 1
  },
});
