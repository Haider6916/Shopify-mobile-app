import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
  Animated,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Icon,
  Icons,
  BirthDatePicker,
} from '../../../components';
import styles from './styles';
import {useTheme} from '../../../config/theme';
import {BaseStyle} from '../../../config/styles';
import {Crossed_Eye, Open_Eye} from '../../../assets';
import {API, useFetchPost} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import {AUTH, COMMON} from '../../../navigation/ROUTES';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserActions} from '../../../redux/actions';
import useMobileNumberValidation from '../../../hooks/useMobileNumberValidation';
import {isNameValid} from '../../../utils/stringOperations';

const SignupForm = ({navigation, route}) => {
  const colors = useTheme();
  const dispatch = useDispatch();
  const email = route.params.email;

  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [goForSignup, setGoForSignUp] = useState(false);
  const [countryCode] = useState('92');
  /** animation functions and methods */
  const [SlideInLeft] = useState(new Animated.Value(0));
  /** datestate will 1 2 3 month day and year respectively */
  const [dateState, setDateState] = useState(1);
  const [dob, setDob] = useState({
    dayIndex: 0,
    day: '',
    monthIndex: 0,
    month: '',
    yearIndex: 0,
    year: '',
  });

  const isPhoNoValid = useMobileNumberValidation(mobileNumber);

  /** api call for signup */
  const signupApi = useFetchPost(
    API.USER_SIGNUP,
    {
      UserName: firstName + lastName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      ContactNumber: `+${countryCode}` + mobileNumber,
      DateOfBirth: `${dob.year}-${dob.month}-${dob.day}`, //moment(dateOfBirth).format('YYYY-MM-DD'),
    },
    goForSignup,
    uuid,
  );

  /** response of api call for signup */
  useEffect(() => {
    if (!signupApi.loading) {
      if (signupApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onSuccessApi(signupApi);
      } else if (
        signupApi.response?.status === GeneralResponses.STATUS_409.CODE
      ) {
        setIsError(true);
        setMessage(signupApi.response?.data?.msg);
      }
    } else {
      console.log('error occured in signup api call');
    }
    setGoForSignUp(false);
  }, [signupApi.loading]);

  /**
   * function on success of api
   * @param {*} signupApi api response
   */
  const onSuccessApi = async signupApi => {
    setMessage(signupApi.response?.data?.msg);
    setIsError(false);
    try {
      await AsyncStorage.removeItem('@userRegister');
      await AsyncStorage.removeItem('@emailVerified');
      await AsyncStorage.setItem('@userRegister', 'true');
      await AsyncStorage.setItem('@emailVerified', 'false');
      dispatch(UserActions.onSetIsUserRegiaster(true));
      dispatch(UserActions.onSetIsEmailVerified(false));
    } catch (e) {
      // save error
    }
    navigation.replace(AUTH.EMAIL_VERIFICATION);
  };

  /**
   * function Called onpress of create Account
   */
  const createAcc = () => {
    setGoForSignUp(true);
  };

  /**
   * function to set date state
   * @param index index will 1 2 3 month day and year respectively
   */
  const selectDOB = index => {
    setDateState(index);
    _start();
  };

  /**
   * function to start date picker animation
   * @returns start animation
   */
  const _start = () => {
    return Animated.parallel([
      Animated.timing(SlideInLeft, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   * function to stop animation
   * @returns stop animation
   */
  const _stop = () => {
    return Animated.parallel([
      Animated.timing(SlideInLeft, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const termCondition = () => {
    navigation.navigate(COMMON.TERMS_CONDITIONS);
  };

  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        {backgroundColor: colors.backgroundColor},
      ]}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={BaseStyle.container}
      >
        <View style={styles.gmail}>
          <Text
            title3
            bold
            numberOfLines={1}
            style={[
              styles.gmailTxt,
              {color: isDarkMode ? colors.highemphasis : colors.mediumemphasis},
            ]}
          >
            {email}
          </Text>
          <Text lowemphasis regular body2>
            {`This is the email we will use to send you order`}
          </Text>
          <Text lowemphasis regular body2>
            {`confirmations. You can always change it in`}
          </Text>
          <Text lowemphasis regular body2>
            {`My Hub-My Details.`}
          </Text>
        </View>
        <Text
          regular
          body2
          style={[
            styles.firstNameAbove,
            {color: isDarkMode ? colors.lowemphasis : colors.faint},
          ]}
        >
          {`Enter the following details to get started...`}
        </Text>
        <View style={styles.tInputView}>
          <TextInput
            placeholder="Enter First Name"
            style={styles.firstNameT}
            value={firstName}
            onChangeText={text => {
              if (isNameValid(text) || text.length < 1) {
                setFirstName(text);
              }
            }}
            maxLength={20}
          />
          <TextInput
            placeholder="Enter Last Name"
            style={styles.lastNameT}
            value={lastName}
            onChangeText={text => {
              if (isNameValid(text) || text.length < 1) {
                setLastName(text);
              }
            }}
            maxLength={20}
          />
        </View>
        <View style={styles.pass}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={passwordSecure}
            style={styles.tInputpass}
            icon={
              <Pressable
                style={styles.eyeBtn}
                onPress={() => setPasswordSecure(!passwordSecure)}
              >
                {passwordSecure ? <Open_Eye /> : <Crossed_Eye />}
              </Pressable>
            }
          />
          <Text iserror regular overline style={styles.moreC}>
            {password.length > 0 &&
              password.length < 8 &&
              `Can be 8 or more characters`}
          </Text>

          <View>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: isDarkMode
                    ? colors.txtInputDarkBack
                    : colors.lightGray,
                },
              ]}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  marginRight: 3,
                  borderColor: colors.mediumemphasis,
                }}
              >
                <Text
                  mediumemphasis
                  style={[
                    styles.prefix,
                    {
                      borderColor: colors.mediumemphasis,
                      backgroundColor: isDarkMode
                        ? colors.txtInputDarkBack
                        : colors.lightGray,
                      color: isDarkMode ? colors.lowemphasis : colors.faint,
                    },
                  ]}
                >
                  {`+${countryCode}`}
                </Text>
              </View>
              <TextInput
                style={{paddingHorizontal: 2}}
                placeholder={
                  mobileNumber.length > 0 ? 'Phone Number' : '3169825658'
                }
                keyboardType="number-pad"
                maxLength={10}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                isPrefix={true}
              />
            </View>
            <Text regular overline iserror>
              {mobileNumber.length > 0 &&
                !isPhoNoValid &&
                `Enter a valid Phone Number`}
            </Text>
          </View>
          <View style={styles.birthDateextra}>
            <Text regular faint overline>{`Birth Date`}</Text>
            <View style={[styles.birthDateContainer]}>
              <Pressable
                testID={'_selectMonth'}
                style={[
                  styles.birthDateItem,
                  {
                    backgroundColor: isDarkMode
                      ? colors.txtInputDarkBack
                      : colors.lightGray,
                  },
                ]}
                onPress={() => selectDOB(1)}
              >
                <Text
                  style={{
                    color: dob.month ? colors.mediumemphasis : colors.faint,
                  }}
                >
                  {dob.month ? dob.month : `Month`}
                </Text>
                <Icon
                  type={'AntDesign'}
                  name={Icons.SELECT_DOWN}
                  color={dob.month ? colors.mediumemphasis : colors.faint}
                  size={15}
                />
              </Pressable>
              <Pressable
                testID={'_selectDate'}
                style={[
                  styles.birthDateItem,
                  {
                    backgroundColor: isDarkMode
                      ? colors.txtInputDarkBack
                      : colors.lightGray,
                  },
                ]}
                onPress={() => selectDOB(2)}
              >
                <Text
                  style={{
                    color: dob.day ? colors.mediumemphasis : colors.faint,
                  }}
                >
                  {dob.day ? dob.day : `Day`}
                </Text>
                <Icon
                  type={'AntDesign'}
                  name={Icons.SELECT_DOWN}
                  color={dob.day ? colors.mediumemphasis : colors.faint}
                  size={15}
                />
              </Pressable>
              <Pressable
                testID={'_selectYear'}
                style={[
                  styles.birthDateItem,
                  {
                    backgroundColor: isDarkMode
                      ? colors.txtInputDarkBack
                      : colors.lightGray,
                  },
                ]}
                onPress={() => selectDOB(3)}
              >
                <Text
                  style={{
                    color: dob.year ? colors.mediumemphasis : colors.faint,
                  }}
                >
                  {dob.year ? dob.year : `Year`}
                </Text>
                <Icon
                  type={'AntDesign'}
                  name={Icons.SELECT_DOWN}
                  color={dob.year ? colors.mediumemphasis : colors.faint}
                  size={15}
                />
              </Pressable>
            </View>
          </View>
          <BirthDatePicker
            SlideInLeft={SlideInLeft}
            _start={_start}
            _stop={_stop}
            setDob={setDob}
            dob={dob}
            dateState={dateState}
            setDateState={setDateState}
          />

          <Text regular overline iserror>
            {isError && message}
          </Text>
        </View>
        <Pressable style={styles.pp} onPress={termCondition}>
          <Text lowemphasis caption2 light>
            {`By continuing you agree to Negative Apparel's`}{' '}
            <Text
              caption2
              medium
              style={{
                color: isDarkMode ? colors.highemphasis : colors.lowemphasis,
              }}
            >{`Terms and Conditions & Privacy Policy`}</Text>
          </Text>
        </Pressable>

        <View style={styles.lastView}>
          <Button
            disabled={
              firstName.length > 0 &&
              lastName.length > 0 &&
              password.length > 7 &&
              mobileNumber.length > 7 &&
              dob.month &&
              dob.year &&
              dob.day
                ? false
                : true
            }
            onPress={createAcc}
            text="CREATE ACCOUNT"
            buttonStyle={styles.createBtn}
            textStyles={[
              styles.createBtnTxt,
              {color: isDarkMode ? colors.btnTxt : colors.whiteColor},
            ]}
            loading={signupApi.loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupForm;
