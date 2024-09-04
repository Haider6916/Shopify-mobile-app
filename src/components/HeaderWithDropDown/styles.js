import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  headerView1: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  headerView2: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerView3: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  view1Text: {
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  view2Icon: {
    marginLeft: 6,
  },
});
