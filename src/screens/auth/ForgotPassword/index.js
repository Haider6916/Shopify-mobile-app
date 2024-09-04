import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, ScrollView} from 'react-native';
import {Text, TextInput, Button} from '../../../components';
import styles from './styles';
import {useTheme} from '../../../config/theme';
import {BaseStyle} from '../../../config/styles';
import {AUTH} from '../../../navigation/ROUTES';
import {useSelector} from 'react-redux';
import {API, useFetchPost} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import useEmailValidation from '../../../hooks/useEmailValidation';

const ForgotPassword = ({navigation}) => {
  const colors = useTheme();

  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [email, setEmail] = useState('');
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

  /** response of api call for verify api */
  useEffect(() => {
    if (!verifyApi.loading) {
      if (verifyApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onSuccessApi(verifyApi.response);
      }
    } else {
      console.log('error occured in verify api call');
    }
    setGoForVerify(false);
  }, [verifyApi.loading]);

  /**
   * function called on success of api
   * @param {*} data
   */
  const onSuccessApi = data => {
    console.log(data, 'here');
    navigation.navigate(AUTH.FORGOT_PASSWORD_CODE, {email: email});
  };

  /**
   * function called onpress of continue
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
        </View>
        <View>
          <View style={styles.tInput}>
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default ForgotPassword;
