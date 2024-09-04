import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  livechatView: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop:7,
  },
  livechatView1: {
    flex: 0.6,
  },
  livechatView2: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  livechatButton: {
    borderWidth: 3,
    height: 28,
    width: 84,
    marginTop: 2,
    borderRadius: 5,
    justifyContent:'center',
    alignItems:'center',
  },
  livechatText: {
    fontWeight: '800',
    fontSize: 10,
  },
  itemView: {
    marginTop: 10,
  },
  itemViewImage: {
    height: 24,
    width: 24,
  },
  imageViewStyle: {
    padding: 12,
  },
});
