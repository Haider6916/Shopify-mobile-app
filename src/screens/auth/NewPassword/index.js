import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';
import {Text, TextInput, Button} from '../../../components';
import styles from './styles';
import {useTheme} from '../../../config/theme';
import {BaseStyle} from '../../../config/styles';
import {AUTH} from '../../../navigation/ROUTES';
import {API, useFetchPost} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';

const NewPassword = ({navigation, route}) => {
  const colors = useTheme();
  const email = route.params.email;
  const verificationCode = route.params.verificationCode;

  const uuid = useSelector(state => state.user.uuid);

  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [goForReset, setGoForReset] = useState(false);

  /**
   * function called onpress of continue
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

  /** api response for reset api */
  useEffect(() => {
    if (!resetApi.loading) {
      if (resetApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        Toast.show(resetApi.response?.data?.msg, Toast.SHORT);
        navigation.navigate(AUTH.LOGIN);
      }
    } else {
      console.log('error occured in reset api call');
    }
    setGoForReset(false);
  }, [resetApi.loading]);

  /**
   *  function  called onpress of continue
   */
  const cont = () => {
    setGoForReset(true);
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
          <View style={styles.tInput}>
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
            onPress={cont}
            text="UPDATE PASSWORD"
            buttonStyle={styles.loginBtn}
            textStyles={styles.loginBtnTxt}
            loading={resetApi.loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default NewPassword;
