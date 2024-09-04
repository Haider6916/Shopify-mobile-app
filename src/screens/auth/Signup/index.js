import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Pressable, ScrollView} from 'react-native';
import {Text, TextInput, Button} from '../../../components';
import styles from './styles';
import {useTheme} from '../../../config/theme';
import {BaseStyle} from '../../../config/styles';
import {AUTH} from '../../../navigation/ROUTES';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useEmailValidation from '../../../hooks/useEmailValidation';
import {useSelector} from 'react-redux';

const Signup = ({navigation}) => {
  const colors = useTheme();

  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [email, setEmail] = useState('');

  const isEmailValid = useEmailValidation(email);

  /**
   * function called onpress of Next
   */
  const next = async () => {
    try {
      await AsyncStorage.setItem('@userEmail', email);
    } catch (e) {
      // save error
    }
    navigation.navigate(AUTH.SIGNUP_FORM, {
      email: email,
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
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 16,
          justifyContent: 'space-between',
        }}
      >
        <View style={styles.createAccView}>
          <Text
            title3
            heavy
            style={[
              styles.createAccTxt,
              ,
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
            faint
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
            <Pressable onPress={() => navigation.navigate(AUTH.LOGIN)}>
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
  );
};
export default Signup;
