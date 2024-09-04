import {I18nManager, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInputStyle: {
    flex: 1,
    height: '100%',
    textAlign: I18nManager.isRTL ? 'right' : 'auto',
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: `Lato-Regular`,
  },
  button: {
    flex: 0.5,
    height: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
