import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Pressable, ScrollView} from 'react-native';
import {Text, TextInput, Button} from '../../../components';
import styles from './styles';
import {useTheme} from '../../../config/theme';
import {BaseStyle} from '../../../config/styles';
import {AUTH} from '../../../navigation/ROUTES';
import {API, useFetchPost} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';

const ForgotPasswordCode = ({navigation, route}) => {
  const colors = useTheme();
  const email = route.params.email;

  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [verificationCode, setVerificationCode] = useState('');
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
   * function called onpress of Resend
   */
  const resend = () => {
    setGoForResend(true);
  };

  /**
   * function called on reset password press
   */
  const next = () => {
    navigation.navigate(AUTH.NEW_PASSWORD, {
      email: email,
      verificationCode: verificationCode,
    });
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
        contentContainerStyle={{flex: 1, paddingHorizontal: 16}}
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
              {`Email sent to ${email}`}
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
            onPress={next}
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default ForgotPasswordCode;
