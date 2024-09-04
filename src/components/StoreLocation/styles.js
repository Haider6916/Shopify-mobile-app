import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  selectBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 35,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  selectBarView: {
    flexDirection: 'row',
  },
  notSelectedItem: {
    marginRight: 13,
  },
  storeText: {letterSpacing: 2.75},
  mapView: {
    marginTop: 22,
    borderRadius: 5,
  },
  mapViewLeft: {flex: 0.9},
  mapViewInner: {flexDirection: 'row', padding: 13},
  mapViewRight: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
  locationIcon: {
    height: 52,
    width: 52,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instaIcon: {
    marginRight: 10,
    height: 52,
    width: 52,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
