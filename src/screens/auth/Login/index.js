import React, {useEffect, useState} from 'react';
import {View, Pressable, ScrollView, BackHandler, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle} from '../../../config/styles';
import {Crossed_Eye, Open_Eye} from '../../../assets';
import {Text, TextInput, Button, ConfirmationModal} from '../../../components';
import styles from './styles';
import {useTheme} from '../../../config/theme';
import {AUTH, COMMON} from '../../../navigation/ROUTES';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API, useFetchPost} from '../../../services';
import useEmailValidation from '../../../hooks/useEmailValidation';
import {GeneralResponses} from '../../../services/responses';
import {useDispatch, useSelector} from 'react-redux';
import {UserActions} from '../../../redux/actions';
import {useIsFocused} from '@react-navigation/native';
import RNExitApp from 'react-native-exit-app';
import {SvgUri} from 'react-native-svg';

const Login = ({navigation}) => {
  const colors = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  const uuid = useSelector(state => state.user.uuid);
  const appLogo = useSelector(state =>
    isDarkMode ? state.user.appLogoDark : state.user.appLogo,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [error, setError] = useState('');
  const [goForSignin, setGoForSignin] = useState(false);
  const [openConModal, setOpenConModal] = useState(false);

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

  /** useEffect to handle hardware abck press */
  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }
  });

  /**
   * hardware back button handler
   * @returns true
   */
  const handleBackButton = () => {
    setOpenConModal(true);
    return true;
  };
  // useEffect(() => {
  //   dispatch(UserActions.onSetShowBag(false));
  //   console.log('--------------login-----------');
  // });
  /** response of api call for signin */
  useEffect(() => {
    if (!signinApi.loading) {
      if (signinApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onSuccessApi(signinApi?.response);
        navigation.navigate(COMMON.HOME);
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
   * function will be called on api success
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
  };

  /**
   * function called onpress of login
   */
  const login = () => {
    console.log('login');
    setGoForSignin(true);
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
    <>
      <ConfirmationModal
        visible={openConModal}
        title={`Are you sure to Exit?`}
        primaryText={`No`}
        secondaryText={`Yes`}
        primaryAction={() => setOpenConModal(false)}
        secondaryAction={() => RNExitApp.exitApp()}
      />
      <SafeAreaView
        style={[
          BaseStyle.safeAreaView,
          {backgroundColor: colors.backgroundColor},
        ]}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[BaseStyle.container]}
          contentContainerStyle={styles.contentContainer}
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
              <View style={styles.thirdView}>
                <Pressable
                  onPress={() => navigation.navigate(AUTH.FORGOT_PASSWORD)}
                >
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
                    textPrimaryBold
                    style={{
                      color: isDarkMode
                        ? colors.lowemphasis
                        : colors.textPrimaryBold,
                    }}
                  >{`Don't have an account yet?`}</Text>
                  <Pressable onPress={() => navigation.navigate(AUTH.SIGNUP)}>
                    <Text
                      heavy
                      body2
                      textPrimaryBold
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
              </View>
            </View>
          </View>
          <View style={styles.lastView}>
            <Text
              bold
              body2
              style={{
                color: isDarkMode ? colors.highemphasis : colors.mediumemphasis,
              }}
            >
            
            </Text>
            <Text
              regular
              body2
              style={{
                color: isDarkMode ? colors.highemphasis : colors.mediumemphasis,
              }}
            >
              
            </Text>
            {/* <Button
              text="LIVE CHAT"
              textStyles={[
                styles.liveChatTxt,
                {
                  color: isDarkMode ? colors.btnTxt : colors.lowemphasis,
                },
              ]}
              buttonColor={isDarkMode ? colors.bordercolor : colors.headerGray}
              buttonStyle={styles.liveChatBtn}
            /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default Login;
