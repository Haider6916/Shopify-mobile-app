import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  viewstyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTopBarView: {
    flexDirection: 'row',
  },
  selectedItem: {
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  notSelectedItem: {
    marginRight: 25,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 48,
    alignItems: 'center',
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  flatlistView: {
    marginTop: 16,
  },
  bagCompView: {
    flex: 1,
    marginTop: 24,
    justifyContent: 'space-between',
  },
  bagItemsView: {
    marginHorizontal: 16,
  },
  discountInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowIcon: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  openedView: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  main: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 35,
  },
  mainInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  amountView: {
    flex: 1,
  },
});
