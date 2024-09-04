import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainView: {
    paddingHorizontal: 16,
    flexDirection:'column-reverse'
  },
  searchView: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  textInputView: {
    marginVertical: 24,
  },
  filterItemView: {
    marginRight: 10,
  },
  filterView: {
    alignItems: 'center',
    marginTop: 15,
  },

  recentSearchesView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 29,
    marginBottom: 19,
  },
  clearTextView: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
  },
  crossIconView: {
    height: 16,
    width: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconView: {
    marginRight: 3,
  },
  columnWrapperStyle: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  cardsView:{
    marginBottom:80
  },
});
