import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  firstView: {
    flex: 1,
    marginTop: 18,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  prefix: {
    paddingHorizontal: 10,
  },
  tInputView: {
    flexDirection: 'row',
    marginVertical: 22,
    justifyContent: 'space-between',
  },
  firstNameT: {
    flex: 0.47,
  },
  lastNameT: {
    flex: 0.47,
  },
  tInputpass: {},
  moreC: {
    marginBottom: 15,
  },
  dob: {
    marginBottom: 20,
  },
  pass: {},
  pp: {
    marginBottom: 13,
  },
  eyeBtn: {
    height: '100%',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastView: {
    marginBottom: 23,
  },
  createBtn: {
    borderRadius: 5,
  },
  createBtnTxt: {
    fontWeight: '800',
    fontSize: 18,
  },
  tInput: {
    marginBottom: 7,
  },

  birthDateextra: {marginTop: 1.5},
  birthDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    marginBottom: 35,
  },
  birthDateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 7,
    width: '30%',
    justifyContent: 'space-between',
  },
});
