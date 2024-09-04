import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  birthDateContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  birthDateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    // backgroundColor: '#F5F5F5',
    width: '30%',
    paddingTop: 14,
    paddingBottom: 14,
    justifyContent: 'space-between',
    paddingRight: 6,
    paddingLeft: 6,
    marginTop: 11,
    // borderWidth: 1,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  topDataContainer: {
    width: '30%',
    padding: 2,
    height: 290,
    // marginTop: -2,
  },
});
