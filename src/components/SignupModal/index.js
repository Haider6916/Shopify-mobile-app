/**
 * signup modal component
 * @param param0 props accepted by this component
 * @returns React Component
 */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
import {TextInput, Text, Button, Icon, Icons, BirthDatePicker} from '..';
import {useTheme} from '../../config/theme';
import {Open_Eye, Crossed_Eye} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {API, useFetchPost} from '../../services';
import {GeneralResponses} from '../../services/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserActions} from '../../redux/actions';
import useEmailValidation from '../../hooks/useEmailValidation';
import useMobileNumberValidation from '../../hooks/useMobileNumberValidation';
import {isNameValid} from '../../utils/stringOperations';
import Toast from 'react-native-simple-toast';

const SignupModal = props => {
  const {
    visible,
    onSwipeComplete,
    swipeDown = true,
    onBackdropPress = false,
    emailOnLoginPress,
    endVarification,
    indicate = '1',
  } = props;
  const colors = useTheme();

  const [email, setEmail] = useState('');
  const [goForResend, setGoForResend] = useState(false);
  const [indicator, setIndicator] = useState(indicate); // 1 for email screen, 2 for signupform, 3 is for verification screen

  /** api call for Resending Verfication code */
  const resendApi = useFetchPost(
    API.RESEND_CODE,
    {
      email: email,
    },
    goForResend,
  );

  /** response of api call  for Resending Verfication code */
  useEffect(() => {
    if (!resendApi.loading) {
      if (resendApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        // onSuccessApi(resendApi.response?.data);
        Toast.show(resendApi.response?.data.msg, Toast.SHORT);
      }
    } else {
      console.log('error occured while Resending the Code');
    }
    setGoForResend(false);
  }, [resendApi.loading]);

  /**
   * function called onpress of Next
   */
  const saveEmail = async () => {
    try {
      await AsyncStorage.setItem('@userEmail', email);
    } catch (e) {
      // save error
    }
    setIndicator('2');
  };

  /**
   * function called onpress of resend
   */
  const onResendPress = () => {
    setGoForResend(true);
  };

  /** line component */
  const Line = () => {
    return (
      <View
        style={{
          height: 5,
          backgroundColor: colors.faint,
          width: 120,
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: 10,
        }}
      />
    );
  };


 
  return (
    <Modal
      isVisible={visible}
      {...(swipeDown ? {swipeDirection: 'down'} : {})}
      style={styles.bottomModal}
      backdropOpacity={0.5}
      onBackdropPress={() => {
        onBackdropPress && onSwipeComplete();
      }}
      onSwipeComplete={() => onSwipeComplete()}
      avoidKeyboard={true}
    >
      <SafeAreaView
        style={[styles.boxContainer, {backgroundColor: colors.backgroundColor}]}
      >
        {swipeDown === true && <Line />}
        <View style={styles.horizontalStyle}>
          {indicator === '1' ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <EmailScreen
                email={email}
                setEmail={setEmail}
                next={saveEmail}
                onLoginPress={emailOnLoginPress}
              />
            </ScrollView>
          ) : indicator === '2' ? (
            <>
              {/* form screen */}
              <FormScreen
                email={email}
                onSuccess={() => setIndicator('3')}
                onGoBack={() => {
                  setIndicator('1');
                }}
              />
            </>
          ) : (
            <>
              {/* verification screen */}
              <VerificationScreen
                email={email}
                endVarification={endVarification}
                onResendPress={onResendPress}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default SignupModal;

/** email screen component */
const EmailScreen = ({email, setEmail, next, onLoginPress}) => {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  const isEmailValid = useEmailValidation(email);

  return (
    <>
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <View style={styles.createAccView}>
          <Text
            title3
            heavy
            style={[
              styles.createAccTxt,
              {color: isDarkMode ? colors.highemphasis : colors.mediumemphasis},
            ]}
          >
            {`CREATE ACCOUNT`}
          </Text>
          <Text
            body2
            regular
            style={{color: isDarkMode ? colors.lowemphasis : colors.faint}}
          >
            {`Enjoy a hassel free shopping`}
          </Text>
          <Text
            body2
            regular
            style={{color: isDarkMode ? colors.lowemphasis : colors.faint}}
          >
            {`experience!`}
          </Text>
        </View>
        <View>
          <View style={styles.tInput}>
            <TextInput
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
              maxLength={50}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
            />
            <Text regular overline iserror>
              {email.length > 0 && !isEmailValid && `Enter a valid email`}
            </Text>
          </View>
          <Button
            disabled={email.length === 0 || !isEmailValid}
            onPress={next}
            text="NEXT"
            buttonStyle={styles.loginBtn}
            textStyles={[
              styles.loginBtnTxt,
              {color: isDarkMode ? colors.btnTxt : colors.whiteColor},
            ]}
          />
          <View style={styles.loginTxtView}>
            <Text regular body2 lowemphasis>
              {`Already Have an account?`}
            </Text>
            <Pressable onPress={onLoginPress}>
              <Text
                heavy
                body2
                style={{
                  color: isDarkMode ? colors.highemphasis : colors.lowemphasis,
                }}
              >
                {` Log In`}
              </Text>
            </Pressable>
          </View>
        </View>
        {/* <View style={styles.lastView}>
          <Text
            bold
            body2
            style={{
              color: isDarkMode ? colors.highemphasis : colors.mediumemphasis,
            }}
          >
            {'Have any questions?'}
          </Text>
          <Text
            regular
            body2
            style={{
              color: isDarkMode ? colors.highemphasis : colors.mediumemphasis,
            }}
          >
            {'Reach out to us..'}
          </Text>
          <Button
            text="LIVE CHAT"
            textStyles={[
              styles.liveChatTxt,
              {
                color: isDarkMode ? colors.btnTxt : colors.lowemphasis,
              },
            ]}
            buttonColor={colors.headerGray}
            buttonStyle={styles.liveChatBtn}
          />
        </View> */}
      </View>
    </>
  );
};

/** form screen component */
const FormScreen = ({email, onSuccess, onGoBack,navigation}) => {
  const colors = useTheme();
  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const isPhoNoValid = useMobileNumberValidation(mobileNumber);
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

  /** api call for signup */
  const signupApi = useFetchPost(
    API.USER_SIGNUP,
    {
      UserName: firstName + lastName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      ContactNumber: `00${countryCode}` + mobileNumber,
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
   * method on success of api
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
    onSuccess();
  };

  /**
   * Method Called onpress of create Account
   *
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


  return (
    <ScrollView>
      <View style={styles.gmail}>
        <Pressable
          onPress={onGoBack}
          style={{
            height: 30,
            justifyContent: 'center',
          }}
        >
          <Icon
            type={'ant'}
            name={Icons.ARROW_LEFT}
            color={isDarkMode ? colors.whiteColor : colors.blackColor}
            size={23}
          />
        </Pressable>
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
                style={[
                  styles.prefix,
                  {
                    borderColor: colors.mediumemphasis,
                    backgroundColor: isDarkMode
                      ? colors.txtInputDarkBack
                      : colors.lightGray,
                    color: isDarkMode
                      ? colors.lowemphasis
                      : colors.mediumemphasis,
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
  );
};

/** verification screen component */
const VerificationScreen = ({endVarification, onResendPress}) => {
  const dispatch = useDispatch();
  const colors = useTheme();
  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  const [verificationCode, setVerificationCode] = useState('');
  const [goForVerify, setGoForVerify] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    getEmail();
  });

  /** get email from local storage */
  const getEmail = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('@userEmail');
      setEmail(userEmail);
    } catch (e) {
      console.log('No Data Available', e);
      // error reading value
    }
  };

  /** api call for verify email */
  const verifyApi = useFetchPost(
    API.VERIFY_EMAIL,
    {
      emailVerifiedToken: verificationCode,
      email: email,
    },
    goForVerify,
    uuid,
  );

  /** response of api call for signup */
  useEffect(() => {
    if (!verifyApi.loading) {
      if (verifyApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onSuccessApi(verifyApi.response?.data);
      }
    } else {
      console.log('error occured in verify api call');
    }
    setGoForVerify(false);
  }, [verifyApi.loading]);

  /**
   * method on success of api
   * @param {*} signupApi api response
   */
  const onSuccessApi = async response => {
    try {
      const jsonValue = JSON.stringify(response?.data?.user);

      await AsyncStorage.setItem('@userRegister', 'true');
      await AsyncStorage.setItem('@emailVerified', 'true');
      await AsyncStorage.setItem('@userData', jsonValue);
      await AsyncStorage.setItem('@accessToken', response?.data?.access_token);
      dispatch(
        UserActions.onSetUserAccessToken(response?.data?.result?.access_token),
      );

      dispatch(UserActions.onSetIsUserRegiaster(true));
      dispatch(UserActions.onSetIsEmailVerified(true));
    } catch (e) {
      // saving error
    }
    dispatch(UserActions.onSetIsLoggedIn(true));
    endVarification();
    // navigation.navigate(COMMON.HOME);
  };

  /**
   * method called onpress of Next
   */
  const next = () => {
    setGoForVerify(true);
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.createAccView}>
        <Text
          title3
          heavy
          style={[
            styles.createAccTxt,
            {color: isDarkMode ? colors.highemphasis : colors.mediumemphasis},
          ]}
        >
          {`EMAIL VERIFICATION`}
        </Text>
        <Text
          body2
          regular
          style={{color: isDarkMode ? colors.lowemphasis : colors.faint}}
        >
          {`An email with a verification code is just sent to`}
        </Text>
        <Text
          body2
          regular
          style={{color: isDarkMode ? colors.lowemphasis : colors.faint}}
        >
          {email}
        </Text>
      </View>
      <View>
        <View style={styles.tInput}>
          <TextInput
            placeholder="Enter verification code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            maxLength={50}
            keyboardType={'numeric'}
          />
        </View>
        <Button
          disabled={verificationCode?.length !== 6 ? true : false}
          onPress={next}
          text="NEXT"
          buttonStyle={styles.loginBtn}
          textStyles={[
            styles.loginBtnTxt,
            {
              color: isDarkMode ? colors.btnTxt : colors.whiteColor,
            },
          ]}
          loading={verifyApi.loading}
        />
        {/* <View style={styles.loginTxtView}>
          <Text regular body2 lowemphasis>
            {`Didn’t get an email?`}
          </Text>
          <Pressable onPress={onResendPress}>
            <Text
              heavy
              body2
              style={{
                color: isDarkMode ? colors.highemphasis : colors.lowemphasis,
              }}
            >
              {`  Resend`}
            </Text>
          </Pressable>
        </View> */}
      </View>
    </ScrollView>
  );
};
