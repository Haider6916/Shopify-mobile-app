/**
 * forget modal component
 * @param param0 props accepted by this component
 * @returns React Component
 */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
import {TextInput, Text, Button, Icon, Icons} from '..';
import {useTheme} from '../../config/theme';
import {useSelector} from 'react-redux';
import {API, useFetchPost} from '../../services';
import {GeneralResponses} from '../../services/responses';
import useEmailValidation from '../../hooks/useEmailValidation';
import {BaseStyle} from '../../config/styles';
import {ScrollView} from 'react-native';
import Toast from 'react-native-simple-toast';

const ForgetModal = props => {
  const {
    visible,
    onSwipeComplete,
    swipeDown = true,
    onBackdropPress = false,
    endForget,
  } = props;
  const colors = useTheme();

  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [indicator, setIndicator] = useState('1'); // 1 for email screen, 2 for signupform, 3 is for verification screen

  /** function called on complete of email process*/
  const onComplete = () => {
    setIndicator('2');
  };

  /** function called on  */
  const onSuccess = () => {
    setIndicator('3');
  };

  /** function called on press go back */
  const onGoBack = () => {
    setIndicator('1');
  };

  /** Line component */
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
      {...(swipeDown && indicator === '1' ? {swipeDirection: 'down'} : {})}
      style={styles.bottomModal}
      backdropOpacity={0.5}
      onBackdropPress={() => {
        onBackdropPress && indicator === '1' && onSwipeComplete();
      }}
      onSwipeComplete={() => indicator === '1' && onSwipeComplete()}
      avoidKeyboard={true}
    >
      <SafeAreaView
        style={[styles.boxContainer, {backgroundColor: colors.backgroundColor}]}
      >
        {swipeDown === true && indicator === '1' && <Line />}
        <View style={styles.horizontalStyle}>
          {indicator === '1' ? (
            <ScrollView>
              <EmailScreen
                email={email}
                setEmail={setEmail}
                onComplete={onComplete}
              />
            </ScrollView>
          ) : indicator === '2' ? (
            <ScrollView>
              <CodeScreen
                email={email}
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
                onSuccess={onSuccess}
                onGoBack={onGoBack}
              />
            </ScrollView>
          ) : (
            <ScrollView>
              <PasswordScreen
                email={email}
                verificationCode={verificationCode}
                onSuccess={endForget}
              />
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};
export default ForgetModal;

/** email screen component */
const EmailScreen = ({email, setEmail, onComplete}) => {
  const colors = useTheme();

  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [goForVerify, setGoForVerify] = useState(false);

  const isEmailValid = useEmailValidation(email);

  /** api call for verify email */
  const verifyApi = useFetchPost(
    API.FORGOT_PASSWORD,
    {
      email: email,
    },
    goForVerify,
    uuid,
  );

  /** response of api call  for signup */
  useEffect(() => {
    if (!verifyApi.loading) {
      if (verifyApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onComplete();
      }
    } else {
      console.log('error occured in verify api call');
    }
    setGoForVerify(false);
  }, [verifyApi.loading]);

  /**
   * method called onpress of continue
   */
  const next = () => {
    setGoForVerify(true);
  };

  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        {backgroundColor: colors.backgroundColor},
      ]}
    >
      <View style={styles.createAccView}>
        <Text
          title3
          heavy
          mediumemphasis
          style={[
            styles.createAccTxt,
            {color: isDarkMode ? colors.highemphasis : colors.mediumemphasis},
          ]}
        >
          {`FORGOT PASSWORD?`}
        </Text>
        <Text
          body2
          regular
          style={{color: isDarkMode ? colors.lowemphasis : colors.faint}}
        >
          {`Dont worry, we just sent you an email with`}
        </Text>
        <Text
          body2
          regular
          style={{color: isDarkMode ? colors.lowemphasis : colors.faint}}
        >
          {`the password reset code...`}
        </Text>
      </View>
      <View>
        <View>
          <TextInput
            placeholder="Enter Email Address"
            value={email}
            onChangeText={setEmail}
            maxLength={50}
          />
          <Text regular overline iserror>
            {email.length > 0 && !isEmailValid && `Enter a valid email`}
          </Text>
        </View>
        <Button
          disabled={email.length === 0 || !isEmailValid}
          onPress={next}
          text="Next"
          buttonStyle={styles.loginBtn}
          textStyles={[
            styles.loginBtnTxt,
            {color: isDarkMode ? colors.btnTxt : colors.whiteColor},
          ]}
          loading={verifyApi.loading}
        />
      </View>
    </SafeAreaView>
  );
};

/** code screen component */
const CodeScreen = ({
  email,
  verificationCode,
  setVerificationCode,
  onSuccess,
  onGoBack,
}) => {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [goForResend, setGoForResend] = useState(false);

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
        Toast.show(resendApi.response?.data.msg, Toast.SHORT);
      }
    } else {
      console.log('error occured while Resending the Code');
    }
    setGoForResend(false);
  }, [resendApi.loading]);

  /**
   * method called onpress of Resend
   */
  const resend = () => {
    setGoForResend(true);
  };

  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        {backgroundColor: colors.backgroundColor},
      ]}
    >
      <View style={styles.createAccView}>
        <Pressable
          onPress={onGoBack}
          style={{
            height: 30,
            justifyContent: 'center',
            marginBottom: 10,
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
          heavy
          style={[
            styles.createAccTxt,
            {color: isDarkMode ? colors.highemphasis : colors.mediumemphasis},
          ]}
        >
          {`FORGOT PASSWORD?`}
        </Text>
        <Text
          body2
          regular
          style={{color: isDarkMode ? colors.lowemphasis : colors.faint}}
        >
          {`Dont worry, we just sent you an email with`}
        </Text>
        <Text
          body2
          regular
          style={{color: isDarkMode ? colors.lowemphasis : colors.faint}}
        >
          {`the password reset code...`}
        </Text>
        <View style={{marginTop: 16}}>
          <Text
            body2
            regular
            style={{color: isDarkMode ? colors.lowemphasis : colors.faint}}
          >
            {`Email sent to `}
            <Text
              body2
              bold
              style={{color: isDarkMode ? colors.lowemphasis : colors.faint}}
            >
              {email}
            </Text>
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.tInput}>
          <TextInput
            placeholder="Enter Reset Code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            maxLength={50}
            keyboardType={'numeric'}
          />
        </View>
        <Button
          disabled={verificationCode.length !== 6 ? true : false}
          onPress={onSuccess}
          text="RESET PASSWORD"
          buttonStyle={styles.loginBtn}
          textStyles={[
            styles.loginBtnTxt,
            {
              color: isDarkMode ? colors.btnTxt : colors.whiteColor,
            },
          ]}
        />
        <View style={styles.loginTxtView}>
          <Text regular body2 lowemphasis>
            {`Didn’t get an email?`}
          </Text>
          <Pressable onPress={resend}>
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
        </View>
      </View>
    </SafeAreaView>
  );
};

/** password screen component */
const PasswordScreen = ({email, verificationCode, onSuccess}) => {
  const colors = useTheme();

  const uuid = useSelector(state => state.user.uuid);

  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [goForReset, setGoForReset] = useState(false);

  /**
   * method called onpress of continue
   */
  const resetApi = useFetchPost(
    API.RESET_PASSWORD,
    {
      email: email,
      passwordResetToken: verificationCode,
      password: password,
      password2: confirmpassword,
    },
    goForReset,
    uuid,
  );

  useEffect(() => {
    if (!resetApi.loading) {
      if (resetApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        Toast.show(resetApi.response?.data?.msg, Toast.SHORT);
        onSuccess();
      }
    } else {
      console.log('error occured in reset api call');
    }
    setGoForReset(false);
  }, [resetApi.loading]);

  /**
   * method called onpress of continue
   */
  const update = () => {
    setGoForReset(true);
  };

  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        {backgroundColor: colors.backgroundColor},
      ]}
    >
      <View style={styles.createAccView}>
        <Text title3 heavy mediumemphasis style={styles.createAccTxt}>
          {`EVERYTHING CHECKS OUT!`}
        </Text>
        <Text faint body2 regular>
          {`Come up with a new password and you're`}
        </Text>
        <Text faint body2 regular>
          {`good to go!`}
        </Text>
      </View>
      <View>
        <View style={styles.tInput1}>
          <TextInput
            placeholder="Enter New Password"
            value={password}
            onChangeText={setpassword}
            maxLength={50}
          />
          <Text regular overline iserror>
            {password.length > 0 &&
              password.length < 8 &&
              `Can be 8 or more characters`}
          </Text>
        </View>
        <View style={styles.tInput2}>
          <TextInput
            placeholder="Confirm New Password"
            value={confirmpassword}
            onChangeText={setconfirmpassword}
            maxLength={50}
          />
          <Text regular overline iserror>
            {confirmpassword.length > 0 &&
              confirmpassword.length < 8 &&
              `Can be 8 or more characters`}
            {password.length >= 8 &&
              confirmpassword.length >= 8 &&
              password !== confirmpassword &&
              `Passwords didn't matched`}
          </Text>
        </View>
        <Button
          disabled={
            password.length < 8 &&
            confirmpassword.length < 8 &&
            password !== confirmpassword
              ? true
              : false
          }
          onPress={update}
          text="UPDATE PASSWORD"
          buttonStyle={styles.loginBtn}
          textStyles={styles.loginBtnTxt}
          loading={resetApi.loading}
        />
      </View>
    </SafeAreaView>
  );
};
