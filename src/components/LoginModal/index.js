/**
 * login modal component
 * @param param0 props accepted by this component
 * @returns React Component
 */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
import {TextInput, Text, Button} from '..';
import {useTheme} from '../../config/theme';
import {Open_Eye, Crossed_Eye} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {API, useFetchPost} from '../../services';
import {GeneralResponses} from '../../services/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserActions} from '../../redux/actions';
import useEmailValidation from '../../hooks/useEmailValidation';
import {useDarkMode} from 'react-native-dynamic';
import {SvgUri} from 'react-native-svg';

const LoginModal = props => {
  const {
    visible,
    onSwipeComplete,
    swipeDown = true,
    onBackdropPress = false,
    onForget,
    createPress,
    loginPress,
  } = props;
  const colors = useTheme();
  const dispatch = useDispatch();
  // const isDarkMode = useDarkMode();

  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  const appLogo = useSelector(state =>
    isDarkMode ? state.user.appLogoDark : state.user.appLogo,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [error, setError] = useState('');

  const [goForSignin, setGoForSignin] = useState(false);

  const isEmailValid = useEmailValidation(email);

  /** api call for signin */
  const signinApi = useFetchPost(
    API.USER_SIGNIN,
    {
      email: email,
      password: password,
    },
    goForSignin,
    uuid,
  );

  /** response of api call  for signin */
  useEffect(() => {
    console.log(signinApi.response);
    if (!signinApi.loading) {
      if (signinApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onSuccessApi(signinApi?.response);
      } else if (
        signinApi.response?.status === GeneralResponses.STATUS_401_LOGIN.CODE
      ) {
        setError(signinApi.response?.data.msg);
      }
    } else {
      console.log('error occured in signin api call');
    }
    setGoForSignin(false);
  }, [signinApi.loading]);

  /**
   * method will be called on api success
   * @param {*} response api resposnse
   */
  const onSuccessApi = async response => {
    try {
      const jsonValue = JSON.stringify(response?.data?.result?.user);
      await AsyncStorage.setItem('@userData', jsonValue);
      await AsyncStorage.setItem(
        '@accessToken',
        response?.data?.result?.access_token,
      );
      dispatch(
        UserActions.onSetUserAccessToken(response?.data?.result?.access_token),
      );
    } catch (e) {
      // saving error
    }
    dispatch(UserActions.onSetIsLoggedIn(true));
    loginPress();
  };

  /**
   * method called onpress of login
   */
  const login = () => {
    setGoForSignin(true);
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

  /**
   * function to render app logo
   * @param {*} logo logo url
   * @returns React Component
   */
  const getAppLogo = logo => {
    var type = [];
    if (logo !== '') {
      type = logo.split('.');
      // console.log(type,'asdasdsdsaasd');

      return (
        <>
          {type[type.length - 1].includes('svg') ? (
            <SvgUri width={185} height={40} uri={logo} />
          ) : (
            <Image
              style={{height: 40, width: 185}}
              source={{
                uri: logo,
              }}
            />
          )}
        </>
      );
    }
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
    >
      {/* <SafeAreaView
        style={[styles.boxContainer, {backgroundColor: colors.backgroundColor}]}
      > */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' && 'padding'}
        style={[styles.boxContainer, {backgroundColor: colors.backgroundColor}]}
      >
        {swipeDown === true && <Line />}
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalStyle}
        >
          <View style={[styles.firstView]}>
            {getAppLogo(appLogo)}
            <Text
              regular
              body2
              style={{color: isDarkMode ? colors.lowemphasis : colors.faint}}
            >{`Log in to access features like order tracking,`}</Text>
            <Text
              regular
              body2
              style={{color: isDarkMode ? colors.lowemphasis : colors.faint}}
            >{`wishlist management and much more...`}</Text>
          </View>
          <View>
            <View style={[styles.secondView]}>
              <View style={styles.tInput}>
                <TextInput
                  placeholder="Email"
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
              <View style={[styles.tInput]}>
                <TextInput
                  placeholder="Password"
                  secureTextEntry={passwordSecure}
                  value={password}
                  onChangeText={setPassword}
                  icon={
                    <Pressable
                      style={styles.eyeBtn}
                      onPress={() => setPasswordSecure(!passwordSecure)}
                    >
                      {passwordSecure ? <Open_Eye /> : <Crossed_Eye />}
                    </Pressable>
                  }
                />
                <Text regular overline iserror>
                  {error && error}
                </Text>
              </View>

              <Button
                onPress={login}
                disabled={
                  email.length === 0 || !isEmailValid || password.length < 8
                }
                buttonStyle={styles.loginBtn}
                loading={signinApi.loading}
                textStyles={[
                  styles.loginBtnTxt,
                  {
                    color: isDarkMode ? colors.btnTxt : colors.whiteColor,
                  },
                ]}
              />
              {/* <View style={styles.thirdView}>
                <Pressable onPress={onForget}>
                  <Text
                    heavy
                    body2
                    style={{
                      color: isDarkMode
                        ? colors.highemphasis
                        : colors.textPrimaryBold,
                    }}
                  >{`Forgot password`}</Text>
                </Pressable>
                <View style={styles.createAccountBtn}>
                  <Text
                    regular
                    body2
                    style={{
                      color: isDarkMode
                        ? colors.lowemphasis
                        : colors.textPrimaryBold,
                    }}
                  >{`Don't have an account yet?`}</Text>
                  <Pressable onPress={createPress}>
                    <Text
                      heavy
                      body2
                      style={{
                        color: isDarkMode
                          ? colors.highemphasis
                          : colors.textPrimaryBold,
                      }}
                    >
                      {` Create Account`}
                    </Text>
                  </Pressable>
                </View>
              </View> */}
            </View>
          </View>
          {/* <View style={styles.lastView}>
            <Text bold body2 mediumemphasis>
              {'Have any questions?'}
            </Text>
            <Text regular body2 mediumemphasis>
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
              buttonColor={isDarkMode ? colors.bordercolor : colors.headerGray}
              buttonStyle={styles.liveChatBtn}
            />
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default LoginModal;
