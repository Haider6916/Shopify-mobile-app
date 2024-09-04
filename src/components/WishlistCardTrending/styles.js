import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    width: '48%',
    justifyContent: 'space-between',
  },
  image: {
    height: 160,
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  bottomCard: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  bagimage: {
    height: 24,
    width: 24,
  },
  txtView: {
    marginLeft: 9,
    flex: 1,
  },
  favBtn: {
    height: 37,
    width: 37,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
});
