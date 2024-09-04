import {Pressable, ScrollView, View} from 'react-native';
import React from 'react';
import {BaseStyle} from '../../../config/styles';
import {useTheme} from '../../../config/theme';
import {Button, Text, TextInput} from '../../../components';
import {Crossed_Eye, Open_Eye} from '../../../assets';
import {useState} from 'react';
import styles from './styles';
import {API, useFetchPost} from '../../../services';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {GeneralResponses} from '../../../services/responses';
import Toast from 'react-native-simple-toast';

const ChangePassword = ({navigation}) => {
  const colors = useTheme();

  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordSecure, setCurrentPasswordSecure] = useState(true);
  const [newPasswordSecure, setNewPasswordSecure] = useState(true);
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);
  const [goForChangePassword, setGoForChangePassword] = useState(false);
  const [error, setError] = useState(false);

  /** api call for Change Password*/
  const ChangePassword = useFetchPost(
    API.CHANGE_PASSWORD,
    {
      oldPassword: currentPassword,
      password: newPassword,
      password2: confirmPassword,
    },
    goForChangePassword,
    uuid,
    userAccessToken,
  );

  /** response of api call  for Change Password */
  useEffect(() => {
    if (!ChangePassword.loading) {
      if (ChangePassword.response?.status === GeneralResponses.STATUS_OK.CODE) {
        Toast.show(`Password updated, continue using the app`, Toast.LONG);
        navigation.goBack();
      } else if (
        ChangePassword.response?.status ===
        GeneralResponses.STATUS_401_LOGIN.CODE
      ) {
        setError(true);
      }
    } else {
      console.log('Error occured in Change Password Api');
    }
    setGoForChangePassword(false);
  }, [ChangePassword.loading]);

  /**
   * function Called onpress of Save Address
   */
  const updatePassword = async () => {
    if (newPassword === confirmPassword) {
      setGoForChangePassword(true);
    } else {
      Toast.show(
        `Your New Password & Confirm Password Didn't matched`,
        Toast.LONG,
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        BaseStyle.safeAreaView,
        styles.main,
        {backgroundColor: colors.backgroundColor},
      ]}
    >
      <View style={{marginBottom: 15, marginHorizontal: 16}}>
        <Text
          regular
          body2
          style={{
            color: isDarkMode ? colors.mediumemphasis : colors.lowemphasis,
          }}
        >
          {`Passwords can be upto 8 characters`}
        </Text>
      </View>
      <View style={styles.INPUTTEXT}>
        <TextInput
          onChangeText={setCurrentPassword}
          secureTextEntry={currentPasswordSecure}
          value={currentPassword}
          placeholder={`Enter current password`}
          icon={
            <Pressable
              style={styles.eyeBtn}
              onPress={() => setCurrentPasswordSecure(!currentPasswordSecure)}
            >
              {currentPasswordSecure ? <Open_Eye /> : <Crossed_Eye />}
            </Pressable>
          }
        />
        <Text regular overline iserror>
          {error && 'The password you entered isn’t valid.'}
        </Text>
      </View>
      <View style={styles.INPUTTEXT}>
        <TextInput
          onChangeText={setNewPassword}
          secureTextEntry={newPasswordSecure}
          value={newPassword}
          placeholder="Enter new password"
          icon={
            <Pressable
              style={styles.eyeBtn}
              onPress={() => setNewPasswordSecure(!newPasswordSecure)}
            >
              {newPasswordSecure ? <Open_Eye /> : <Crossed_Eye />}
            </Pressable>
          }
        />
        <Text regular overline iserror>
          {newPassword.length <= 7 && newPassword.length >= 3 && `Too Short`}
        </Text>
      </View>
      <View style={styles.INPUTTEXT2}>
        <TextInput
          onChangeText={setConfirmPassword}
          secureTextEntry={confirmPasswordSecure}
          value={confirmPassword}
          placeholder="Confirm new password"
          icon={
            <Pressable
              style={styles.eyeBtn}
              onPress={() => setConfirmPasswordSecure(!confirmPasswordSecure)}
            >
              {confirmPasswordSecure ? <Open_Eye /> : <Crossed_Eye />}
            </Pressable>
          }
        />
      </View>
      <View style={{marginHorizontal: 16}}>
        <Button
          text={error ? `TRY AGAIN` : `UPDATE PASSWORD`}
          onPress={updatePassword}
          textStyles={{
            color: isDarkMode ? colors.btnTxt : colors.whiteColor,
          }}
          loading={ChangePassword.loading}
        />
      </View>
    </ScrollView>
  );
};
export default ChangePassword;
