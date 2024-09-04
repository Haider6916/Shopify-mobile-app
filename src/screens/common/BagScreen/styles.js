import {StyleSheet, I18nManager} from 'react-native';
import {BaseColor} from '../../../config/theme';

export default StyleSheet.create({
  bagCompView: {
    flex: 1,
    paddingTopS: 24,
    justifyContent: 'space-between',
  },
  bagItemsView: {
    marginHorizontal: 16,
  },
  discount: {
    paddingHorizontal: 16,
    paddingVertical: 20,
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
  input: {
    flex: 0.65,
    height: 30,
  },
  buttonStyle: {
    flex: 0.35,
    marginLeft: 10,
    borderWidth: 3,
    height: 30,
  },
  textStyles: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  main: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  mainInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  amountView: {
    flex: 1,
  },
  crossIcon: {
    height: 12,
    width: 12,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  crossView: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
