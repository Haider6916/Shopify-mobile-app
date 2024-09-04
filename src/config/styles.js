import {StyleSheet} from 'react-native';

/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
  textInput: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
