import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainView: {
    marginTop: 23,
    height: 134,
    flexDirection: 'row',
    borderRadius: 5,
  },
  imageView: {
    flex: 0.3,
  },
  image: {
    height: 134,
    width: 87,
    borderRadius: 5,
  },
  txtMainView: {
    flex: 0.7,
    marginHorizontal: 18,
  },
  txtView: {
    marginBottom: 27,
    marginTop: 16,
  },
  txtSecondView: {
    marginBottom: 9,
  },
  btnDoneTxt: {
    fontSize: 12,
    fontWeight: '800',
  },
  btnDoneStyle: {
    height: 35,
    borderRadius: 5,
  },
  btnCancelTxt: {
    fontSize: 12,
    fontWeight: '800',
  },
  btnCancelStyle: {
    height: 35,
    borderRadius: 5,
    borderWidth: 3,
  },
  sizeTxtView: {
    flexDirection: 'row',
  },
  dropIconView: {
    marginHorizontal: 17,
  },
  btnMainView: {
    flexDirection: 'row',
  },
  cancelBtnView: {
    flex: 0.5,
    marginHorizontal: 5,
  },
  doneBtnView: {
    flex: 0.9,
  },
  plusMinusMainView: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 6,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  plusIcon: {
    marginHorizontal: 4,
  },
});
