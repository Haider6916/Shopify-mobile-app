import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Pressable} from 'react-native';
import {Text, TextInput, Button} from '../../../components';
import styles from './styles';
import {useTheme} from '../../../config/theme';
import {BaseStyle} from '../../../config/styles';
import {useDispatch, useSelector} from 'react-redux';
import {API, useFetchPost} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserActions} from '../../../redux/actions';
import Toast from 'react-native-simple-toast';

const EmailVerification = ({}) => {
  const colors = useTheme();
  const dispatch = useDispatch();

  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [goForVerify, setGoForVerify] = useState(false);
  const [goForResend, setGoForResend] = useState(false);

  useEffect(() => {
    getEmail();
  });

  /** function to get useremail from localstorage */
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

  /** api call for Resending Verfication code */
  const resendApi = useFetchPost(
    API.RESEND_CODE,
    {
      email: email,
    },
    goForResend,
  );

  /** response of api call for Resending Verfication code */
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

  /** response of api call for verifying */
  useEffect(() => {
    if (!verifyApi.loading) {
      if (verifyApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onSuccessApi(verifyApi.response?.data);
      }
    } else {
      console.log('error occured while verifying');
    }
    setGoForVerify(false);
  }, [verifyApi.loading]);

  /**
   * function on success of api
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
    // navigation.navigate(COMMON.HOME);
  };

  /**
   * function called onpress of Next
   */
  const next = () => {
    setGoForVerify(true);
  };

  /**
   * function called onpress of Resend
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
      <View
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[BaseStyle.container]}
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
      </View>
    </SafeAreaView>
  );
};
export default EmailVerification;
