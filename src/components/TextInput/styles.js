import {I18nManager, StyleSheet} from 'react-native';

export default StyleSheet.create({
  input: {
    fontFamily: `Lato-Regular`,
    flex: 1,
    height: '100%',
    textAlign: I18nManager.isRTL ? 'right' : 'auto',
    paddingTop: 5,
    paddingBottom: 5,
  },
});
