import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  noticeViewNotExpanded: {
    flexDirection: 'row',
    marginBottom: 11,
    backgroundColor: '#EDEDED',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  noticeViewExpanded: {
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    padding: 16,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    alignItems: 'center',
  },
  navigationViewHeaderText: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    marginBottom: 11,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingTop: 10,
  },
});
